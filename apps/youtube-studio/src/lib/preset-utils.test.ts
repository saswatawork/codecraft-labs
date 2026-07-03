import { describe, expect, it } from 'vitest';
import {
  type PresetExportData,
  calculatePresetSimilarity,
  duplicatePreset,
  exportedPresetToCreateRequest,
  formatUsageCount,
  parsePresetFile,
} from './preset-utils';
import type { VoicePreset } from './voice-preset-types';

function makePreset(overrides: Partial<VoicePreset> = {}): VoicePreset {
  return {
    id: 'preset-1',
    name: 'My Preset',
    description: 'A test preset',
    isPublic: false,
    isBuiltIn: false,
    exaggeration: 0.5,
    cfgWeight: 0.6,
    temperature: 0.5,
    repetitionPenalty: 1.4,
    speed: 1.0,
    seed: 42,
    language: 'en',
    targetWpm: 150,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...overrides,
  };
}

describe('formatUsageCount', () => {
  it('formats zero and undefined as "0 uses"', () => {
    expect(formatUsageCount(undefined)).toBe('0 uses');
    expect(formatUsageCount(0)).toBe('0 uses');
  });

  it('uses singular "use" for exactly 1', () => {
    expect(formatUsageCount(1)).toBe('1 use');
  });

  it('pluralizes counts below 1000', () => {
    expect(formatUsageCount(42)).toBe('42 uses');
  });

  it('formats thousands with a K suffix', () => {
    expect(formatUsageCount(1500)).toBe('1.5K uses');
  });

  it('formats millions with an M suffix', () => {
    expect(formatUsageCount(2_500_000)).toBe('2.5M uses');
  });
});

describe('calculatePresetSimilarity', () => {
  it('returns 1 for identical presets', () => {
    const preset = makePreset();
    expect(calculatePresetSimilarity(preset, preset)).toBeCloseTo(1);
  });

  it('returns a lower score the further parameters diverge', () => {
    const a = makePreset();
    const bClose = makePreset({ exaggeration: 0.55 });
    const bFar = makePreset({ exaggeration: 1.0, cfgWeight: 0, temperature: 0, speed: 2.0 });

    const closeSimilarity = calculatePresetSimilarity(a, bClose);
    const farSimilarity = calculatePresetSimilarity(a, bFar);

    expect(closeSimilarity).toBeGreaterThan(farSimilarity);
    expect(closeSimilarity).toBeLessThanOrEqual(1);
    expect(farSimilarity).toBeGreaterThanOrEqual(0);
  });
});

describe('duplicatePreset', () => {
  it('appends "(Copy)" to the name by default', () => {
    const preset = makePreset({ name: 'Narrator' });
    expect(duplicatePreset(preset).name).toBe('Narrator (Copy)');
  });

  it('uses the provided name when given', () => {
    const preset = makePreset({ name: 'Narrator' });
    expect(duplicatePreset(preset, 'Narrator 2').name).toBe('Narrator 2');
  });

  it('always marks duplicates as private regardless of the source preset', () => {
    const preset = makePreset({ isPublic: true });
    expect(duplicatePreset(preset).isPublic).toBe(false);
  });

  it('carries over the TTS parameters unchanged', () => {
    const preset = makePreset({ exaggeration: 0.7, speed: 1.2 });
    const result = duplicatePreset(preset);
    expect(result.exaggeration).toBe(0.7);
    expect(result.speed).toBe(1.2);
  });
});

describe('exportedPresetToCreateRequest', () => {
  const exported: PresetExportData['presets'][0] = {
    name: 'Imported',
    description: '',
    exaggeration: 0.4,
    cfgWeight: 0.5,
    temperature: 0.6,
    repetitionPenalty: 1.2,
    speed: 0.9,
    seed: 7,
    language: 'en',
    targetWpm: 130,
  };

  it('defaults isPublic to false', () => {
    expect(exportedPresetToCreateRequest(exported).isPublic).toBe(false);
  });

  it('respects an explicit isPublic value', () => {
    expect(exportedPresetToCreateRequest(exported, true).isPublic).toBe(true);
  });

  it('falls back to an empty description when none is provided', () => {
    expect(exportedPresetToCreateRequest({ ...exported, description: '' }).description).toBe('');
  });
});

describe('parsePresetFile', () => {
  function makeFile(data: unknown) {
    return new File([JSON.stringify(data)], 'presets.json', { type: 'application/json' });
  }

  it('parses a valid export file', async () => {
    const exportData: PresetExportData = {
      version: '1.0',
      exportedAt: Date.now(),
      presets: [
        {
          name: 'Narrator',
          description: '',
          exaggeration: 0.5,
          cfgWeight: 0.6,
          temperature: 0.5,
          repetitionPenalty: 1.4,
          speed: 1.0,
          seed: 42,
          language: 'en',
          targetWpm: 150,
        },
      ],
    };

    const result = await parsePresetFile(makeFile(exportData));
    expect(result.presets).toHaveLength(1);
    expect(result.presets[0]?.name).toBe('Narrator');
  });

  it('rejects a file missing the version field', async () => {
    await expect(parsePresetFile(makeFile({ presets: [] }))).rejects.toThrow(
      'Invalid preset file format',
    );
  });

  it('rejects a file where presets is not an array', async () => {
    await expect(
      parsePresetFile(makeFile({ version: '1.0', presets: 'not-an-array' })),
    ).rejects.toThrow('Invalid preset file format');
  });

  it('rejects a preset missing a numeric exaggeration value', async () => {
    await expect(
      parsePresetFile(
        makeFile({ version: '1.0', presets: [{ name: 'Bad', exaggeration: 'high' }] }),
      ),
    ).rejects.toThrow('Invalid preset data');
  });

  it('rejects invalid JSON', async () => {
    const badFile = new File(['not json'], 'presets.json', { type: 'application/json' });
    await expect(parsePresetFile(badFile)).rejects.toThrow('Failed to parse preset file');
  });
});
