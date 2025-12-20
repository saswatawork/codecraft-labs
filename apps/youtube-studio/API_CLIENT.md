# API Client Implementation

## Overview
Type-safe TypeScript API client for YouTube Studio video generation backend.

## Package Structure
```
packages/yt-api-client/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts          # Public exports
    ├── types.ts          # Zod schemas & TypeScript types
    └── client.ts         # API client class
```

## Type System

### Core Types
- **Video**: Complete video model with status, progress, script, captions
- **VoiceProfile**: Custom voice cloning references
- **AudioSettings**: Tempo, emotion, theme, volume controls
- **VideoScene**: Script breakdown with narration + visuals
- **CaptionTrack**: Multi-language subtitle support
- **ProgressEvent**: Real-time WebSocket updates

### Validation
All API requests validated with Zod schemas:
- `VideoCreateRequestSchema`
- `AudioSettingsSchema`
- `VideoScriptSchema`

## API Client Features

### Video Resources
```typescript
const client = new YouTubeStudioAPI({ baseUrl, getAccessToken });

// CRUD operations
await client.videos.create(data);
await client.videos.list({ status: "ready", limit: 10 });
await client.videos.get(id);
await client.videos.update(id, { title: "New Title" });
await client.videos.delete(id);

// Special operations
await client.videos.regenerate(id);
const blob = await client.videos.download(id);
```

### Voice Resources
```typescript
// List and get voices
await client.voices.list();
await client.voices.get(id);

// Create with file upload
const formData = new FormData();
formData.append("name", "My Voice");
formData.append("audio", audioFile);
await client.voices.create(formData);

// Delete
await client.voices.delete(id);
```

### Real-time Progress
```typescript
const unsubscribe = client.subscribeToProgress(
  videoId,
  (event) => {
    console.log(event.stage, event.progress, event.message);
  },
  (error) => console.error(error)
);

// Cleanup
unsubscribe();
```

## React Hooks (Next.js Integration)

### Setup
```typescript
// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Providers wrap app
```

### Video Hooks
```typescript
import {
  useVideos,
  useVideo,
  useCreateVideo,
  useUpdateVideo,
  useDeleteVideo,
  useRegenerateVideo,
  useDownloadVideo,
  useVideoProgress,
} from "@/hooks/use-api";

// List videos
const { data, isLoading } = useVideos({ status: "ready" });

// Get single video
const { data: video } = useVideo(id);

// Create video
const createMutation = useCreateVideo();
await createMutation.mutateAsync(videoData);

// Real-time progress
const { progress } = useVideoProgress(videoId);
```

### Voice Hooks
```typescript
import {
  useVoices,
  useVoice,
  useCreateVoice,
  useDeleteVoice,
} from "@/hooks/use-api";

// List voices
const { data } = useVoices();

// Create voice
const createVoice = useCreateVoice();
const formData = new FormData();
formData.append("name", "My Voice");
formData.append("audio", file);
await createVoice.mutateAsync(formData);
```

## Authentication Integration

Uses NextAuth.js session tokens:
```typescript
const client = new YouTubeStudioAPI({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  getAccessToken: async () => session?.accessToken || null,
});
```

All requests automatically include:
```
Authorization: Bearer <token>
```

## Error Handling

API errors follow consistent structure:
```typescript
interface APIError {
  error: string;
  message: string;
  details?: Record<string, any>;
}
```

Hooks automatically handle errors:
```typescript
const { data, error, isError } = useVideos();

if (isError) {
  toast.error(error.message);
}
```

## Next Steps

### Backend Implementation
Create FastAPI server in `yt-studio/api/`:
```python
# api/server.py
from fastapi import FastAPI, WebSocket
from pydantic import BaseModel

app = FastAPI()

@app.post("/api/videos")
async def create_video(data: VideoCreateRequest):
    # Queue generation job
    # Return video with status="queued"
    pass

@app.websocket("/api/progress/{video_id}")
async def progress_stream(websocket: WebSocket, video_id: str):
    # Stream progress updates
    pass
```

### Database Schema
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  script_content TEXT NOT NULL,
  status VARCHAR(20) NOT NULL,
  -- ... other fields
);

CREATE TABLE voices (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL
);
```

### Job Queue
```python
# Use BullMQ with Upstash Redis
from bullmq import Queue

video_queue = Queue("video-generation", connection=redis_client)

async def enqueue_video_generation(video_id: str):
    await video_queue.add("generate", {"video_id": video_id})
```

## Usage Example

Complete workflow:
```typescript
"use client";

import { useCreateVideo, useVideoProgress } from "@/hooks/use-api";
import { useState } from "react";

export function CreateVideoView() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const createVideo = useCreateVideo();
  const { progress } = useVideoProgress(videoId);

  const handleSubmit = async (data: VideoCreateRequest) => {
    const video = await createVideo.mutateAsync(data);
    setVideoId(video.id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
      
      {progress && (
        <div>
          <p>{progress.stage}: {progress.progress}%</p>
          <p>{progress.message}</p>
        </div>
      )}
    </div>
  );
}
```

## Environment Variables

Required in Next.js app:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.youtube-studio.com
```
