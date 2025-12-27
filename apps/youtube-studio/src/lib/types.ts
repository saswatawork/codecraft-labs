// Shared types for YouTube Studio application
// These align with the API client types from @ccl/yt-api-client

export type VideoStatus = 'draft' | 'processing' | 'ready' | 'published' | 'error';

export type InputType = 'url' | 'description';

export type GenerationStage =
  | 'extracting_content'
  | 'generating_script'
  | 'planning_scenes'
  | 'generating_visuals'
  | 'assembling_video'
  | 'finalizing';

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export type VoiceProfile = {
  id: string;
  name: string;
  preview?: string;
  createdAt: number;
};

export type AudioSettings = {
  tempo: number;
  emotion: 'neutral' | 'excited' | 'calm' | 'serious' | 'playful';
  theme: 'none' | 'upbeat' | 'dramatic' | 'corporate' | 'inspirational';
  volume: number;
  pitch?: number;
  musicVolume?: number;
  voiceClarity?: number;
  backgroundNoise?: number;
  voiceMode?: 'normal' | 'dramatic';
  // TTS Engine Selection
  ttsEngine?: 'chatterbox' | 'google';
  // Google Cloud TTS options (only used when ttsEngine = 'google')
  googleVoicePreset?: string;
  googleSpeakingRate?: number;
  googlePitch?: number;
  googleEnableSSML?: boolean;
};

export type AudioPreset = {
  id: string;
  name: string;
  description: string;
  icon: string;
  settings: AudioSettings;
};

export type Caption = {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  language: string;
};

export type CaptionTrack = {
  id: string;
  language: string;
  languageName: string;
  captions: Caption[];
  isDefault?: boolean;
};

export type VideoScene = {
  id: string;
  timestamp: number;
  duration: number;
  narration: string;
  visualDescription: string;
  visualStyle: string;
  imageUrl?: string;
};

export type VideoScript = {
  title: string;
  hook: string;
  scenes: VideoScene[];
  totalDuration: number;
  visualStyle: string;
  pacing: string;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  inputType: InputType;
  inputContent: string;
  language: string;
  status: VideoStatus;
  thumbnailUrl?: string;
  videoUrl?: string;
  duration?: number;
  voiceProfileId?: string;
  audioSettings: AudioSettings;
  createdAt: number;
  updatedAt: number;
  publishedTo?: Array<{
    platform: string;
    url?: string;
    publishedAt: number;
  }>;
  script?: VideoScript;
  captionTracks?: CaptionTrack[];
  currentStage?: GenerationStage;
  progress?: number;
  error?: string;
};

export type GenerationSettings = {
  inputType: InputType;
  inputContent: string;
  language: string;
  voiceProfileId?: string;
  voicePresetId?: string; // ChatterBox TTS preset
  audioSettings: AudioSettings;
  title: string;
  description: string;
};
