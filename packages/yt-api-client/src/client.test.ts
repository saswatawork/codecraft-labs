import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { YouTubeStudioAPI } from './client';
import { VideoCreateRequestSchema } from './types';

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
}

describe('YouTubeStudioAPI', () => {
  const baseUrl = 'https://api.example.com';
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('request headers', () => {
    it('always sends Content-Type: application/json', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ videos: [], total: 0 }));
      const api = new YouTubeStudioAPI({ baseUrl });

      await api.videos.list();

      const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect((options.headers as Record<string, string>)['Content-Type']).toBe('application/json');
    });

    it('attaches Authorization when getAccessToken resolves a token', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ videos: [], total: 0 }));
      const api = new YouTubeStudioAPI({
        baseUrl,
        getAccessToken: async () => 'my-token',
      });

      await api.videos.list();

      const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect((options.headers as Record<string, string>)['Authorization']).toBe('Bearer my-token');
    });

    it('omits Authorization when getAccessToken resolves null', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ videos: [], total: 0 }));
      const api = new YouTubeStudioAPI({
        baseUrl,
        getAccessToken: async () => null,
      });

      await api.videos.list();

      const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect((options.headers as Record<string, string>)['Authorization']).toBeUndefined();
    });

    it('attaches X-User-Id when getUserId resolves an id', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ videos: [], total: 0 }));
      const api = new YouTubeStudioAPI({
        baseUrl,
        getUserId: async () => 'user-123',
      });

      await api.videos.list();

      const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect((options.headers as Record<string, string>)['X-User-Id']).toBe('user-123');
    });
  });

  describe('videos', () => {
    it('builds query params only for provided list() filters', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ videos: [], total: 0 }));
      const api = new YouTubeStudioAPI({ baseUrl });

      await api.videos.list({ status: 'ready', limit: 10 });

      const [url] = fetchMock.mock.calls[0] as [string];
      expect(url).toBe(`${baseUrl}/api/videos?status=ready&limit=10`);
    });

    it('omits the query string when list() is called with no filters', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ videos: [], total: 0 }));
      const api = new YouTubeStudioAPI({ baseUrl });

      await api.videos.list();

      const [url] = fetchMock.mock.calls[0] as [string];
      expect(url).toBe(`${baseUrl}/api/videos`);
    });

    it('sends a POST with a JSON body on create()', async () => {
      const payload = VideoCreateRequestSchema.parse({
        title: 'Test',
        description: '',
        scriptContent: 'x',
        audioSettings: {},
      });
      fetchMock.mockResolvedValueOnce(jsonResponse({ id: '1', ...payload }));
      const api = new YouTubeStudioAPI({ baseUrl });

      await api.videos.create(payload);

      const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(`${baseUrl}/api/videos`);
      expect(options.method).toBe('POST');
      expect(JSON.parse(options.body as string)).toMatchObject(payload);
    });

    it('throws the API error message on a non-ok response', async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ error: 'not_found', message: 'Video not found' }, { status: 404 }),
      );
      const api = new YouTubeStudioAPI({ baseUrl });

      await expect(api.videos.get('missing-id')).rejects.toThrow('Video not found');
    });

    it('falls back to a generic error message when none is provided', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({}, { status: 500 }));
      const api = new YouTubeStudioAPI({ baseUrl });

      await expect(api.videos.get('x')).rejects.toThrow('API request failed');
    });
  });

  describe('voices.create (FormData upload)', () => {
    it('omits Content-Type so the browser can set the multipart boundary', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'voice-1' }));
      const api = new YouTubeStudioAPI({ baseUrl });
      const form = new FormData();
      form.append('name', 'My Voice');

      await api.voices.create(form);

      const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(options.headers).not.toHaveProperty('Content-Type');
      expect(options.body).toBe(form);
    });
  });
});
