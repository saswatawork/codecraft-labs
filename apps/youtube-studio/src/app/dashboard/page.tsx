'use client';

import { CreateVideoView } from '@/components/dashboard/create-video-view';
import { useCreateVideo, useVoices } from '@/hooks/use-api';
import type { GenerationSettings } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();
  const { data: voices = [], isLoading: voicesLoading } = useVoices();
  const createVideo = useCreateVideo();

  const handleGenerate = async (settings: GenerationSettings) => {
    try {
      await createVideo.mutateAsync({
        title: settings.title,
        description: settings.description,
        inputType: settings.inputType,
        inputContent: settings.inputContent,
        language: settings.language,
        voiceProfileId: settings.voiceProfileId,
        audioSettings: settings.audioSettings,
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

  if (voicesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <CreateVideoView
      voices={voices}
      onGenerate={handleGenerate}
      isGenerating={createVideo.isPending}
      onMenuClick={handleMenuClick}
    />
  );
}
