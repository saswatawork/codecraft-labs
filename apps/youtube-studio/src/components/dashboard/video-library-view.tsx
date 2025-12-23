'use client';

import { LANGUAGES } from '@/lib/constants';
import type { Video } from '@/lib/types';
import { Button, Input, VideoCard, ViewToggle } from '@ccl/ui';
import type { VideoCardAction, VideoCardMeta } from '@ccl/ui';
import {
  Captions,
  FileText,
  Grid3x3,
  List,
  Menu,
  Pencil,
  Search,
  Trash2,
  Upload,
  VideoIcon,
} from 'lucide-react';
import { useState } from 'react';

type ViewMode = 'grid' | 'list';

interface VideoLibraryViewProps {
  videos: Video[];
  onEdit: (video: Video) => void;
  onDelete: (videoId: string) => void;
  onPlay: (video: Video) => void;
  onPublish: (video: Video) => void;
  onCaptions: (video: Video) => void;
  onMenuClick: () => void;
}

export function VideoLibraryView({
  videos,
  onEdit,
  onDelete,
  onPlay,
  onPublish,
  onCaptions,
  onMenuClick,
}: VideoLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredVideos = videos?.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusVariant = (status: Video['status']) => {
    switch (status) {
      case 'ready':
        return 'default' as const;
      case 'processing':
        return 'secondary' as const;
      case 'draft':
        return 'outline' as const;
      case 'published':
        return 'default' as const;
      case 'error':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  const getStatusLabel = (status: Video['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLanguageName = (code: string) => {
    return LANGUAGES.find((l) => l.code === code)?.name || code;
  };

  const buildVideoMetadata = (video: Video): VideoCardMeta[] => {
    const metadata: VideoCardMeta[] = [];

    metadata.push({
      label: getLanguageName(video.language),
    });

    if (video.script) {
      metadata.push({
        icon: <FileText className="h-3 w-3" />,
        label: `${video.script.scenes.length} scenes`,
      });
    }

    if (video.captionTracks && video.captionTracks.length > 0) {
      metadata.push({
        icon: <Captions className="h-3 w-3" />,
        label: `${video.captionTracks.length} lang`,
      });
    }

    if (video.publishedTo && video.publishedTo.length > 0) {
      metadata.push({
        icon: <Upload className="h-3 w-3" />,
        label: 'Published',
      });
    }

    return metadata;
  };

  const buildVideoActions = (video: Video): VideoCardAction[] => {
    const actions: VideoCardAction[] = [];

    actions.push({
      label: 'Edit',
      icon: <Pencil className="h-3.5 w-3.5" />,
      onClick: () => onEdit(video),
      disabled: video.status === 'processing',
      variant: 'outline',
    });

    actions.push({
      label: 'Captions',
      icon: <Captions className="h-3.5 w-3.5" />,
      onClick: () => onCaptions(video),
      disabled: video.status === 'processing' || !video.script,
      variant: 'outline',
      title: !video.script ? 'Script required for captions' : 'Edit captions',
    });

    if (video.status === 'ready' && !video.publishedTo?.length) {
      actions.push({
        label: 'Publish',
        icon: <Upload className="h-3.5 w-3.5" />,
        onClick: () => onPublish(video),
        variant: 'default',
      });
    }

    actions.push({
      label: 'Delete',
      icon: <Trash2 className="h-3.5 w-3.5" />,
      onClick: () => onDelete(video.id),
      disabled: video.status === 'processing',
      variant: 'destructive',
    });

    return actions;
  };

  if (videos.length === 0) {
    return (
      <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md px-4">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
            <VideoIcon className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold">No videos yet</h3>
            <p className="text-base text-muted-foreground">
              Create your first AI-powered video to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden -ml-2">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Videos</h2>
              <p className="text-sm text-muted-foreground">
                {videos.length} {videos.length === 1 ? 'video' : 'videos'}
              </p>
            </div>
          </div>
        </div>

        {/* Search and View Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ViewToggle
            options={[
              { value: 'grid', label: 'Grid', icon: <Grid3x3 className="h-4 w-4" /> },
              { value: 'list', label: 'List', icon: <List className="h-4 w-4" /> },
            ]}
            value={viewMode}
            onValueChange={(value) => setViewMode(value as ViewMode)}
          />
        </div>
      </div>

      {/* Video Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'flex flex-col gap-3 sm:gap-4'
        }
      >
        {Array.isArray(filteredVideos) &&
          filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              duration={formatDuration(video.duration)}
              status={{
                label: getStatusLabel(video.status),
                variant: getStatusVariant(video.status),
              }}
              metadata={buildVideoMetadata(video)}
              actions={buildVideoActions(video)}
              onPlay={video.status === 'ready' ? () => onPlay(video) : undefined}
              isProcessing={video.status === 'processing'}
              viewMode={viewMode}
            />
          ))}
      </div>

      {/* Empty Search State */}
      {filteredVideos.length === 0 && searchQuery && (
        <div className="text-center py-16">
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">No videos found</h3>
              <p className="text-sm text-muted-foreground">No videos matching "{searchQuery}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
