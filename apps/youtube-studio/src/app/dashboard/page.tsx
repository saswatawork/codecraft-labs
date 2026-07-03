'use client';

import { CreateVideoView } from '@/components/dashboard/create-video-view';
import { useCreateVideo, useVoices } from '@/hooks/use-api';
import type { GenerationSettings } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const { data: voicesResponse } = useVoices();
  const voices = voicesResponse?.voices || [];
  const createVideo = useCreateVideo();

  const handleGenerate = async (settings: GenerationSettings) => {
    try {
      // Map UI visual styles to pipeline styles
      const visualStyleMap: Record<string, string> = {
        photorealistic: 'professional',
        illustration: 'vibrant',
        isometric: 'professional',
        minimalist: 'minimalist',
        'hand-drawn': 'dark',
      };

      const mappedVisualStyle = settings.visualStyle
        ? visualStyleMap[settings.visualStyle] || 'professional'
        : undefined;

      // Debug: Log cinematic settings
      console.log('🎬 Cinematic Settings:', {
        isCinematic: settings.isCinematic,
        cinematicSubtitleStyle: settings.cinematicSubtitleStyle,
        cinematicWhisperModel: settings.cinematicWhisperModel,
        cinematicTargetSegments: settings.cinematicTargetSegments,
        cinematicEnableImages: settings.cinematicEnableImages,
      });

      console.log('🎨 Image Generator before mutation:', settings.imageGenerator);

      await createVideo.mutateAsync({
        title: settings.title,
        description: settings.description,
        scriptContent: settings.inputContent, // User's "What do you want to create?" input
        language: settings.language,
        voiceProfileId: settings.voiceProfileId,
        voicePresetId: settings.voicePresetId, // Pass voice preset ID to backend
        audioSettings: settings.audioSettings,
        // Phase 1 AI Integration - Quality Tier Settings
        qualityTier: settings.qualityTier,
        visualStyle: mappedVisualStyle,
        maxImages: settings.maxImages,
        useImageCache: settings.useImageCache,
        // Cinematic Video Generation Settings
        isCinematic: settings.isCinematic,
        cinematicSubtitleStyle: settings.cinematicSubtitleStyle,
        cinematicWhisperModel: settings.cinematicWhisperModel,
        cinematicTargetSegments: settings.cinematicTargetSegments,
        cinematicEnableImages: settings.cinematicEnableImages,
        // Image Generator Selection
        imageGenerator: settings.imageGenerator,
        // Visual Theme Selection
        visualTheme: settings.visualTheme,
        // Intelligent Prompt System
        useIntelligentPrompts: settings.useIntelligentPrompts,
      });

      toast.success('Video generation started!', {
        description: 'Your video is being generated. Check the library for progress.',
      });

      router.push('/dashboard/library');
    } catch (error) {
      toast.error('Failed to start video generation', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  const handleMenuClick = () => {
    // Mobile menu toggle - implement based on your layout needs
    console.log('Menu clicked');
  };

  // Show form immediately, don't wait for voices
  // Voices are optional - backend has defaults
  return (
    <CreateVideoView
      voices={voices}
      onGenerate={handleGenerate}
      isGenerating={createVideo.isPending}
      onMenuClick={handleMenuClick}
    />
  );
}
