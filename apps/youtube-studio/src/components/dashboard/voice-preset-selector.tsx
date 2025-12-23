'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBuiltInPresets, useVoicePresets } from '@/hooks/use-api';
import type { VoicePreset } from '@/lib/voice-preset-types';
import { Button } from '@ccl/ui';
import { Loader2, Settings, Sparkles, User } from 'lucide-react';

interface VoicePresetSelectorProps {
  value?: string;
  onChange: (presetId: string | undefined) => void;
  onManagePresets?: () => void;
  disabled?: boolean;
}

export function VoicePresetSelector({
  value,
  onChange,
  onManagePresets,
  disabled = false,
}: VoicePresetSelectorProps) {
  const { data: presetsData, isLoading: loadingPresets } = useVoicePresets();
  const { data: builtInPresets = [], isLoading: loadingBuiltIn } = useBuiltInPresets();

  const isLoading = loadingPresets || loadingBuiltIn;

  // Group presets by type
  const userPresets = presetsData?.userPresets || [];
  const publicPresets = presetsData?.publicPresets || [];
  const builtIn = builtInPresets;

  // Get selected preset details
  const selectedPreset = [...builtIn, ...userPresets, ...publicPresets].find((p) => p.id === value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="voice-preset">Voice Preset</Label>
        {onManagePresets && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onManagePresets}
            className="h-7 px-2 text-xs"
          >
            <Settings className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            Manage
          </Button>
        )}
      </div>

      <Select
        value={value || 'none'}
        onValueChange={(v) => onChange(v === 'none' ? undefined : v)}
        disabled={disabled || isLoading}
      >
        <SelectTrigger id="voice-preset" className="w-full">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading presets...
            </span>
          ) : (
            <SelectValue placeholder="Select a voice preset" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">
            <span className="text-muted-foreground">No preset (use config defaults)</span>
          </SelectItem>

          {builtIn.length > 0 && (
            <SelectGroup>
              <SelectLabel className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Built-in Presets
              </SelectLabel>
              {builtIn.map((preset) => (
                <SelectItem key={preset.id} value={preset.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {preset.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {userPresets.length > 0 && (
            <SelectGroup>
              <SelectLabel className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                My Presets
              </SelectLabel>
              {userPresets.map((preset) => (
                <SelectItem key={preset.id} value={preset.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{preset.name}</span>
                    {preset.description && (
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {preset.description}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          )}

          {publicPresets.length > 0 && (
            <SelectGroup>
              <SelectLabel>Community Presets</SelectLabel>
              {publicPresets.map((preset) => (
                <SelectItem key={preset.id} value={preset.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{preset.name}</span>
                    {preset.description && (
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {preset.description}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>

      {selectedPreset && (
        <div className="text-xs text-muted-foreground space-y-1 pt-1">
          <p>{selectedPreset.description}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
            <span>Exaggeration: {selectedPreset.exaggeration}</span>
            <span>CFG: {selectedPreset.cfgWeight}</span>
            <span>Temp: {selectedPreset.temperature}</span>
            <span>Speed: {selectedPreset.speed}x</span>
          </div>
        </div>
      )}
    </div>
  );
}
