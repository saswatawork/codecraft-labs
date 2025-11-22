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
        'p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
        'hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200',
        className,
      )}
    >
      <Stack spacing="lg">
        <Stack spacing="md" align="start">
          <IconBox tone={tone} size="lg">
            {icon}
          </IconBox>
          <Heading level={3} size="2xl" weight="bold">
            {title}
          </Heading>
        </Stack>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="soft" tone={tone} className="justify-center text-sm py-2">
              {skill}
            </Badge>
          ))}
        </div>
      </Stack>
    </div>
  );
};

SkillCard.displayName = 'SkillCard';
