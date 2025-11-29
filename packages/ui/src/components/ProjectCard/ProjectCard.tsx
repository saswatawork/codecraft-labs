import * as React from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '..';
import { cn } from '../../utils';

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  description?: React.ReactNode;
  gradient?: string; // tailwind gradient classes for media header
  icon?: React.ReactNode;
  label?: string; // e.g., Featured, Popular
  meta?: Array<{ icon?: React.ReactNode; text: React.ReactNode }>;
  tech?: string[];
  primaryAction?: { label: string; href: string; icon?: React.ReactNode };
  secondaryAction?: { label?: string; href: string; icon?: React.ReactNode };
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      heading,
      description,
      gradient,
      icon,
      label,
      meta,
      tech,
      primaryAction,
      secondaryAction,
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          'group overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 bg-white rounded-2xl',
          className,
        )}
        {...props}
      >
        {(gradient || icon || label) && (
          <div className="relative overflow-hidden">
            <div
              className={cn(
                'h-56 md:h-64 flex items-center justify-center',
                gradient || 'bg-gray-100',
              )}
            >
              {icon}
            </div>
            {label && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/95 text-gray-900 border-white/40 backdrop-blur-sm font-semibold shadow-lg text-xs px-3 py-1.5">
                  {label}
                </Badge>
              </div>
            )}
          </div>
        )}
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
            {heading}
          </CardTitle>
          {meta && meta.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
              {meta.map((m) => (
                <span key={String(m.text)} className="flex items-center gap-1.5">
                  {m.icon}
                  {m.text}
                </span>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="px-8 pb-8 pt-0 space-y-5">
          {description && <p className="text-gray-600 leading-loose text-base">{description}</p>}
          {tech && tech.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {tech.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  size="sm"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-medium text-xs px-3 py-1.5"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="flex gap-3 pt-3">
              {primaryAction && (
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 font-medium px-5 py-2.5"
                  asChild
                >
                  <a
                    href={primaryAction.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-2"
                  >
                    {primaryAction.label}
                    {primaryAction.icon && primaryAction.icon}
                  </a>
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="outline"
                  size={secondaryAction.label ? 'sm' : 'icon'}
                  className="border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  asChild
                >
                  <a
                    href={secondaryAction.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={secondaryAction.label || 'View source'}
                  >
                    {secondaryAction.icon && !secondaryAction.label && secondaryAction.icon}
                    {secondaryAction.label && (
                      <span className="flex items-center gap-2">
                        {secondaryAction.icon}
                        {secondaryAction.label}
                      </span>
                    )}
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
