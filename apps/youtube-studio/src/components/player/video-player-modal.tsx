'use client';

import type { Video } from '@/lib/types';
import { CompoundDialog, DialogFooter } from '@ccl/ui';
import { Button } from '@ccl/ui';

type VideoPlayerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
};

export function VideoPlayerModal({ open, onOpenChange, video }: VideoPlayerModalProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const rawVideoUrl = video?.videoUrl;

  // Construct full URL if videoUrl is a relative path
  const videoUrl = rawVideoUrl
    ? rawVideoUrl.startsWith('http')
      ? rawVideoUrl
      : `${baseUrl}${rawVideoUrl.startsWith('/') ? '' : '/'}${rawVideoUrl}`
    : undefined;

  console.log('VideoPlayerModal Debug:', {
    video,
    rawVideoUrl,
    videoUrl,
    baseUrl,
    status: video?.status,
  });

  return (
    <CompoundDialog
      open={open}
      onOpenChange={onOpenChange}
      size="xl"
      animation="scale"
      title={video?.title ?? 'Preview'}
      showClose
      className="sm:w-[900px]"
    >
      <div className="space-y-4">
        {videoUrl ? (
          <div className="relative w-full">
            <div className="aspect-video w-full overflow-hidden rounded-md border bg-muted">
              {/* Avoid autoplay restrictions; let user press play */}
              {/* biome-ignore lint/a11y/useMediaCaption: Caption tracks are added separately via UI */}
              <video
                src={videoUrl}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full"
                onError={(e) => {
                  // biome-ignore lint/suspicious/noConsole: Debugging video playback errors
                  console.error('Video error:', {
                    error: e,
                    src: videoUrl,
                    video: e.currentTarget,
                  });
                }}
                onLoadedMetadata={(e) => {
                  // biome-ignore lint/suspicious/noConsole: Debugging video metadata loading
                  console.log('Video loaded:', {
                    duration: e.currentTarget.duration,
                    src: videoUrl,
                  });
                }}
              />
            </div>
          </div>
        ) : (
          <div className="p-4 text-sm text-muted-foreground">Video not ready yet.</div>
        )}
      </div>
      <DialogFooter>
        {videoUrl && (
          <Button
            variant="outline"
            onClick={() => {
              const a = document.createElement('a');
              a.href = videoUrl;
              a.download = `video-${video?.id}.mp4`;
              document.body.appendChild(a);
              a.click();
              a.remove();
            }}
          >
            Download
          </Button>
        )}
        <Button onClick={() => onOpenChange(false)}>Close</Button>
      </DialogFooter>
    </CompoundDialog>
  );
}
