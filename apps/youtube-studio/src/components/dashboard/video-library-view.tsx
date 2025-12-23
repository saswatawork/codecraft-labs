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
  ChevronDown,
  Pencil,
  Search,
  Trash2,
  Upload,
  VideoIcon,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

type ViewMode = 'grid' | 'list';
type SortMode = 'recent' | 'title' | 'status';
type StatusFilter = 'all' | 'ready' | 'processing' | 'draft' | 'published' | 'error';

interface VideoLibraryViewProps {
  videos: Video[];
  onEdit: (video: Video) => void;
  onDelete: (videoId: string) => void;
  onPlay: (video: Video) => void;
  onPublish: (video: Video) => void;
  onCaptions: (video: Video) => void;
  onMenuClick: () => void;
  onCreateVideo: () => void;
}

export function VideoLibraryView({
  videos,
  onEdit,
  onDelete,
  onPlay,
  onPublish,
  onCaptions,
  onMenuClick,
  onCreateVideo,
}: VideoLibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('recent');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);
  const filterMenuRef = useRef<HTMLDivElement | null>(null);
  // Close menus on Escape or outside click (YouTube-like behavior)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSortMenuOpen(false);
        setFilterMenuOpen(false);
      }
    };
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (sortMenuOpen && sortMenuRef.current && !sortMenuRef.current.contains(t)) setSortMenuOpen(false);
      if (filterMenuOpen && filterMenuRef.current && !filterMenuRef.current.contains(t)) setFilterMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [sortMenuOpen, filterMenuOpen]);

  const filteredVideos = videos
    ?.filter((video) => video.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ?.filter((video) => (statusFilter === 'all' ? true : video.status === statusFilter))
    ?.filter((video) => (languageFilter === 'all' ? true : video.language === languageFilter))
    ?.sort((a, b) => {
      switch (sortMode) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'recent':
        default:
          // Fallback: sort by updatedAt or createdAt if available
          const aTime = a.updatedAt ?? a.createdAt ?? 0;
          const bTime = b.updatedAt ?? b.createdAt ?? 0;
          return bTime - aTime;
      }
    });

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

    // Primary: Edit
    actions.push({
      label: 'Edit',
      icon: <Pencil className="h-3.5 w-3.5" />,
      onClick: () => onEdit(video),
      disabled: video.status === 'processing',
      variant: 'outline',
    });

    // Prioritize Delete so it appears in grid overlay cluster
    actions.push({
      label: 'Delete',
      icon: <Trash2 className="h-3.5 w-3.5" />,
      onClick: () => onDelete(video.id),
      disabled: video.status === 'processing',
      variant: 'destructive',
    });

    // Secondary: Captions (if script available)
    actions.push({
      label: 'Captions',
      icon: <Captions className="h-3.5 w-3.5" />,
      onClick: () => onCaptions(video),
      disabled: video.status === 'processing' || !video.script,
      variant: 'outline',
      title: !video.script ? 'Script required for captions' : 'Edit captions',
    });

    // Publish when ready and not yet published
    if (video.status === 'ready' && !video.publishedTo?.length) {
      actions.push({
        label: 'Publish',
        icon: <Upload className="h-3.5 w-3.5" />,
        onClick: () => onPublish(video),
        variant: 'default',
      });
    }

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

  // Build quick title suggestions from current videos
  const titleSuggestions = videos
    ?.filter((v) => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    ?.slice(0, 5)
    ?.map((v) => v.title);

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
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="default" 
              size="sm" 
              leftIcon={<VideoIcon className="h-4 w-4" />}
              onClick={onCreateVideo}
            >
              New Video
            </Button>
          </div>
        </div>

        {/* YouTube-style Toolbar: pill search + dropdown menus */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search pill */}
          <div className="relative flex-1">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5">
              <Search className="text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 px-0"
              />
              {searchQuery && (
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => setSearchQuery('')}
                  title="Clear"
                >
                  ×
                </Button>
              )}
            </div>
            {/* Suggestions */}
            {searchQuery && titleSuggestions && titleSuggestions.length > 0 && (
              <div className="absolute z-30 mt-2 w-full rounded-lg border border-border/60 bg-card shadow-lg">
                {titleSuggestions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-accent"
                    onClick={() => setSearchQuery(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View toggle + dropdown menus */}
          <div className="relative flex items-center gap-2">
            <ViewToggle
              options={[
                { value: 'grid', label: 'Grid', icon: <Grid3x3 className="h-4 w-4" /> },
                { value: 'list', label: 'List', icon: <List className="h-4 w-4" /> },
              ]}
              value={viewMode}
              onValueChange={(value) => setViewMode(value as ViewMode)}
            />

            {/* Sort dropdown */}
            <div className="relative" ref={sortMenuRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortMenuOpen((v) => !v)}
                title="Sort"
                rightIcon={<ChevronDown className="h-4 w-4" />}
              >
                Sort: {sortMode}
              </Button>
              {sortMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border border-border/60 bg-card shadow-lg z-30">
                  {(['recent', 'title', 'status'] as SortMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`w-full text-left px-3 py-2 hover:bg-accent ${sortMode === mode ? 'font-semibold' : ''}`}
                      onClick={() => {
                        setSortMode(mode);
                        setSortMenuOpen(false);
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter dropdown (status + language) */}
            <div className="relative" ref={filterMenuRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterMenuOpen((v) => !v)}
                title="Filters"
                rightIcon={<ChevronDown className="h-4 w-4" />}
              >
                Filters
              </Button>
              {filterMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border/60 bg-card shadow-lg z-30 p-2 space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground px-2">Status</div>
                  {(['all', 'ready', 'processing', 'draft', 'published', 'error'] as StatusFilter[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`w-full text-left px-3 py-1.5 rounded hover:bg-accent ${statusFilter === s ? 'font-semibold' : ''}`}
                      onClick={() => setStatusFilter(s)}
                    >
                      {s}
                    </button>
                  ))}
                  <div className="text-xs font-semibold text-muted-foreground px-2 pt-2">Language</div>
                  <button
                    type="button"
                    className={`w-full text-left px-3 py-1.5 rounded hover:bg-accent ${languageFilter === 'all' ? 'font-semibold' : ''}`}
                    onClick={() => setLanguageFilter('all')}
                  >
                    All
                  </button>
                  {LANGUAGES.slice(0, 8).map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      className={`w-full text-left px-3 py-1.5 rounded hover:bg-accent ${languageFilter === l.code ? 'font-semibold' : ''}`}
                      onClick={() => setLanguageFilter(l.code)}
                    >
                      {l.flag} {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
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
            <div
              key={video.id}
              role="group"
              tabIndex={0}
              className="focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-md"
              onKeyDown={(e) => {
                // Simple keyboard shortcuts
                if (e.key.toLowerCase() === 'e') onEdit(video);
                if (e.key.toLowerCase() === 'c') onCaptions(video);
                if (e.key.toLowerCase() === 'p' && video.status === 'ready') onPublish(video);
                if (e.key === 'Enter' && video.status === 'ready') onPlay(video);
              }}
            >
              <VideoCard
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
                previewUrl={video.status === 'ready' ? video.videoUrl ?? undefined : undefined}
              />
            </div>
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
