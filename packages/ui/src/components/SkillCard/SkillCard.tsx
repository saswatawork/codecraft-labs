import type * as React from 'react';
import { cn } from '../../utils';
import { Badge } from '../Badge';
import { Heading } from '../Heading';
import { IconBox } from '../IconBox';
import { Stack } from '../Stack';

export interface SkillCardProps {
  /**
   * Skill category title
   */
  title: string;

  /**
   * Icon element for the category
   */
  icon: React.ReactNode;

  /**
   * List of skills in this category
   */
  skills: string[];

  /**
   * Color tone for icon and badges
   */
  tone?: 'blue' | 'green' | 'purple' | 'orange';

  /**
   * Custom className
   */
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  title,
  icon,
  skills,
  tone = 'blue',
  className,
}) => {
  return (
    <div
      className={cn(
        'p-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
        'hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1',
        'transition-all duration-300',
        className,
      )}
    >
      <Stack spacing="xl">
        <Stack spacing="lg" align="start">
          <IconBox tone={tone} size="xl" className="p-4">
            {icon}
          </IconBox>
          <Heading level={3} size="2xl" weight="bold">
            {title}
          </Heading>
        </Stack>

        <div className="grid grid-cols-2 gap-3 pt-4">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="soft"
              tone={tone}
              className="justify-center text-sm py-2.5 font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </Stack>
    </div>
  );
};

SkillCard.displayName = 'SkillCard';
