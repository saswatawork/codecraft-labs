import * as React from 'react';
import { cn } from '../../utils';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card } from '../Card';

export interface VideoCardAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  title?: string;
}

export interface VideoCardMeta {
  icon?: React.ReactNode;
  label: string;
}

export interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: string;
  status?: {
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  };
  metadata?: VideoCardMeta[];
  actions?: VideoCardAction[];
  onPlay?: () => void;
  isProcessing?: boolean;
  viewMode?: 'grid' | 'list';
  /** Optional preview video URL for hover scrubbing */
  previewUrl?: string;
}

/**
 * VideoCard Component
 *
 * A versatile card component for displaying video content with thumbnail,
 * metadata, and actions. Supports both grid and list view modes.
 *
 * @example
 * ```tsx
 * <VideoCard
 *   title="My Video"
 *   description="Video description"
 *   thumbnailUrl="/thumb.jpg"
 *   duration="5:30"
 *   status={{ label: 'Ready', variant: 'default' }}
 *   metadata={[{ icon: <FileText />, label: '5 scenes' }]}
 *   actions={[
 *     { label: 'Edit', icon: <Pencil />, onClick: handleEdit },
 *     { label: 'Delete', icon: <Trash />, onClick: handleDelete }
 *   ]}
 *   onPlay={handlePlay}
 * />
 * ```
 */
export const VideoCard = React.forwardRef<HTMLDivElement, VideoCardProps>(
  (
    {
      className,
      title,
      description,
      thumbnailUrl,
      duration,
      status,
      metadata,
      actions = [],
      onPlay,
      isProcessing = false,
      viewMode = 'grid',
      previewUrl,
      ...props
    },
    ref,
  ) => {
    const isListView = viewMode === 'list';
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [hovering, setHovering] = React.useState(false);
    const [canSeek, setCanSeek] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    // Close menu on Escape or outside click
    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      const onDocClick = (e: MouseEvent) => {
        if (!menuRef.current) return;
        if (menuOpen && !menuRef.current.contains(e.target as Node)) {
          setMenuOpen(false);
        }
      };
      document.addEventListener('keydown', onKey);
      document.addEventListener('mousedown', onDocClick);
      return () => {
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('mousedown', onDocClick);
      };
    }, [menuOpen]);

    const renderActions = (items: VideoCardAction[]) => {
      if (items.length === 0) return null;

      return (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-2.5 py-1 shadow-sm backdrop-blur">
          {items.map((action) => {
            const intentClass =
              action.variant === 'default'
                ? 'text-primary hover:bg-primary/10 focus-visible:ring-primary/30'
                : action.variant === 'outline'
                  ? 'text-secondary hover:bg-secondary/10 focus-visible:ring-secondary/30'
                  : 'text-foreground/80 hover:bg-foreground/5 focus-visible:ring-foreground/20';

            return (
              <Button
                key={action.label}
                size="sm"
                variant="ghost"
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  'h-9 rounded-full transition-colors px-3 gap-2',
                  intentClass,
                )}
                title={action.title || action.label}
              >
                {action.icon}
                <span className="text-[11px] font-medium leading-none">{action.label}</span>
              </Button>
            );
          })}
        </div>
      );
    };

    // List view - compact horizontal layout
    if (isListView) {
      return (
        <Card
          ref={ref}
          className={cn(
            'group overflow-hidden transition-all hover:shadow-md hover:bg-accent/5',
            isProcessing && 'animate-pulse',
            className,
          )}
          {...props}
        >
          <div className="flex gap-3 p-3">
            {/* Thumbnail - smaller in list view */}
            <div className="relative shrink-0 w-36 aspect-video bg-linear-to-br from-primary/10 to-accent/10 rounded overflow-hidden">
              {thumbnailUrl ? (
                <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {isProcessing ? (
                    <div className="h-8 w-8 text-primary animate-spin">⚡</div>
                  ) : (
                    <div className="h-8 w-8 text-muted-foreground">▶</div>
                  )}
                </div>
              )}

              {duration && (
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/90 rounded text-white text-xs font-medium">
                  {duration}
                </div>
              )}
            </div>

            {/* Content - compact */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-5 line-clamp-2 flex-1">{title}</h3>
                  {status && (
                    <Badge variant={status.variant} className="shrink-0 text-xs px-2 py-0.5">
                      {status.label}
                    </Badge>
                  )}
                </div>

                {/* Metadata - compact single line */}
                {metadata && metadata.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {metadata.map((meta, idx) => (
                      <React.Fragment key={meta.label}>
                        <span className="flex items-center gap-1">
                          {meta.icon && <span className="shrink-0 opacity-70">{meta.icon}</span>}
                          <span>{meta.label}</span>
                        </span>
                        {idx < metadata.length - 1 && <span className="text-muted-foreground/50">•</span>}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions - minimal pills */}
              {actions.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mt-1">{renderActions(actions)}</div>
              )}
            </div>
          </div>
        </Card>
      );
    }

    // Grid view - YouTube-inspired compact design
    return (
      <Card
        ref={ref}
        className={cn(
          'group overflow-visible transition-all hover:shadow-lg border border-transparent',
          isProcessing && 'animate-pulse',
          className,
        )}
        {...props}
      >
        {/* Thumbnail - Main focus */}
        <div
          className="relative aspect-video bg-linear-to-br from-primary/10 to-accent/10 overflow-hidden rounded-t-lg"
          onMouseEnter={() => {
            setHovering(true);
            if (videoRef.current && canSeek) {
              try { videoRef.current.play(); } catch {}
            }
          }}
          onMouseLeave={() => {
            setHovering(false);
            if (videoRef.current) {
              try { videoRef.current.pause(); } catch {}
            }
          }}
          onMouseMove={(e) => {
            if (!hovering || !videoRef.current || !canSeek) return;
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
            const percent = rect.width ? x / rect.width : 0;
            const duration = videoRef.current.duration || 0;
            if (duration > 0) {
              try {
                videoRef.current.currentTime = percent * duration;
              } catch {}
            }
          }}
        >
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {isProcessing ? (
                <div className="h-12 w-12 text-primary animate-spin">⚡</div>
              ) : (
                <div className="h-12 w-12 text-muted-foreground">▶</div>
              )}
            </div>
          )}

          {onPlay && !isProcessing && (
            <button
              type="button"
              onClick={onPlay}
              className="absolute inset-0 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center scale-95 group-hover:scale-100 transition-transform">
                <div className="h-7 w-7 text-gray-900">▶</div>
              </div>
            </button>
          )}

          {/* Hover scrubbing preview video */}
          {previewUrl && !isProcessing && (
            <video
              ref={videoRef}
              src={previewUrl}
              className={cn(
                'absolute inset-0 w-full h-full object-cover transition-opacity pointer-events-none z-0',
                hovering ? 'opacity-100' : 'opacity-0',
              )}
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={() => setCanSeek(true)}
              onPlay={(ev) => ev.currentTarget.pause()}
            />
          )}

          {/* Duration badge - bottom right */}
          {duration && (
            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/90 rounded text-white text-xs font-medium">
              {duration}
            </div>
          )}

          {/* 3-dots menu - top right, highest z-index */}
          {actions.length > 0 && (
            <div className="absolute top-2 right-2 z-30">
              <div
                className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(true);
                }}
              >
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white border-0 shadow-lg"
                  title="More actions"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((v) => !v);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </Button>

                {/* Menu panel */}
                {menuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-background border border-border shadow-xl z-50 overflow-hidden"
                    role="menu"
                    onClick={(e) => e.stopPropagation()}
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <div className="py-1">
                      {actions.map((action, idx) => (
                        <button
                          key={action.label}
                          type="button"
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors text-left',
                            action.disabled && 'opacity-50 cursor-not-allowed',
                            idx !== actions.length - 1 && 'border-b border-border/50',
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!action.disabled) action.onClick();
                            setMenuOpen(false);
                          }}
                          disabled={action.disabled}
                          title={action.title || action.label}
                        >
                          <span className="shrink-0 h-4 w-4 flex items-center justify-center">
                            {action.icon}
                          </span>
                          <span className="flex-1">{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status badge - bottom left corner when present */}
          {status && (
            <div className="absolute bottom-2 left-2 z-20">
              <Badge variant={status.variant} className="text-xs px-2 py-0.5">
                {status.label}
              </Badge>
            </div>
          )}
        </div>

        {/* Compact metadata section - YouTube style */}
        <div className="p-3 space-y-1">
          {/* Title - max 2 lines */}
          <h3 className="font-medium text-sm leading-5 line-clamp-2">{title}</h3>

          {/* Metadata row - compact single line */}
          {metadata && metadata.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {metadata.map((meta, idx) => (
                <React.Fragment key={meta.label}>
                  <span className="flex items-center gap-1">
                    {meta.icon && <span className="shrink-0 opacity-70">{meta.icon}</span>}
                    <span>{meta.label}</span>
                  </span>
                  {idx < metadata.length - 1 && <span className="text-muted-foreground/50">•</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </Card>
    );
  },
);

VideoCard.displayName = 'VideoCard';
