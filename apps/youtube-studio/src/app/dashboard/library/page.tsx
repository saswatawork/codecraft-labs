'use client';

import { VideoLibraryView } from '@/components/dashboard/video-library-view';
import { VideoPlayerModal } from '@/components/player/video-player-modal';
import { useDeleteVideo, useVideos } from '@/hooks/use-api';
import type { Video } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LibraryPage() {
  const router = useRouter();
  const { data, isLoading } = useVideos();
  const videos = data?.videos ?? [];
  const deleteVideo = useDeleteVideo();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleEdit = (video: Video) => {
    toast.info('Edit feature coming soon!');
    // TODO: Implement edit functionality
  };

  const handleDelete = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      await deleteVideo.mutateAsync(videoId);
      toast.success('Video deleted successfully');
    } catch (error) {
      toast.error('Failed to delete video', {
        description: error instanceof Error ? error.message : 'Please try again',
      });
    }
  };

  const handlePlay = (video: Video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handlePublish = (video: Video) => {
    toast.info('Publish feature coming soon!');
    // TODO: Implement publish functionality
  };

  const handleCaptions = (video: Video) => {
    toast.info('Captions editor coming soon!');
    // TODO: Implement captions functionality
  };

  const handleMenuClick = () => {
    // Mobile menu toggle - implement based on your layout needs
    console.log('Menu clicked');
  };

  const handleCreateVideo = () => {
    router.push('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading videos...</p>
      </div>
    );
  }

  return (
    <>
      <VideoLibraryView
        videos={videos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPlay={handlePlay}
        onPublish={handlePublish}
        onCaptions={handleCaptions}
        onMenuClick={handleMenuClick}
        onCreateVideo={handleCreateVideo}
      />
      <VideoPlayerModal
        open={isPlayerOpen}
        onOpenChange={(open) => {
          setIsPlayerOpen(open);
          if (!open) setSelectedVideo(null);
        }}
        video={selectedVideo}
      />
    </>
  );
}
