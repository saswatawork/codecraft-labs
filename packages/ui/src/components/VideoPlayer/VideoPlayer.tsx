import * as React from 'react';
import { cn } from '../../utils';

export interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
  showControls?: boolean;
}

export const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, poster, onTimeUpdate, onEnded, showControls = true, className, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      onTimeUpdate?.(video.currentTime);
    };

    const handleEnded = () => {
      onEnded?.();
    };

    return (
      <div className={cn('relative w-full overflow-hidden rounded-lg bg-black', className)}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={showControls}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="w-full h-full"
          {...props}
        />
      </div>
    );
  },
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
