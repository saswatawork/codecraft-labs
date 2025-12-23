import * as React from 'react';
import { cn } from '../../utils';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Card, CardContent } from '../Card';

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
      ...props
    },
    ref,
  ) => {
    const isListView = viewMode === 'list';

    if (isListView) {
      return (
        <Card
          ref={ref}
          className={cn(
            'group overflow-hidden transition-all hover:shadow-md',
            isProcessing && 'animate-pulse',
            className,
          )}
          {...props}
        >
          <div className="flex gap-4 p-4">
            {/* Thumbnail */}
            <div className="relative shrink-0 w-40 aspect-video bg-linear-to-br from-primary/10 to-accent/10 rounded-md overflow-hidden">
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
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 rounded text-white text-xs font-medium">
                  {duration}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
                  {description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
                  )}
                </div>
                {status && (
                  <Badge variant={status.variant} className="shrink-0">
                    {status.label}
                  </Badge>
                )}
              </div>

              {metadata && metadata.length > 0 && (
                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  {metadata.map((meta) => (
                    <span key={meta.label} className="flex items-center gap-1.5">
                      {meta.icon}
                      {meta.label}
                    </span>
                  ))}
                </div>
              )}

              {actions.length > 0 && (
                <div className="flex gap-2 pt-1">
                  {actions
                    .filter((_, idx) => idx < actions.length - 1)
                    .map((action) => (
                      <Button
                        key={action.label}
                        size="sm"
                        variant={action.variant || 'outline'}
                        onClick={action.onClick}
                        disabled={action.disabled}
                        className="gap-1.5"
                        title={action.title}
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </Button>
                    ))}
                  {/* Last action (typically delete) */}
                  {actions[actions.length - 1] &&
                    (() => {
                      const lastAction = actions[actions.length - 1];
                      return (
                        <Button
                          size="sm"
                          variant={lastAction.variant || 'outline'}
                          onClick={lastAction.onClick}
                          disabled={lastAction.disabled}
                          className="shrink-0 px-3"
                          title={lastAction.title || lastAction.label}
                        >
                          {lastAction.icon}
                        </Button>
                      );
                    })()}
                </div>
              )}
            </div>
          </div>
        </Card>
      );
    }

    // Grid view
    return (
      <Card
        ref={ref}
        className={cn(
          'group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1',
          isProcessing && 'animate-pulse',
          className,
        )}
        {...props}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-linear-to-br from-primary/10 to-accent/10 overflow-hidden">
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
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <div className="h-7 w-7 text-primary-foreground">▶</div>
              </div>
            </button>
          )}

          {status && (
            <div className="absolute top-3 right-3">
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>
          )}

          {duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-white text-xs font-medium">
              {duration}
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1.5">
            <h3 className="font-semibold line-clamp-1">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            )}
          </div>

          {metadata && metadata.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              {metadata.map((meta) => (
                <span key={meta.label} className="flex items-center gap-1.5">
                  {meta.icon}
                  {meta.label}
                </span>
              ))}
            </div>
          )}

          {actions.length > 0 && (
            <div className="flex gap-2 pt-1 flex-wrap">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  size="sm"
                  variant={action.variant || 'outline'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className="gap-1.5"
                  title={action.title}
                >
                  {action.icon}
                  <span className="hidden sm:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
);

VideoCard.displayName = 'VideoCard';
