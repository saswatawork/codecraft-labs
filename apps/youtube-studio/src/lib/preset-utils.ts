/**
 * Utility functions for voice preset import/export
 */

import type { VoicePreset, VoicePresetCreateRequest } from './voice-preset-types';

export interface PresetExportData {
  version: string;
  exportedAt: number;
  presets: Array<{
    name: string;
    description: string;
    exaggeration: number;
    cfgWeight: number;
    temperature: number;
    repetitionPenalty: number;
    speed: number;
    seed: number;
    language: string;
    targetWpm: number;
  }>;
}

/**
 * Export presets to JSON file
 */
export function exportPresets(presets: VoicePreset[]): void {
  const exportData: PresetExportData = {
    version: '1.0',
    exportedAt: Date.now(),
    presets: presets.map((preset) => ({
      name: preset.name,
      description: preset.description,
      exaggeration: preset.exaggeration,
      cfgWeight: preset.cfgWeight,
      temperature: preset.temperature,
      repetitionPenalty: preset.repetitionPenalty,
      speed: preset.speed,
      seed: preset.seed,
      language: preset.language,
      targetWpm: preset.targetWpm,
    })),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `voice-presets-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export single preset to JSON file
 */
export function exportPreset(preset: VoicePreset): void {
  exportPresets([preset]);
}

/**
 * Parse imported preset file
 */
export async function parsePresetFile(file: File): Promise<PresetExportData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        // Validate structure
        if (!data.version || !Array.isArray(data.presets)) {
          throw new Error('Invalid preset file format');
        }

        // Validate each preset has required fields
        for (const preset of data.presets) {
          if (!preset.name || typeof preset.exaggeration !== 'number') {
            throw new Error('Invalid preset data');
          }
        }

        resolve(data);
      } catch (error) {
        reject(new Error(`Failed to parse preset file: ${(error as Error).message}`));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Convert exported preset to create request
 */
export function exportedPresetToCreateRequest(
  preset: PresetExportData['presets'][0],
  isPublic = false,
): VoicePresetCreateRequest {
  return {
    name: preset.name,
    description: preset.description || '',
    isPublic,
    exaggeration: preset.exaggeration,
    cfgWeight: preset.cfgWeight,
    temperature: preset.temperature,
    repetitionPenalty: preset.repetitionPenalty,
    speed: preset.speed,
    seed: preset.seed,
    language: preset.language,
    targetWpm: preset.targetWpm,
  };
}

/**
 * Duplicate a preset with a new name
 */
export function duplicatePreset(preset: VoicePreset, newName?: string): VoicePresetCreateRequest {
  return {
    name: newName || `${preset.name} (Copy)`,
    description: preset.description,
    isPublic: false, // Duplicates are always private by default
    exaggeration: preset.exaggeration,
    cfgWeight: preset.cfgWeight,
    temperature: preset.temperature,
    repetitionPenalty: preset.repetitionPenalty,
    speed: preset.speed,
    seed: preset.seed,
    language: preset.language,
    targetWpm: preset.targetWpm,
  };
}

/**
 * Format usage count for display
 */
export function formatUsageCount(count?: number): string {
  if (!count) return '0 uses';
  if (count === 1) return '1 use';
  if (count < 1000) return `${count} uses`;
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K uses`;
  return `${(count / 1000000).toFixed(1)}M uses`;
}

/**
 * Calculate similarity between two presets (0-1 scale)
 */
export function calculatePresetSimilarity(a: VoicePreset, b: VoicePreset): number {
  const params = [
    'exaggeration',
    'cfgWeight',
    'temperature',
    'repetitionPenalty',
    'speed',
  ] as const;

  const weights = {
    exaggeration: 0.25,
    cfgWeight: 0.25,
    temperature: 0.2,
    repetitionPenalty: 0.15,
    speed: 0.15,
  };

  let similarity = 0;

  for (const param of params) {
    const diff = Math.abs(a[param] - b[param]);
    const maxDiff = param === 'repetitionPenalty' ? 2 : param === 'speed' ? 1.5 : 1;
    const paramSimilarity = 1 - Math.min(diff / maxDiff, 1);
    similarity += paramSimilarity * weights[param];
  }

  return similarity;
}
