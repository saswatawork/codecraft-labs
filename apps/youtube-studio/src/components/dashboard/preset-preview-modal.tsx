'use client';

import type { VoiceProfile } from '@/lib/types';
import type { VoicePreset } from '@/lib/voice-preset-types';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@ccl/ui';
import { Mic2, Pause, Play, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PresetPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preset?: VoicePreset;
  voice?: VoiceProfile;
}

export function PresetPreviewModal({ open, onOpenChange, preset, voice }: PresetPreviewModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Apply speed if available (client-side approximation)
    if (preset?.speed) {
      audio.playbackRate = Math.max(0.5, Math.min(2.0, preset.speed));
    } else {
      audio.playbackRate = 1.0;
    }
  }, [preset]);

  const handlePlayToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play();
      setPlaying(true);
    }
  };

  const hasPreview = !!voice?.preview;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Preset Preview
          </DialogTitle>
          <DialogDescription>
            Preview your selected preset using the current voice sample. Speed is approximated
            client-side.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Mic2 className="h-4 w-4" />
              <span className="font-medium truncate">{voice?.name ?? 'No voice selected'}</span>
            </div>
            {preset && <Badge className="text-xs">Preset: {preset.name}</Badge>}
          </div>

          {!hasPreview && (
            <div className="rounded-md border p-3 text-xs text-muted-foreground">
              Select a voice with a preview to hear the preset. Use "Explore All Voices" to choose.
            </div>
          )}

          {hasPreview && (
            <div className="space-y-2 rounded-lg border p-3 bg-muted/30">
              <div className="flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 px-3"
                  onClick={handlePlayToggle}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div className="flex-1 h-1.5 bg-border rounded-full" />
                <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                  {preset?.speed ? `Speed ×${preset.speed.toFixed(2)}` : 'Speed ×1.00'}
                </span>
              </div>
              {/* biome-ignore lint/a11y/useMediaCaption: Audio preview doesn't need captions */}
              <audio
                ref={audioRef}
                src={voice?.preview}
                preload="metadata"
                onEnded={() => setPlaying(false)}
                className="hidden"
              />
            </div>
          )}

          {preset && (
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Exaggeration: {preset.exaggeration}</div>
              <div>CFG Weight: {preset.cfgWeight}</div>
              <div>Temperature: {preset.temperature}</div>
              <div>Repetition Penalty: {preset.repetitionPenalty}</div>
              <div>Target WPM: {preset.targetWpm}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
