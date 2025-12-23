'use client';

import type { VoiceProfile } from '@/lib/types';
import { Button } from '@ccl/ui';
import { Input } from '@ccl/ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@ccl/ui';
import { Badge } from '@ccl/ui';
import { Check, Heart, Mic2, Pause, Play, Sparkles, Volume2, Wind, X, Zap } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

interface VoiceLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  voices: VoiceProfile[];
  selectedId?: string;
  onSelect: (voiceId: string) => void;
}

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

  return characteristics.slice(0, 3);
};

export function VoiceLibraryModal({
  open,
  onOpenChange,
  voices,
  selectedId,
  onSelect,
}: VoiceLibraryModalProps) {
  // Normalize voices to a safe array in case the prop isn't an array (e.g., { voices: [...] } or undefined)
  const voicesList = useMemo<VoiceProfile[]>(() => {
    if (Array.isArray(voices)) return voices as VoiceProfile[];
    const nested = (voices as any)?.voices;
    if (Array.isArray(nested)) return nested as VoiceProfile[];
    return [];
  }, [voices]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const categories = useMemo(() => {
    const cats = new Set<string>();
    for (const v of voicesList) {
      const lower = v.name.toLowerCase();
      if (lower.includes('male')) cats.add('male');
      if (lower.includes('female')) cats.add('female');
      if (lower.includes('professional')) cats.add('professional');
      if (lower.includes('casual') || lower.includes('vlogger')) cats.add('casual');
    }
    return Array.from(cats).sort();
  }, [voicesList]);

  const filteredVoices = useMemo(() => {
    const byCategory =
      selectedCategory === 'all'
        ? voicesList
        : voicesList.filter((v) => v.name.toLowerCase().includes(selectedCategory));
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(
      (v) => v.name.toLowerCase().includes(q) || v.id.toLowerCase().includes(q),
    );
  }, [voicesList, selectedCategory, query]);

  const handlePlay = (voice: VoiceProfile) => {
    if (!voice.preview) return;

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

  const handleSelectVoice = (voiceId: string) => {
    onSelect(voiceId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl">Voice Library</DialogTitle>
              <DialogDescription>
                Browse and listen to professional voices. Click "Select" to choose.
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search voices (name or id)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setQuery('')}
              className="hidden sm:inline"
            >
              Clear
            </Button>
          </div>
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                className="text-xs h-9"
                onClick={() => setSelectedCategory('all')}
              >
                All ({voicesList.length})
              </Button>
              {categories.map((cat) => {
                const count = voicesList.filter((v) => v.name.toLowerCase().includes(cat)).length;
                return (
                  <Button
                    key={cat}
                    type="button"
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    className="text-xs h-9 capitalize"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat} ({count})
                  </Button>
                );
              })}
            </div>
          )}

          {/* Voice Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVoices.map((v) => {
              const isSelected = selectedId === v.id;
              const isPlaying = playingId === v.id;
              const characteristics = getVoiceCharacteristics(v.name);

              return (
                <div
                  key={v.id}
                  className={`border-2 rounded-lg p-5 space-y-4 transition-all duration-200 cursor-pointer hover:shadow-lg flex flex-col h-full ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {/* Header with name */}
                  <div>
                    <h3 className="font-bold text-base text-foreground">{v.name}</h3>
                  </div>

                  {/* Characteristics */}
                  {characteristics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {characteristics.map((char) => (
                        <Badge
                          key={char.label}
                          variant="outline"
                          className={`text-xs gap-1.5 py-1 px-2.5 ${char.color}`}
                        >
                          {char.icon}
                          <span>{char.label}</span>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Audio Player */}
                  {v.preview && (
                    <div className="space-y-2.5 bg-muted/50 rounded-lg p-3 border border-muted">
                      <div className="flex items-center justify-between gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 shrink-0 hover:bg-primary/10"
                          onClick={() => handlePlay(v)}
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4 text-primary" />
                          ) : (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                        </Button>
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-primary to-primary/60 w-0 transition-all"
                            id={`progress-${v.id}`}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          {isPlaying ? 'Playing' : 'Preview'}
                        </span>
                      </div>
                      {/* biome-ignore lint/a11y/useMediaCaption: Audio preview doesn't need captions */}
                      <audio
                        ref={(el) => {
                          if (el) audioRefs.current[v.id] = el;
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

                  {/* Select Button */}
                  <div className="pt-2 mt-auto">
                    <Button
                      type="button"
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      className="w-full h-9 text-sm font-medium"
                      onClick={() => handleSelectVoice(v.id)}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Selected
                        </>
                      ) : (
                        'Select Voice'
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredVoices.length === 0 && (
            <div className="text-center py-12">
              <Volume2 className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-muted-foreground">No voices in this category. Try another.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
