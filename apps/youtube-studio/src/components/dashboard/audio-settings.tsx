import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AUDIO_PRESETS, EMOTIONS, THEMES } from '@/lib/constants';
import type { AudioSettings as AudioSettingsType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ccl/ui';
import { Button } from '@ccl/ui';
import { Badge } from '@ccl/ui';
import {
  AudioWaveform,
  Info,
  Mic,
  Music,
  Play,
  SlidersHorizontal,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useState } from 'react';

interface AudioSettingsProps {
  settings: AudioSettingsType;
  onChange: (settings: AudioSettingsType) => void;
  compact?: boolean;
  showPresets?: boolean;
}

export function AudioSettings({
  settings,
  onChange,
  compact = false,
  showPresets = true,
}: AudioSettingsProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');

  const handlePresetSelect = (presetId: string) => {
    const preset = AUDIO_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChange(preset.settings);
      setActiveTab('custom');
    }
  };

  const handleReset = () => {
    onChange({
      tempo: 1.0,
      emotion: 'neutral',
      theme: 'none',
      volume: 80,
      pitch: 1.0,
      musicVolume: 30,
      voiceClarity: 75,
      backgroundNoise: 0,
    });
  };

  const updateSetting = <K extends keyof AudioSettingsType>(
    key: K,
    value: AudioSettingsType[K],
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const SliderControl = ({
    id,
    label,
    value,
    min,
    max,
    step,
    suffix = '',
    icon: Icon,
    info,
    onChange: onValueChange,
  }: {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    suffix?: string;
    icon?: typeof AudioWaveform;
    info?: string;
    onChange: (value: number) => void;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
          </Label>
          {info && <InfoTooltip content={info} />}
        </div>
        <div className="min-w-14">
          <Badge variant="secondary" className="font-mono text-xs justify-center">
            {value.toFixed(step < 1 ? 1 : 0)}
            {suffix}
          </Badge>
        </div>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onValueChange(v)}
        className="cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );

  if (compact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Audio Settings</CardTitle>
          <CardDescription>Customize the audio style</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emotion-compact">Emotion</Label>
            <Select
              value={settings.emotion}
              onValueChange={(v) => updateSetting('emotion', v as any)}
            >
              <SelectTrigger id="emotion-compact">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMOTIONS.map((emotion) => (
                  <SelectItem key={emotion.value} value={emotion.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{emotion.label}</span>
                      <span className="text-xs text-muted-foreground">{emotion.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme-compact">Background Music</Label>
            <Select value={settings.theme} onValueChange={(v) => updateSetting('theme', v as any)}>
              <SelectTrigger id="theme-compact">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {THEMES.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{theme.label}</span>
                      <span className="text-xs text-muted-foreground">{theme.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="tempo-compact">Tempo</Label>
              <Badge variant="secondary" className="font-mono text-xs">
                {settings.tempo.toFixed(1)}x
              </Badge>
            </div>
            <Slider
              id="tempo-compact"
              min={0.5}
              max={2}
              step={0.1}
              value={[settings.tempo]}
              onValueChange={([v]) => updateSetting('tempo', v)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="volume-compact">Volume</Label>
              <Badge variant="secondary" className="font-mono text-xs">
                {settings.volume}%
              </Badge>
            </div>
            <Slider
              id="volume-compact"
              min={0}
              max={100}
              step={5}
              value={[settings.volume]}
              onValueChange={([v]) => updateSetting('volume', v)}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <AudioWaveform className="h-5 w-5" />
              Audio Settings
            </CardTitle>
            <CardDescription>Customize voice and music settings</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-4">
          {showPresets && (
            <>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="presets" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Presets
                </TabsTrigger>
                <TabsTrigger value="custom" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Custom
                </TabsTrigger>
              </TabsList>

              <TabsContent value="presets" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AUDIO_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset.id)}
                      className={cn(
                        'group relative p-4 rounded-lg border-2 transition-all text-left',
                        'hover:border-primary hover:bg-primary/5',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      )}
                    >
                      <div className="space-y-2">
                        <div className="text-2xl">{preset.icon}</div>
                        <div>
                          <h4 className="font-semibold text-sm">{preset.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {preset.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-4 w-4 text-primary fill-primary" />
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </>
          )}

          <TabsContent value="custom" className={showPresets ? '' : 'mt-0'}>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Voice Settings</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emotion" className="text-sm">
                      Emotion
                    </Label>
                    <Select
                      value={settings.emotion}
                      onValueChange={(v) => updateSetting('emotion', v as any)}
                    >
                      <SelectTrigger id="emotion">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {EMOTIONS.map((emotion) => (
                          <SelectItem key={emotion.value} value={emotion.value}>
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{emotion.label}</span>
                              <span className="text-xs text-muted-foreground">
                                {emotion.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <SliderControl
                    id="tempo"
                    label="Tempo"
                    value={settings.tempo}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    suffix="x"
                    icon={AudioWaveform}
                    info="Controls the speed of narration. 1.0x is normal speed."
                    onChange={(v) => updateSetting('tempo', v)}
                  />

                  <SliderControl
                    id="pitch"
                    label="Pitch"
                    value={settings.pitch || 1.0}
                    min={0.8}
                    max={1.2}
                    step={0.05}
                    suffix="x"
                    info="Adjusts the voice pitch. Higher values create a higher-pitched voice."
                    onChange={(v) => updateSetting('pitch', v)}
                  />

                  <SliderControl
                    id="voice-clarity"
                    label="Voice Clarity"
                    value={settings.voiceClarity || 75}
                    min={0}
                    max={100}
                    step={5}
                    suffix="%"
                    info="Enhances voice clarity through noise reduction and EQ."
                    onChange={(v) => updateSetting('voiceClarity', v)}
                  />

                  <SliderControl
                    id="volume"
                    label="Voice Volume"
                    value={settings.volume}
                    min={0}
                    max={100}
                    step={5}
                    suffix="%"
                    icon={Volume2}
                    info="Master volume level for the voice narration."
                    onChange={(v) => updateSetting('volume', v)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Music Settings</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-sm">
                      Background Music
                    </Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(v) => updateSetting('theme', v as any)}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {THEMES.map((theme) => (
                          <SelectItem key={theme.value} value={theme.value}>
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{theme.label}</span>
                              <span className="text-xs text-muted-foreground">
                                {theme.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {settings.theme !== 'none' && (
                    <SliderControl
                      id="music-volume"
                      label="Music Volume"
                      value={settings.musicVolume || 30}
                      min={0}
                      max={100}
                      step={5}
                      suffix="%"
                      info="Volume level for background music relative to voice."
                      onChange={(v) => updateSetting('musicVolume', v)}
                    />
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <SliderControl
                    id="background-noise"
                    label="Ambient Atmosphere"
                    value={settings.backgroundNoise || 0}
                    min={0}
                    max={30}
                    step={5}
                    suffix="%"
                    info="Adds subtle ambient sound for natural atmosphere. Use sparingly."
                    onChange={(v) => updateSetting('backgroundNoise', v)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
