import type * as React from 'react';
import { cn } from '../../utils';
import { Button } from '../Button';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { IconBox } from '../IconBox';
import { Stack } from '../Stack';
import { Text } from '../Text';

export interface ContactCardProps {
  /**
   * Icon element
   */
  icon: React.ReactNode;

  /**
   * Card title
   */
  title: string;

  /**
   * Description text
   */
  description: string;

  /**
   * Action button config
   */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };

  /**
   * Color tone
   */
  tone?: 'blue' | 'green' | 'purple' | 'orange';

  /**
   * Card variant
   */
  variant?: 'default' | 'elevated' | 'outlined';

  /**
   * Custom className
   */
  className?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  description,
  action,
  tone = 'blue',
  variant = 'outlined',
  className,
}) => {
  return (
    <Card
      variant={variant}
      className={cn('h-full hover:shadow-lg transition-all duration-200', className)}
    >
      <Card.Content className="p-8">
        <Stack spacing="lg" align="center">
          <IconBox tone={tone} size="xl" className="mb-2">
            {icon}
          </IconBox>

          <Stack spacing="sm" align="center">
            <Heading level={3} size="xl" weight="bold" align="center">
              {title}
            </Heading>
            <Text size="base" align="center" className="text-gray-600 dark:text-gray-300">
              {description}
            </Text>
          </Stack>

          {action && (
            <Button
              variant="outline"
              size="default"
              onClick={action.onClick}
              className="mt-2"
              asChild={!!action.href}
            >
              {action.href ? (
                <a href={action.href} target="_blank" rel="noopener noreferrer">
                  {action.label}
                </a>
              ) : (
                action.label
              )}
            </Button>
          )}
        </Stack>
      </Card.Content>
    </Card>
  );
};

ContactCard.displayName = 'ContactCard';
