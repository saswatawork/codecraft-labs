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
      className={cn(
        'h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
        className,
      )}
    >
      <Card.Content className="p-10">
        <Stack spacing="xl" align="center">
          <IconBox tone={tone} size="xl" className="mb-2 p-4">
            {icon}
          </IconBox>

          <Stack spacing="md" align="center">
            <Heading level={3} size="xl" weight="bold" align="center">
              {title}
            </Heading>
            <Text
              size="base"
              align="center"
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {description}
            </Text>
          </Stack>

          {action && (
            <Button
              variant="outline"
              size="default"
              onClick={action.onClick}
              className="mt-4 px-6 py-3 font-medium"
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
