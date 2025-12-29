import { z } from 'zod';

// Video Status
export type VideoStatus = 'draft' | 'queued' | 'processing' | 'ready' | 'published' | 'error';

// Generation Stages
export type GenerationStage =
  | 'extracting_content'
  | 'generating_script'
  | 'planning_scenes'
  | 'generating_voiceover'
  | 'generating_slides'
  | 'assembling_video'
  | 'finalizing';

// Audio Settings
export const AudioSettingsSchema = z.object({
  tempo: z.number().min(0.5).max(2).default(1),
  emotion: z.enum(['neutral', 'excited', 'calm', 'serious', 'playful']).default('neutral'),
  theme: z.enum(['none', 'upbeat', 'dramatic', 'corporate', 'inspirational']).default('none'),
  volume: z.number().min(0).max(100).default(80),
  pitch: z.number().min(-12).max(12).default(0).optional(),
  musicVolume: z.number().min(0).max(100).default(30).optional(),
  voiceClarity: z.number().min(0).max(100).default(80).optional(),
  voiceMode: z.enum(['normal', 'dramatic']).default('normal').optional(),
});

export type AudioSettings = z.infer<typeof AudioSettingsSchema>;

// Voice Profile
export const VoiceProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  preview: z.string().optional(),
  audioUrl: z.string().optional(),
  createdAt: z.number(),
  userId: z.string(),
});

export type VoiceProfile = z.infer<typeof VoiceProfileSchema>;

// Video Script Scene
export const VideoSceneSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  duration: z.number(),
  narration: z.string(),
  visualDescription: z.string(),
  visualStyle: z.string(),
  imageUrl: z.string().optional(),
});

export type VideoScene = z.infer<typeof VideoSceneSchema>;

// Video Script
export const VideoScriptSchema = z.object({
  title: z.string(),
  hook: z.string(),
  scenes: z.array(VideoSceneSchema),
  totalDuration: z.number(),
  visualStyle: z.string(),
  pacing: z.string(),
});

export type VideoScript = z.infer<typeof VideoScriptSchema>;

// Caption
export const CaptionSchema = z.object({
  id: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  text: z.string(),
  language: z.string(),
});

export type Caption = z.infer<typeof CaptionSchema>;

// Caption Track
export const CaptionTrackSchema = z.object({
  id: z.string(),
  language: z.string(),
  languageName: z.string(),
  captions: z.array(CaptionSchema),
  isDefault: z.boolean().default(false),
});

export type CaptionTrack = z.infer<typeof CaptionTrackSchema>;

// Video
export const VideoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string(),
  scriptContent: z.string(),
  language: z.string().default('en'),
  status: z.enum(['draft', 'queued', 'processing', 'ready', 'published', 'error']),
  thumbnailUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  duration: z.number().optional(),
  voiceProfileId: z.string().optional(),
  audioSettings: AudioSettingsSchema,
  createdAt: z.number(),
  updatedAt: z.number(),
  publishedTo: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().optional(),
        publishedAt: z.number(),
      }),
    )
    .optional(),
  script: VideoScriptSchema.optional(),
  captionTracks: z.array(CaptionTrackSchema).optional(),
  currentStage: z
    .enum([
      'extracting_content',
      'generating_script',
      'planning_scenes',
      'generating_voiceover',
      'generating_slides',
      'assembling_video',
      'finalizing',
    ])
    .optional(),
  progress: z.number().min(0).max(100).optional(),
  error: z.string().optional(),
  profile: z.string().default('default'),
  // Phase 1 AI Integration - Quality Tier Settings
  qualityTier: z.enum(['basic', 'enhanced', 'premium']).optional().default('basic'),
  visualStyle: z.string().optional(),
  maxImages: z.number().optional().default(0),
  useImageCache: z.boolean().optional().default(false),
  // Cinematic Video Generation Settings
  isCinematic: z.boolean().optional().default(false),
  cinematicSubtitleStyle: z.enum(['karaoke', 'bounce', 'scale', 'emphasis', 'slide', 'fade', 'glow']).optional().default('karaoke'),
  cinematicWhisperModel: z.enum(['tiny', 'base', 'small', 'medium', 'large']).optional().default('base'),
  cinematicTargetSegments: z.number().optional().default(5),
  cinematicEnableImages: z.boolean().optional().default(true),
});

export type Video = z.infer<typeof VideoSchema>;

// API Request/Response Types
export const VideoCreateRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  scriptContent: z.string().min(1),
  language: z.string().default('en'),
  voiceProfileId: z.string().optional(),
  voicePresetId: z.string().optional(), // ChatterBox TTS preset
  audioSettings: AudioSettingsSchema,
  profile: z.string().default('default'),
  // Phase 1 AI Integration - Quality Tier Settings
  qualityTier: z.enum(['basic', 'enhanced', 'premium']).optional().default('basic'),
  visualStyle: z.string().optional(),
  maxImages: z.number().optional().default(0),
  useImageCache: z.boolean().optional().default(false),
  // Cinematic Video Generation Settings
  isCinematic: z.boolean().optional().default(false),
  cinematicSubtitleStyle: z.enum(['karaoke', 'bounce', 'scale', 'emphasis', 'slide', 'fade', 'glow']).optional().default('karaoke'),
  cinematicWhisperModel: z.enum(['tiny', 'base', 'small', 'medium', 'large']).optional().default('base'),
  cinematicTargetSegments: z.number().optional().default(5),
  cinematicEnableImages: z.boolean().optional().default(true),
});

export type VideoCreateRequest = z.infer<typeof VideoCreateRequestSchema>;

export const VideoUpdateRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'queued', 'processing', 'ready', 'published', 'error']).optional(),
});

export type VideoUpdateRequest = z.infer<typeof VideoUpdateRequestSchema>;

// Progress Event
export interface ProgressEvent {
  videoId: string;
  stage: GenerationStage;
  progress: number;
  message: string;
  timestamp: number;
}

// API Error
export interface APIError {
  error: string;
  message: string;
  details?: Record<string, unknown>;
}
