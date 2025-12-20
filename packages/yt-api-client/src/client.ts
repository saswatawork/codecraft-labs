import type {
  APIError,
  ProgressEvent,
  Video,
  VideoCreateRequest,
  VideoUpdateRequest,
  VoiceProfile,
} from './types';

export interface APIClientConfig {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
}

export class YouTubeStudioAPI {
  private baseUrl: string;
  private getAccessToken?: () => Promise<string | null>;

  constructor(config: APIClientConfig) {
    this.baseUrl = config.baseUrl;
    this.getAccessToken = config.getAccessToken;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.getAccessToken) {
      const token = await this.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: APIError = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  // Video Resources
  videos = {
    create: async (data: VideoCreateRequest): Promise<Video> => {
      return this.request<Video>('/api/videos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    list: async (params?: {
      status?: Video['status'];
      limit?: number;
      offset?: number;
    }): Promise<{ videos: Video[]; total: number }> => {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.set('status', params.status);
      if (params?.limit) queryParams.set('limit', params.limit.toString());
      if (params?.offset) queryParams.set('offset', params.offset.toString());

      const query = queryParams.toString();
      return this.request<{ videos: Video[]; total: number }>(
        `/api/videos${query ? `?${query}` : ''}`,
      );
    },

    get: async (id: string): Promise<Video> => {
      return this.request<Video>(`/api/videos/${id}`);
    },

    update: async (id: string, data: VideoUpdateRequest): Promise<Video> => {
      return this.request<Video>(`/api/videos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<{ success: boolean }> => {
      return this.request<{ success: boolean }>(`/api/videos/${id}`, {
        method: 'DELETE',
      });
    },

    regenerate: async (id: string): Promise<Video> => {
      return this.request<Video>(`/api/videos/${id}/regenerate`, {
        method: 'POST',
      });
    },

    download: async (id: string): Promise<Blob> => {
      const headers = await this.getHeaders();
      const url = `${this.baseUrl}/api/videos/${id}/download`;

      const response = await fetch(url, { headers });

      if (!response.ok) {
        const error: APIError = await response.json();
        throw new Error(error.message || 'Download failed');
      }

      return response.blob();
    },
  };

  // Voice Resources
  voices = {
    list: async (): Promise<{ voices: VoiceProfile[] }> => {
      return this.request<{ voices: VoiceProfile[] }>('/api/voices');
    },

    get: async (id: string): Promise<VoiceProfile> => {
      return this.request<VoiceProfile>(`/api/voices/${id}`);
    },

    create: async (data: FormData): Promise<VoiceProfile> => {
      const headers = await this.getHeaders();
      // Remove Content-Type to let browser set boundary for FormData
      (headers as Record<string, string>)['Content-Type'] = undefined;

      const url = `${this.baseUrl}/api/voices`;
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: data,
      });

      if (!response.ok) {
        const error: APIError = await response.json();
        throw new Error(error.message || 'Voice creation failed');
      }

      return response.json();
    },

    delete: async (id: string): Promise<{ success: boolean }> => {
      return this.request<{ success: boolean }>(`/api/voices/${id}`, {
        method: 'DELETE',
      });
    },
  };

  // WebSocket Progress Subscription
  subscribeToProgress(
    videoId: string,
    onProgress: (event: ProgressEvent) => void,
    onError?: (error: Error) => void,
  ): () => void {
    const wsUrl = this.baseUrl.replace(/^http/, 'ws');
    const ws = new WebSocket(`${wsUrl}/api/progress/${videoId}`);

    ws.onmessage = (event) => {
      try {
        const data: ProgressEvent = JSON.parse(event.data);
        onProgress(data);
      } catch (error) {
        onError?.(error as Error);
      }
    };

    ws.onerror = (event) => {
      onError?.(new Error('WebSocket error'));
    };

    ws.onclose = () => {
      // Auto-reconnect logic could be added here
    };

    return () => {
      ws.close();
    };
  }
}
