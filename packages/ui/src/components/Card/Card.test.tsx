import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

describe('Card Component', () => {
  describe('Card - Main Container', () => {
    it('renders with default props', () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass(
        'rounded-lg',
        'border',
        'bg-card',
        'text-card-foreground',
        'shadow-sm',
      );
    });

    it('renders children content', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Test</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes through HTML attributes', () => {
      render(
        // biome-ignore lint/a11y/useSemanticElements: Testing role attribute functionality
        <Card data-testid="card" role="article" aria-label="Test card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'article');
      expect(card).toHaveAttribute('aria-label', 'Test card');
    });
  });

  describe('Card Variants', () => {
    it('applies default variant correctly', () => {
      render(
        <Card variant="default" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card');
    });

    it('applies elevated variant correctly', () => {
      render(
        <Card variant="elevated" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-lg');
    });

    it('applies outlined variant correctly', () => {
      render(
        <Card variant="outlined" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('border-2');
    });

    it('applies filled variant correctly', () => {
      render(
        <Card variant="filled" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-muted');
    });
  });

  describe('Card Padding Variants', () => {
    it('applies no padding correctly', () => {
      render(
        <Card padding="none" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      // Should not have padding classes
      expect(card).not.toHaveClass('p-4', 'p-6', 'p-8');
    });

    it('applies small padding correctly', () => {
      render(
        <Card padding="sm" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-4');
    });

    it('applies medium padding correctly (default)', () => {
      render(
        <Card padding="md" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-6');
    });

    it('applies large padding correctly', () => {
      render(
        <Card padding="lg" data-testid="card">
          Test
        </Card>,
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-8');
    });
  });

  describe('CardHeader Component', () => {
    it('renders with correct styling', () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardHeader className="custom-header" data-testid="header">
          Test
        </CardHeader>,
      );
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('custom-header');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardHeader ref={ref}>Test</CardHeader>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardTitle Component', () => {
    it('renders as h3 by default', () => {
      render(<CardTitle>Test Title</CardTitle>);
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
      expect(title.tagName).toBe('H3');
    });

    it('renders with custom heading level', () => {
      render(<CardTitle as="h1">Test Title</CardTitle>);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H1');
    });

    it('renders with all heading levels', () => {
      const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

      headingLevels.forEach((level, index) => {
        render(<CardTitle as={level}>Title {level}</CardTitle>);
        const title = screen.getByRole('heading', { level: index + 1 });
        expect(title.tagName).toBe(level.toUpperCase());
      });
    });

    it('applies custom className', () => {
      render(<CardTitle className="custom-title">Test</CardTitle>);
      const title = screen.getByRole('heading');
      expect(title).toHaveClass('custom-title');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<CardTitle ref={ref}>Test</CardTitle>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('CardDescription Component', () => {
    it('renders with correct styling', () => {
      render(<CardDescription>Test Description</CardDescription>);
      const description = screen.getByText('Test Description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
      expect(description.tagName).toBe('P');
    });

    it('applies custom className', () => {
      render(<CardDescription className="custom-description">Test</CardDescription>);
      const description = screen.getByText('Test');
      expect(description).toHaveClass('custom-description');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<CardDescription ref={ref}>Test</CardDescription>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe('CardContent Component', () => {
    it('renders with correct styling', () => {
      render(<CardContent data-testid="content">Content here</CardContent>);
      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6', 'pt-0');
      expect(screen.getByText('Content here')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardContent className="custom-content" data-testid="content">
          Test
        </CardContent>,
      );
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('custom-content');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardContent ref={ref}>Test</CardContent>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardFooter Component', () => {
    it('renders with correct styling', () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>);
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardFooter className="custom-footer" data-testid="footer">
          Test
        </CardFooter>,
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('custom-footer');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardFooter ref={ref}>Test</CardFooter>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card Composition', () => {
    it('renders complete card structure correctly', () => {
      render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the main content of the card.</p>
          </CardContent>
          <CardFooter>
            <button type="button">Action</button>
          </CardFooter>
        </Card>,
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /card title/i })).toBeInTheDocument();
      expect(screen.getByText('Card description goes here')).toBeInTheDocument();
      expect(screen.getByText('This is the main content of the card.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
    });

    it('works with partial composition', () => {
      render(
        <Card>
          <CardContent>Just content, no header or footer</CardContent>
        </Card>,
      );

      expect(screen.getByText('Just content, no header or footer')).toBeInTheDocument();
    });

    it('supports nested content', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>
              <span>Complex</span> <em>Title</em>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4>Nested heading</h4>
              <p>Nested paragraph</p>
            </div>
          </CardContent>
        </Card>,
      );

      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /nested heading/i })).toBeInTheDocument();
      expect(screen.getByText('Nested paragraph')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports ARIA attributes on Card', () => {
      render(
        // biome-ignore lint/a11y/useSemanticElements: Testing ARIA attribute functionality
        <Card role="article" aria-labelledby="card-title" data-testid="card">
          <CardTitle id="card-title">Accessible Card</CardTitle>
        </Card>,
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'article');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    });

    it('supports semantic heading hierarchy', () => {
      render(
        <div>
          <Card>
            <CardTitle as="h2">Main Card</CardTitle>
          </Card>
          <Card>
            <CardTitle as="h3">Sub Card</CardTitle>
          </Card>
        </div>,
      );

      expect(screen.getByRole('heading', { level: 2, name: /main card/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /sub card/i })).toBeInTheDocument();
    });
  });
});
