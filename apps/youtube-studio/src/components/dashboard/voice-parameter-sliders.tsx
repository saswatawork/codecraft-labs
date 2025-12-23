'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DEFAULT_VOICE_PRESET, VOICE_PARAMETERS, type VoicePreset } from '@/lib/voice-preset-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ccl/ui';
import { Input } from '@ccl/ui';
import { Info } from 'lucide-react';

interface VoiceParameterSlidersProps {
  values: Partial<
    Pick<
      VoicePreset,
      | 'exaggeration'
      | 'cfgWeight'
      | 'temperature'
      | 'repetitionPenalty'
      | 'speed'
      | 'seed'
      | 'targetWpm'
      | 'language'
    >
  >;
  onChange: (values: Partial<VoiceParameterSlidersProps['values']>) => void;
  disabled?: boolean;
  showAdvanced?: boolean;
}

export function VoiceParameterSliders({
  values,
  onChange,
  disabled = false,
  showAdvanced = true,
}: VoiceParameterSlidersProps) {
  const handleSliderChange = (key: string, value: number[]) => {
    onChange({ [key]: value[0] });
  };

  const handleInputChange = (key: string, value: string) => {
    const numValue = Number.parseFloat(value);
    if (!Number.isNaN(numValue)) {
      onChange({ [key]: numValue });
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Primary Parameters */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Primary Parameters</h4>

          {VOICE_PARAMETERS.filter((p) =>
            ['exaggeration', 'cfgWeight', 'temperature', 'speed'].includes(p.key),
          ).map((param) => {
            const currentValue = values[param.key] ?? param.defaultValue;

            return (
              <div key={param.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor={param.key} className="text-sm">
                      {param.label}
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{param.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-1">
                    <Input
                      id={`${param.key}-input`}
                      type="number"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={currentValue}
                      onChange={(e) => handleInputChange(param.key, e.target.value)}
                      disabled={disabled}
                      className="h-7 w-16 text-xs text-right"
                    />
                    {param.unit && (
                      <span className="text-xs text-muted-foreground w-6">{param.unit}</span>
                    )}
                  </div>
                </div>
                <Slider
                  id={param.key}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={[currentValue]}
                  onValueChange={(v) => handleSliderChange(param.key, v)}
                  disabled={disabled}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{param.min}</span>
                  <span>{param.max}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advanced Parameters */}
        {showAdvanced && (
          <div className="space-y-4 pt-2 border-t">
            <h4 className="text-sm font-medium">Advanced Parameters</h4>

            {VOICE_PARAMETERS.filter((p) => ['repetitionPenalty', 'targetWpm'].includes(p.key)).map(
              (param) => {
                const currentValue = values[param.key] ?? param.defaultValue;

                return (
                  <div key={param.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Label htmlFor={param.key} className="text-sm">
                          {param.label}
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{param.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex items-center gap-1">
                        <Input
                          id={`${param.key}-input`}
                          type="number"
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          value={currentValue}
                          onChange={(e) => handleInputChange(param.key, e.target.value)}
                          disabled={disabled}
                          className="h-7 w-16 text-xs text-right"
                        />
                        {param.unit && (
                          <span className="text-xs text-muted-foreground w-10">{param.unit}</span>
                        )}
                      </div>
                    </div>
                    <Slider
                      id={param.key}
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={[currentValue]}
                      onValueChange={(v) => handleSliderChange(param.key, v)}
                      disabled={disabled}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                );
              },
            )}

            {/* Seed Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="seed" className="text-sm">
                  Random Seed
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Controls randomness. Use the same seed for consistent voice output.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="seed"
                type="number"
                min={0}
                value={values.seed ?? DEFAULT_VOICE_PRESET.seed}
                onChange={(e) => handleInputChange('seed', e.target.value)}
                disabled={disabled}
                className="h-9"
                placeholder="42"
              />
            </div>

            {/* Language Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label htmlFor="language" className="text-sm">
                  Language Code
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">ISO language code (e.g., en, hi, es, fr)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="language"
                type="text"
                maxLength={5}
                value={values.language ?? DEFAULT_VOICE_PRESET.language}
                onChange={(e) => onChange({ language: e.target.value })}
                disabled={disabled}
                className="h-9"
                placeholder="en"
              />
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
