// Compound component pattern (recommended)
export { CardRoot as Card } from './Card';
export { default } from './Card';

// Individual components (backward compatibility)
export {
  Card as CardBase,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './Card';
