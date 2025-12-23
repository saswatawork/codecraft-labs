'use client';

import { useVideoProgress } from '@/hooks/use-api';
import type { GenerationStage } from '@/lib/types';
import { Card, CardContent } from '@ccl/ui';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { useMemo } from 'react';

interface VideoProgressTrackerProps {
  videoId: string;
  compact?: boolean;
}

const STAGE_INFO: Record<GenerationStage, { label: string; icon: string }> = {
  extracting_content: { label: 'Preparing', icon: '📝' },
  generating_script: { label: 'Writing Script', icon: '✍️' },
  planning_scenes: { label: 'Planning Scenes', icon: '🎬' },
  generating_voiceover: { label: 'Generating Voice', icon: '🎙️' },
  generating_slides: { label: 'Creating Slides', icon: '🎨' },
  assembling_video: { label: 'Assembling Video', icon: '🎥' },
  finalizing: { label: 'Finalizing', icon: '✨' },
};

const STAGE_ORDER: GenerationStage[] = [
  'extracting_content',
  'generating_script',
  'planning_scenes',
  'generating_voiceover',
  'generating_slides',
  'assembling_video',
  'finalizing',
];

export function VideoProgressTracker({ videoId, compact = false }: VideoProgressTrackerProps) {
  const { progress, error } = useVideoProgress(videoId);

  const currentStageIndex = useMemo(() => {
    if (!progress?.stage) return 0;
    return STAGE_ORDER.indexOf(progress.stage as GenerationStage);
  }, [progress?.stage]);

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3 text-destructive">
            <Circle className="h-5 w-5" />
            <div className="flex-1">
              <p className="font-medium">Generation Failed</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>

          {/* Show which stage failed */}
          {progress?.stage && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Failed at:</p>
              <div className="flex items-center gap-2 p-2 rounded bg-destructive/10 border border-destructive/20">
                <span className="text-lg">
                  {STAGE_INFO[progress.stage as GenerationStage]?.icon || '❌'}
                </span>
                <span className="text-sm font-medium">
                  {STAGE_INFO[progress.stage as GenerationStage]?.label || progress.stage}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {progress.progress}% complete
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!progress) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <div>
              <p className="font-medium">Initializing...</p>
              <p className="text-sm text-muted-foreground">Preparing video generation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress.progress}%` }}
          />
        </div>

        {/* Current Stage */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            {progress.stage && STAGE_INFO[progress.stage as GenerationStage] && (
              <>
                <span>{STAGE_INFO[progress.stage as GenerationStage].icon}</span>
                <span>
                  {progress.message || STAGE_INFO[progress.stage as GenerationStage].label}
                </span>
              </>
            )}
          </span>
          <span className="font-semibold text-primary">{progress.progress}%</span>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Generating Video</h3>
            <span className="text-2xl font-bold text-primary">{progress.progress}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress.message}</p>
        </div>

        {/* Stage Progress */}
        <div className="space-y-2">
          {STAGE_ORDER.map((stage, index) => {
            const stageInfo = STAGE_INFO[stage];
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isPending = index > currentStageIndex;

            // Calculate stage-specific progress (0-100 for current stage)
            let stageProgress = 0;
            if (isCompleted) stageProgress = 100;
            else if (isCurrent && progress.progress) {
              // Map overall progress to stage progress
              const stageStart = (index / STAGE_ORDER.length) * 100;
              const stageEnd = ((index + 1) / STAGE_ORDER.length) * 100;
              const stageRange = stageEnd - stageStart;
              stageProgress = Math.min(
                100,
                Math.max(0, ((progress.progress - stageStart) / stageRange) * 100),
              );
            }

            return (
              <div
                key={stage}
                className={`p-3 rounded-lg transition-all ${
                  isCurrent ? 'bg-primary/5 border border-primary/20' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {/* Icon */}
                  <div className="shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : isCurrent ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/30" />
                    )}
                  </div>

                  {/* Label and Progress */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{stageInfo.icon}</span>
                        <span
                          className={`font-medium text-sm ${
                            isCompleted
                              ? 'text-green-600 dark:text-green-400'
                              : isCurrent
                                ? 'text-primary'
                                : 'text-muted-foreground/50'
                          }`}
                        >
                          {stageInfo.label}
                        </span>
                      </div>
                      {/* Status Badge */}
                      {isCompleted && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium">
                          ✓ Done
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {Math.round(stageProgress)}%
                        </span>
                      )}
                      {isPending && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                          Pending
                        </span>
                      )}
                    </div>
                    {/* Stage Progress Bar */}
                    {(isCurrent || isCompleted) && (
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ease-out rounded-full ${
                            isCompleted ? 'bg-green-600 dark:bg-green-400' : 'bg-primary'
                          }`}
                          style={{ width: `${stageProgress}%` }}
                        />
                      </div>
                    )}
                    {/* Current stage message */}
                    {isCurrent && progress.message && (
                      <p className="text-xs text-muted-foreground mt-1">{progress.message}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
