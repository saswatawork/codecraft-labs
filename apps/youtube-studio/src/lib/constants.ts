import type { AudioPreset, Language } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
];

export const EMOTIONS = [
  { value: 'neutral', label: 'Neutral', description: 'Balanced and professional tone' },
  { value: 'excited', label: 'Excited', description: 'Energetic and enthusiastic delivery' },
  { value: 'calm', label: 'Calm', description: 'Relaxed and soothing narration' },
  { value: 'serious', label: 'Serious', description: 'Authoritative and formal tone' },
  { value: 'playful', label: 'Playful', description: 'Fun and lighthearted approach' },
];

export const THEMES = [
  { value: 'none', label: 'No Music', description: 'Pure voice narration' },
  { value: 'upbeat', label: 'Upbeat', description: 'Positive and energetic background' },
  { value: 'dramatic', label: 'Dramatic', description: 'Intense and impactful atmosphere' },
  { value: 'corporate', label: 'Corporate', description: 'Professional business tone' },
  {
    value: 'inspirational',
    label: 'Inspirational',
    description: 'Motivating and uplifting mood',
  },
];

export const DEFAULT_AUDIO_SETTINGS = {
  tempo: 1.0,
  emotion: 'neutral' as const,
  theme: 'none' as const,
  volume: 80,
  pitch: 1.0,
  musicVolume: 30,
  voiceClarity: 75,
  backgroundNoise: 0,
  voiceMode: 'normal' as const,
};

export const AUDIO_PRESETS: AudioPreset[] = [
  {
    id: 'podcast',
    name: 'Podcast',
    description: 'Clear voice with minimal background',
    icon: '🎙️',
    settings: {
      tempo: 1.0,
      emotion: 'neutral',
      theme: 'none',
      volume: 85,
      pitch: 1.0,
      musicVolume: 0,
      voiceClarity: 90,
      backgroundNoise: 0,
    },
  },
  {
    id: 'tutorial',
    name: 'Tutorial',
    description: 'Slower pace with corporate background',
    icon: '📚',
    settings: {
      tempo: 0.9,
      emotion: 'calm',
      theme: 'corporate',
      volume: 80,
      pitch: 1.0,
      musicVolume: 20,
      voiceClarity: 85,
      backgroundNoise: 0,
    },
  },
  {
    id: 'promo',
    name: 'Promo',
    description: 'Energetic with upbeat music',
    icon: '🚀',
    settings: {
      tempo: 1.2,
      emotion: 'excited',
      theme: 'upbeat',
      volume: 90,
      pitch: 1.05,
      musicVolume: 45,
      voiceClarity: 80,
      backgroundNoise: 0,
    },
  },
  {
    id: 'documentary',
    name: 'Documentary',
    description: 'Serious tone with dramatic music',
    icon: '🎬',
    settings: {
      tempo: 0.95,
      emotion: 'serious',
      theme: 'dramatic',
      volume: 85,
      pitch: 0.95,
      musicVolume: 35,
      voiceClarity: 85,
      backgroundNoise: 5,
    },
  },
  {
    id: 'meditation',
    name: 'Meditation',
    description: 'Calm and soothing atmosphere',
    icon: '🧘',
    settings: {
      tempo: 0.8,
      emotion: 'calm',
      theme: 'inspirational',
      volume: 70,
      pitch: 0.98,
      musicVolume: 40,
      voiceClarity: 80,
      backgroundNoise: 10,
    },
  },
  {
    id: 'vlog',
    name: 'Vlog',
    description: 'Casual and playful style',
    icon: '📹',
    settings: {
      tempo: 1.1,
      emotion: 'playful',
      theme: 'upbeat',
      volume: 85,
      pitch: 1.02,
      musicVolume: 30,
      voiceClarity: 75,
      backgroundNoise: 0,
    },
  },
];
