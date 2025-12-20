'use client';

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

export function useAPIClient() {
  const { data: session } = useSession();

  if (!apiClient) {
    apiClient = new YouTubeStudioAPI({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      getAccessToken: async () => session?.accessToken || null,
    });
  }

  return apiClient;
}

// Video Queries
export function useVideos(params?: {
  status?: Video['status'];
  limit?: number;
  offset?: number;
}) {
  const client = useAPIClient();

  return useQuery({
    queryKey: ['videos', params],
    queryFn: () => client.videos.list(params),
    staleTime: 30000, // 30 seconds
  });
}

export function useVideo(id: string | null) {
  const client = useAPIClient();

  return useQuery({
    queryKey: ['video', id],
    queryFn: () => client.videos.get(id!),
    enabled: !!id,
    staleTime: 10000, // 10 seconds
  });
}

export function useCreateVideo() {
  const client = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VideoCreateRequest) => client.videos.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useUpdateVideo() {
  const client = useAPIClient();
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
  const client = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => client.videos.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
  });
}

export function useRegenerateVideo() {
  const client = useAPIClient();
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
  const client = useAPIClient();

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
  const client = useAPIClient();

  return useQuery({
    queryKey: ['voices'],
    queryFn: () => client.voices.list(),
    staleTime: 60000, // 1 minute
  });
}

export function useVoice(id: string | null) {
  const client = useAPIClient();

  return useQuery({
    queryKey: ['voice', id],
    queryFn: () => client.voices.get(id!),
    enabled: !!id,
  });
}

export function useCreateVoice() {
  const client = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => client.voices.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voices'] });
    },
  });
}

export function useDeleteVoice() {
  const client = useAPIClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => client.voices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['voices'] });
    },
  });
}

// Real-time Progress Hook
export function useVideoProgress(videoId: string | null) {
  const client = useAPIClient();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!videoId) return;

    const unsubscribe = client.subscribeToProgress(
      videoId,
      (event) => {
        setProgress(event);
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
        setError(err);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [videoId, client, queryClient]);

  return { progress, error };
}
