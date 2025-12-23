// Voice Preset Types for ChatterBox TTS Customization

export type VoicePreset = {
  id: string;
  name: string;
  description: string;
  userId?: string;
  isPublic: boolean;
  isBuiltIn: boolean;

  // ChatterBox TTS Parameters
  exaggeration: number; // 0.0-1.0: Emotional intensity
  cfgWeight: number; // 0.0-1.0: Voice matching strength
  temperature: number; // 0.0-1.0: Variety vs consistency
  repetitionPenalty: number; // 1.0-3.0: Prosody variation
  speed: number; // 0.5-2.0: Speech rate multiplier
  seed: number; // Random seed for deterministic generation
  language: string; // ISO language code
  targetWpm: number; // Target words per minute (0 = auto)

  usageCount?: number;
  createdAt: number;
  updatedAt: number;
};

export type VoicePresetCreateRequest = {
  name: string;
  description?: string;
  isPublic?: boolean;
  exaggeration: number;
  cfgWeight: number;
  temperature: number;
  repetitionPenalty: number;
  speed: number;
  seed: number;
  language: string;
  targetWpm: number;
};

export type VoicePresetUpdateRequest = Partial<
  Omit<VoicePresetCreateRequest, 'userId' | 'isBuiltIn'>
>;

export type VoicePresetListResponse = {
  userPresets: VoicePreset[];
  builtInPresets: VoicePreset[];
  publicPresets: VoicePreset[];
};

export type VoicePresetPreviewRequest = {
  presetId?: string;
  customParams?: {
    exaggeration: number;
    cfgWeight: number;
    temperature: number;
    repetitionPenalty: number;
    speed: number;
    seed: number;
    language: string;
    targetWpm: number;
  };
  sampleText?: string;
};

export type VoicePresetPreviewResponse = {
  audioUrl: string;
  expiresAt: number;
};

// Parameter metadata for UI rendering
export type VoiceParameterMeta = {
  key: keyof Pick<
    VoicePreset,
    | 'exaggeration'
    | 'cfgWeight'
    | 'temperature'
    | 'repetitionPenalty'
    | 'speed'
    | 'seed'
    | 'targetWpm'
  >;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
};

export const VOICE_PARAMETERS: VoiceParameterMeta[] = [
  {
    key: 'exaggeration',
    label: 'Exaggeration',
    description: 'Emotional intensity and expressiveness',
    min: 0.0,
    max: 1.0,
    step: 0.05,
    defaultValue: 0.5,
  },
  {
    key: 'cfgWeight',
    label: 'CFG Weight',
    description: 'Voice matching strength (higher = closer to reference)',
    min: 0.0,
    max: 1.0,
    step: 0.05,
    defaultValue: 0.6,
  },
  {
    key: 'temperature',
    label: 'Temperature',
    description: 'Variety vs consistency (lower = more consistent)',
    min: 0.0,
    max: 1.0,
    step: 0.05,
    defaultValue: 0.5,
  },
  {
    key: 'repetitionPenalty',
    label: 'Repetition Penalty',
    description: 'Prosody variation (higher = more variation)',
    min: 1.0,
    max: 3.0,
    step: 0.1,
    defaultValue: 1.4,
  },
  {
    key: 'speed',
    label: 'Speed',
    description: 'Speech rate multiplier',
    min: 0.5,
    max: 2.0,
    step: 0.05,
    defaultValue: 1.0,
    unit: 'x',
  },
  {
    key: 'targetWpm',
    label: 'Target WPM',
    description: 'Words per minute (0 = automatic)',
    min: 0,
    max: 200,
    step: 5,
    defaultValue: 150,
    unit: 'wpm',
  },
];

// Default preset for new creations
export const DEFAULT_VOICE_PRESET: Omit<VoicePreset, 'id' | 'userId' | 'createdAt' | 'updatedAt'> =
  {
    name: 'Custom Preset',
    description: '',
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
  };
