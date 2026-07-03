# @ccl/yt-api-client

Type-safe TypeScript client for the YouTube Studio backend API. Used by
[`apps/youtube-studio`](../../apps/youtube-studio) to talk to the video
generation, voice profile, and progress-tracking endpoints.

## Install

Internal workspace package — add it via the `workspace:*` protocol:

```json
{
  "dependencies": {
    "@ccl/yt-api-client": "workspace:*"
  }
}
```

## Usage

```ts
import { YouTubeStudioAPI } from '@ccl/yt-api-client';

const api = new YouTubeStudioAPI({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  getAccessToken: async () => session?.accessToken ?? null,
  getUserId: async () => session?.user?.id ?? null,
});
```

`getAccessToken` and `getUserId` are optional hooks the client calls before
every request to attach an `Authorization: Bearer <token>` header and an
`X-User-Id` header. Omit them if the backend doesn't require auth.

### Videos

```ts
const { videos, total } = await api.videos.list({ status: 'ready', limit: 20 });

const video = await api.videos.create({
  title: 'My video',
  description: '...',
  scriptContent: '...',
  language: 'en',
  audioSettings: { tempo: 1, emotion: 'neutral', theme: 'none', volume: 80 },
  profile: 'default',
});

await api.videos.update(video.id, { status: 'published' });
await api.videos.regenerate(video.id);
const blob = await api.videos.download(video.id);
await api.videos.delete(video.id);
```

### Voices

```ts
const { voices } = await api.voices.list();
const voice = await api.voices.get(voiceId);

// Upload a custom voice sample (multipart/form-data)
const form = new FormData();
form.append('name', 'My Voice');
form.append('audio', file);
await api.voices.create(form);

await api.voices.delete(voiceId);
```

### Progress subscription (WebSocket)

`subscribeToProgress` opens a WebSocket connection scoped to a single video
and returns an unsubscribe function:

```ts
const unsubscribe = api.subscribeToProgress(
  video.id,
  (event) => console.log(event.stage, event.progress),
  (error) => console.error(error),
);

// later
unsubscribe();
```

## Types

All request/response shapes are derived from Zod schemas in
[`src/types.ts`](./src/types.ts) — `Video`, `VideoCreateRequest`,
`VideoUpdateRequest`, `VoiceProfile`, `ProgressEvent`, `APIError`, and the
underlying `AudioSettings`, `VideoScript`, `VideoScene`, `Caption`, and
`CaptionTrack` schemas. Import the schema directly if you need runtime
validation (e.g. `VideoSchema.parse(data)`); import the type-only export for
compile-time checks.

## Scripts

```bash
pnpm --filter @ccl/yt-api-client build       # tsc -> dist/
pnpm --filter @ccl/yt-api-client typecheck   # tsc --noEmit
pnpm --filter @ccl/yt-api-client lint        # eslint src/
pnpm --filter @ccl/yt-api-client test        # vitest run
```
