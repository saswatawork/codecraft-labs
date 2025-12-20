'use client';

import { LANGUAGES } from '@/lib/constants';
import type { Video } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@ccl/ui';
import { Button } from '@ccl/ui';
import { Input } from '@ccl/ui';
import { Badge } from '@ccl/ui';
import {
  Captions,
  FileText,
  Menu,
  Pencil,
  Play,
  Search,
  Sparkles,
  Trash2,
  Upload,
  VideoIcon,
} from 'lucide-react';
import { useState } from 'react';

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

  const filteredVideos = videos?.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: Video['status']) => {
    switch (status) {
      case 'ready':
        return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'processing':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      case 'published':
        return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
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

  if (videos.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <VideoIcon className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">No videos yet</h3>
          <p className="text-muted-foreground">Create your first AI-powered video to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Videos</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {videos.length} total videos
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(filteredVideos) &&
          filteredVideos.map((video) => (
            <Card
              key={video.id}
              className={cn(
                'group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1',
                video.status === 'processing' && 'animate-pulse',
              )}
            >
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {video.status === 'processing' ? (
                      <Sparkles className="h-12 w-12 text-primary animate-spin" />
                    ) : (
                      <VideoIcon className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                )}

                {video.status === 'ready' && (
                  <button
                    type="button"
                    onClick={() => onPlay(video)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                      <Play className="h-7 w-7 text-primary-foreground fill-primary-foreground ml-1" />
                    </div>
                  </button>
                )}

                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className={cn('border', getStatusColor(video.status))}>
                    {getStatusLabel(video.status)}
                  </Badge>
                </div>

                {video.duration && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-medium">
                    {formatDuration(video.duration)}
                  </div>
                )}
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {getLanguageName(video.language)}
                  </Badge>
                  {video.script && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <FileText className="h-3 w-3" />
                      {video.script.scenes.length} scenes
                    </Badge>
                  )}
                  {video.captionTracks && video.captionTracks.length > 0 && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <Captions className="h-3 w-3" />
                      {video.captionTracks.length} lang
                    </Badge>
                  )}
                  {video.publishedTo && video.publishedTo.length > 0 && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <Upload className="h-3 w-3" />
                      Published
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(video)}
                    disabled={video.status === 'processing'}
                    className="flex-1 gap-1 text-xs md:text-sm px-2 md:px-4"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCaptions(video)}
                    disabled={video.status === 'processing' || !video.script}
                    className="flex-1 gap-1 text-xs md:text-sm px-2 md:px-4"
                    title={!video.script ? 'Script required for captions' : 'Edit captions'}
                  >
                    <Captions className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Captions</span>
                  </Button>
                  {video.status === 'ready' && !video.publishedTo?.length && (
                    <Button
                      size="sm"
                      onClick={() => onPublish(video)}
                      className="flex-1 gap-1 text-xs md:text-sm px-2 md:px-4"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Publish</span>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(video.id)}
                    disabled={video.status === 'processing'}
                    className="px-2"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {filteredVideos.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No videos found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
