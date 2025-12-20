'use client';

import { VoiceLibraryView } from '@/components/dashboard/voice-library-view';
import { useCreateVoice, useDeleteVoice, useVoices } from '@/hooks/use-api';
import { toast } from 'sonner';

export default function VoicesPage() {
  const { data: voices = [], isLoading } = useVoices();
  const createVoice = useCreateVoice();
  const deleteVoice = useDeleteVoice();

  const handleUpload = async (name: string, file: File) => {
    try {
      await createVoice.mutateAsync({ name, file });
      toast.success('Voice uploaded successfully', {
        description: `${name} is now available for use`,
      });
    } catch (error) {
      toast.error('Failed to upload voice', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  const handleDelete = async (voiceId: string) => {
    if (!confirm('Are you sure you want to delete this voice?')) return;

    try {
      await deleteVoice.mutateAsync(voiceId);
      toast.success('Voice deleted successfully');
    } catch (error) {
      toast.error('Failed to delete voice', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  const handleMenuClick = () => {
    // Mobile menu toggle - implement based on your layout needs
    console.log('Menu clicked');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading voices...</p>
      </div>
    );
  }

  return (
    <VoiceLibraryView
      voices={voices}
      onUpload={handleUpload}
      onDelete={handleDelete}
      onMenuClick={handleMenuClick}
    />
  );
}
