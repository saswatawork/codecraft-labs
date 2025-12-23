'use client';

import { Button } from '@ccl/ui';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { VoiceProfile } from '@/lib/types';

interface PresetAudioPlayerProps {
  voice: VoiceProfile | undefined;
  speed?: number;
  className?: string;
}

export function PresetAudioPlayer({ voice, speed = 1.0, className = '' }: PresetAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const normalizedSpeed = typeof speed === 'number' && isFinite(speed) && speed > 0 ? Math.min(3, Math.max(0.5, speed)) : 1;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [voice?.preview]);

  // Reset playback when voice changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
  }, [voice?.preview]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = normalizedSpeed;
    }
  }, [normalizedSpeed]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    } else {
      audio.play();
      progressInterval.current = setInterval(() => {
        if (audio.currentTime) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!voice?.preview) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 ${className}`}>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Volume2 className="h-4 w-4" />
          <span>No preview available</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <audio ref={audioRef} src={voice.preview} preload="metadata" />
      
      <div className="flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
        <Button
          type="button"
          size="icon"
          variant="default"
          className="h-9 w-9 shrink-0 shadow-md hover:shadow-lg transition-all"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground truncate">{voice.name}</span>
            <span className="text-muted-foreground shrink-0 ml-2">
              {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="relative w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-accent transition-all duration-150 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {normalizedSpeed !== 1.0 && (
        <div className="flex items-center justify-end gap-1.5 px-1">
          <span className="text-xs text-muted-foreground">Speed:</span>
          <span className="text-xs font-semibold text-primary">{normalizedSpeed.toFixed(1)}x</span>
        </div>
      )}
    </div>
  );
}
