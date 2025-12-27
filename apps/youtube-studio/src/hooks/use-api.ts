'use client';

import type {
  VoicePreset,
  VoicePresetCreateRequest,
  VoicePresetListResponse,
  VoicePresetUpdateRequest,
} from '@/lib/voice-preset-types';
import type {
  ProgressEvent,
  Video,
  VideoCreateRequest,
  VideoUpdateRequest,
  VoiceProfile,
} from '@ccl/yt-api-client';
import { YouTubeStudioAPI } from '@ccl/yt-api-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// API Client Singleton
let apiClient: YouTubeStudioAPI | null = null;
let currentSession: any = null;

export function useAPIClient() {
  const { data: session, status } = useSession();

  // Update current session reference
  currentSession = session;

  if (!apiClient) {
    apiClient = new YouTubeStudioAPI({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      getAccessToken: async () => currentSession?.accessToken || null,
      getUserId: async () => currentSession?.user?.id || null,
    });
  }

  return { client: apiClient, sessionStatus: status };
}

// Video Queries
export function useVideos(params?: {
  status?: Video['status'];
  limit?: number;
  offset?: number;
}) {
  const { client, sessionStatus } = useAPIClient();

  return useQuery({
    queryKey: ['videos', params],
    queryFn: () => client.videos.list(params),
    enabled: sessionStatus === 'authenticated', // Only run when session is loaded
    staleTime: 30000, // 30 seconds
  });
}

export function useVideo(id: string | null) {
  const { client, sessionStatus } = useAPIClient();

  return useQuery({
    queryKey: ['video', id],
    queryFn: () => client.videos.get(id as string),
    enabled: !!id && sessionStatus === 'authenticated',
    staleTime: 10000, // 10 seconds
  });
}

export function useCreateVideo() {
  const { client } = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VideoCreateRequest) => client.videos.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useUpdateVideo() {
  const { client } = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VideoUpdateRequest }) =>
      client.videos.update(id, data),
    onSuccess: (video) => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['video', video.id] });
    },
  });
}

export function useDeleteVideo() {
  const { client } = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => client.videos.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useRegenerateVideo() {
  const { client } = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => client.videos.regenerate(id),
    onSuccess: (video) => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['video', video.id] });
    },
  });
}

export function useDownloadVideo() {
  const { client } = useAPIClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const blob = await client.videos.download(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `video-${id}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  });
}

// Voice Queries
export function useVoices() {
  const { client } = useAPIClient();

  return useQuery({
    queryKey: ['voices'],
    queryFn: () => client.voices.list(),
    staleTime: 60000, // 1 minute
  });
}

export function useVoice(id: string | null) {
  const { client } = useAPIClient();

  return useQuery({
    queryKey: ['voice', id],
    queryFn: () => client.voices.get(id as string),
    enabled: !!id,
  });
}

export function useCreateVoice() {
  const { client } = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => client.voices.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voices'] });
    },
  });
}

export function useDeleteVoice() {
  const { client } = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => client.voices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voices'] });
    },
  });
}

// Built-in Voice Queries (filesystem-based high quality references)
export function useBuiltInVoices() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return useQuery({
    queryKey: ['built-in-voices'],
    queryFn: async (): Promise<{ voices: VoiceProfile[] }> => {
      const response = await fetch(`${baseUrl}/api/voices/built-in`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch built-in voices');
      return response.json();
    },
    staleTime: 300000, // 5 minutes
  });
}

// Real-time Progress Hook
export function useVideoProgress(videoId: string | null) {
  const { client } = useAPIClient();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!videoId) return;

    let reconnectTimeout: NodeJS.Timeout;
    let unsubscribe: (() => void) | null = null;
    let isSubscribed = true;

    const connect = () => {
      if (!isSubscribed) return;

      unsubscribe = client.subscribeToProgress(
        videoId,
        (event) => {
          setProgress(event);
          setError(null); // Clear any previous errors on successful message
          // Update video cache with new progress
          queryClient.setQueryData(['video', videoId], (old: Video | undefined) => {
            if (!old) return old;
            return {
              ...old,
              currentStage: event.stage,
              progress: event.progress,
            };
          });
        },
        (err) => {
          // Only show error if it's a real error, not a normal disconnection
          // The connection will auto-reconnect for normal closures
          console.warn('WebSocket error:', err.message);
          setError(err);

          // Auto-reconnect after 2 seconds for any error during active generation
          if (isSubscribed) {
            reconnectTimeout = setTimeout(() => {
              console.log('Reconnecting to progress stream...');
              if (unsubscribe) unsubscribe();
              connect();
            }, 2000);
          }
        },
      );
    };

    connect();

    return () => {
      isSubscribed = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (unsubscribe) unsubscribe();
    };
  }, [videoId, client, queryClient]);

  return { progress, error };
}

// Voice Preset Queries
export function useVoicePresets() {
  const { client } = useAPIClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return useQuery({
    queryKey: ['voice-presets'],
    queryFn: async (): Promise<VoicePresetListResponse> => {
      const response = await fetch(`${baseUrl}/api/voice-presets`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch voice presets');
      return response.json();
    },
    staleTime: 60000, // 1 minute
  });
}

export function useBuiltInPresets() {
  const { client } = useAPIClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return useQuery({
    queryKey: ['voice-presets', 'built-in'],
    queryFn: async (): Promise<VoicePreset[]> => {
      const response = await fetch(`${baseUrl}/api/voice-presets/built-in`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch built-in presets');
      return response.json();
    },
    staleTime: 300000, // 5 minutes (built-in presets don't change often)
  });
}

export function useVoicePreset(id: string | null) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return useQuery({
    queryKey: ['voice-preset', id],
    queryFn: async (): Promise<VoicePreset> => {
      const response = await fetch(`${baseUrl}/api/voice-presets/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch voice preset');
      return response.json();
    },
    enabled: !!id,
  });
}

export function useCreateVoicePreset() {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return useMutation({
    mutationFn: async (data: VoicePresetCreateRequest): Promise<VoicePreset> => {
      const response = await fetch(`${baseUrl}/api/voice-presets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create voice preset');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voice-presets'] });
    },
  });
}

export function useUpdateVoicePreset() {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: VoicePresetUpdateRequest;
    }): Promise<VoicePreset> => {
      const response = await fetch(`${baseUrl}/api/voice-presets/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to update voice preset');
      }
      return response.json();
    },
    onSuccess: (preset) => {
      queryClient.invalidateQueries({ queryKey: ['voice-presets'] });
      queryClient.invalidateQueries({ queryKey: ['voice-preset', preset.id] });
    },
  });
}

export function useDeleteVoicePreset() {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`${baseUrl}/api/voice-presets/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to delete voice preset');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voice-presets'] });
    },
  });
}
