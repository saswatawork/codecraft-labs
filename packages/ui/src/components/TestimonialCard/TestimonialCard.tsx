import type * as React from 'react';
import { cn } from '../../utils';
import { CompoundAvatar } from '../Avatar';
import { Card } from '../Card';
import { Rating } from '../Rating';
import { Stack } from '../Stack';
import { Text } from '../Text';

export interface TestimonialCardProps {
  /**
   * Testimonial quote
   */
  quote: string;

  /**
   * Author name
   */
  name: string;

  /**
   * Author role/title
   */
  role: string;

  /**
   * Author avatar URL
   */
  avatar?: string;

  /**
   * Rating value (0-5)
   */
  rating?: number;

  /**
   * Card variant
   */
  variant?: 'default' | 'elevated' | 'outlined';

  /**
   * Custom className
   */
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  avatar,
  rating,
  variant = 'elevated',
  className,
}) => {
  return (
    <Card
      variant={variant}
      className={cn('h-full hover:shadow-xl transition-shadow duration-200', className)}
    >
      <Card.Content className="p-8">
        <Stack spacing="lg">
          {rating !== undefined && <Rating value={rating} size="md" />}

          <Text size="lg" leading="relaxed" className="text-gray-700 dark:text-gray-300">
            "{quote}"
          </Text>

          <div className="flex items-center gap-4 pt-4">
            <CompoundAvatar src={avatar} alt={name} fallback={name.charAt(0)} size="md" />
            <div>
              <Text size="base" weight="semibold" className="text-gray-900 dark:text-white">
                {name}
              </Text>
              <Text size="sm" className="text-gray-600 dark:text-gray-400">
                {role}
              </Text>
            </div>
          </div>
        </Stack>
      </Card.Content>
    </Card>
  );
};

TestimonialCard.displayName = 'TestimonialCard';
