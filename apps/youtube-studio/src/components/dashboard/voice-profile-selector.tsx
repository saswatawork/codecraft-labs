'use client';

import { useBuiltInVoices } from '@/hooks/use-api';
import { Card, CardContent } from '@ccl/ui';
import { Button } from '@ccl/ui';
import { Badge } from '@ccl/ui';
import type { VoiceProfile } from '@ccl/yt-api-client';
import { Check, Heart, Mic2, Pause, Play, Sparkles, Volume2, Wind, Zap } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

interface VoiceProfileSelectorProps {
  selectedId?: string;
  onSelect: (voiceId: string | undefined) => void;
}

// Voice characteristics mapping (extracted from voice names for demo)
const getVoiceCharacteristics = (name: string) => {
  const lower = name.toLowerCase();
  const characteristics: { label: string; icon: React.ReactNode; color: string }[] = [];

  if (lower.includes('male')) {
    characteristics.push({
      label: 'Male',
      icon: <Mic2 className="h-3 w-3" />,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    });
  } else if (lower.includes('female')) {
    characteristics.push({
      label: 'Female',
      icon: <Mic2 className="h-3 w-3" />,
      color: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
    });
  }

  if (lower.includes('energetic') || lower.includes('vlogger')) {
    characteristics.push({
      label: 'Energetic',
      icon: <Zap className="h-3 w-3" />,
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    });
  }

  if (lower.includes('calm') || lower.includes('warm')) {
    characteristics.push({
      label: 'Calm',
      icon: <Wind className="h-3 w-3" />,
      color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    });
  }

  if (lower.includes('professional') || lower.includes('news') || lower.includes('anchor')) {
    characteristics.push({
      label: 'Professional',
      icon: <Sparkles className="h-3 w-3" />,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    });
  }

  if (lower.includes('warm') || lower.includes('friendly')) {
    characteristics.push({
      label: 'Warm',
      icon: <Heart className="h-3 w-3" />,
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    });
  }

  return characteristics.slice(0, 3); // max 3 characteristics per card
};

function VoiceSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
      <div className="flex gap-1.5">
        <div className="h-5 bg-muted rounded-full w-12 animate-pulse" />
        <div className="h-5 bg-muted rounded-full w-12 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="h-32 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

export function VoiceProfileSelector({ selectedId, onSelect }: VoiceProfileSelectorProps) {
  const { data, isLoading } = useBuiltInVoices();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const voices = useMemo<VoiceProfile[]>(() => data?.voices || [], [data]);

  // Categorize voices
  const categories = useMemo(() => {
    const cats = new Set<string>();
    for (const v of voices) {
      const lower = v.name.toLowerCase();
      if (lower.includes('male')) cats.add('male');
      if (lower.includes('female')) cats.add('female');
      if (lower.includes('professional')) cats.add('professional');
      if (lower.includes('casual') || lower.includes('vlogger')) cats.add('casual');
    }
    return Array.from(cats).sort();
  }, [voices]);

  // Filter voices by category
  const filteredVoices = useMemo(() => {
    if (selectedCategory === 'all') return voices;
    const lower = voices.map((v) => v.name.toLowerCase());
    return voices.filter((v, i) => lower[i].includes(selectedCategory));
  }, [voices, selectedCategory]);

  const handlePlay = (voice: VoiceProfile) => {
    if (!voice.preview) return;

    // Pause all other audio
    for (const a of Object.values(audioRefs.current)) {
      if (a) a.pause();
    }

    const audio = audioRefs.current[voice.id];
    if (audio) {
      if (playingId === voice.id && !audio.paused) {
        audio.pause();
        setPlayingId(null);
      } else {
        audio.currentTime = 0;
        audio.play();
        setPlayingId(voice.id);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Fixed skeleton items don't need stable keys
            <Card key={`skeleton-${i}`} className="border border-border">
              <CardContent className="p-4">
                <VoiceSkeleton />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!voices.length) {
    return (
      <div className="text-center py-8 px-4">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-muted mb-3">
          <Volume2 className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No voices available</p>
        <p className="text-xs text-muted-foreground mt-1">
          High-quality voices could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            className="text-xs h-8"
            onClick={() => setSelectedCategory('all')}
          >
            All ({voices.length})
          </Button>
          {categories.map((cat) => {
            const count = voices.filter((v) => v.name.toLowerCase().includes(cat)).length;
            return (
              <Button
                key={cat}
                type="button"
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                className="text-xs h-8 capitalize"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({count})
              </Button>
            );
          })}
        </div>
      )}

      {/* Voice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {filteredVoices.map((v) => {
          const isSelected = selectedId === v.id;
          const isPlaying = playingId === v.id;
          const characteristics = getVoiceCharacteristics(v.name);

          return (
            <Card
              key={v.id}
              className={`border-2 transition-all duration-200 cursor-pointer group hover:shadow-lg h-full flex flex-col ${
                isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <CardContent className="p-6 space-y-4 flex flex-col h-full">
                {/* Header with name and selection badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-base leading-normal text-foreground">{v.name}</h3>
                  </div>
                  {isSelected && (
                    <div className="shrink-0">
                      <Badge className="gap-1.5 whitespace-nowrap bg-primary text-primary-foreground text-xs py-1.5 px-2.5">
                        <Check className="h-3.5 w-3.5" />
                        Selected
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Characteristics */}
                {characteristics.length > 0 && (
                  <div className="flex flex-wrap gap-2.5">
                    {characteristics.map((char) => (
                      <Badge
                        key={char.label}
                        variant="outline"
                        className={`text-xs gap-2 py-2 px-3 ${char.color}`}
                      >
                        {char.icon}
                        <span>{char.label}</span>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Audio Player */}
                {v.preview && (
                  <div className="space-y-3 bg-muted/50 rounded-lg p-4 border border-muted">
                    <div className="flex items-center justify-between gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 shrink-0 hover:bg-primary/10"
                        onClick={() => handlePlay(v)}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5 text-primary" />
                        ) : (
                          <Play className="h-5 w-5 text-primary" />
                        )}
                      </Button>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-primary to-primary/60 w-0 transition-all"
                          id={`progress-${v.id}`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                        {isPlaying ? 'Playing' : 'Preview'}
                      </span>
                    </div>
                    {/* biome-ignore lint/a11y/useMediaCaption: Audio preview doesn't need captions */}
                    <audio
                      ref={(el) => {
                        audioRefs.current[v.id] = el;
                      }}
                      src={v.preview}
                      preload="metadata"
                      onEnded={() => setPlayingId(null)}
                      onTimeUpdate={(e) => {
                        const audio = e.currentTarget;
                        if (audio.duration) {
                          const percent = (audio.currentTime / audio.duration) * 100;
                          const progress = document.getElementById(`progress-${v.id}`);
                          if (progress) progress.style.width = `${percent}%`;
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 mt-auto">
                  <Button
                    type="button"
                    variant={isSelected ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1 h-10 text-sm font-semibold"
                    onClick={() => onSelect(v.id)}
                  >
                    {isSelected ? 'Selected ✓' : 'Use Voice'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 shrink-0"
                    onClick={() => handlePlay(v)}
                    disabled={!v.preview}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredVoices.length === 0 && (
        <div className="text-center py-8 px-4 rounded-lg border border-dashed border-border">
          <Volume2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No voices in this category. Try selecting another.
          </p>
        </div>
      )}
    </div>
  );
}
