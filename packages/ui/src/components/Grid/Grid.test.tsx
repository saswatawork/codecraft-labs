import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>,
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders as div element by default', () => {
      const { container } = render(<Grid>Content</Grid>);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is provided', () => {
      const { container } = render(<Grid as="ul">Content</Grid>);
      expect(container.querySelector('ul')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Grid className="custom-class">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('custom-class');
    });

    it('applies base grid class', () => {
      const { container } = render(<Grid>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid', 'w-full');
    });
  });

  describe('Column Variants', () => {
    it('applies default columns (3)', () => {
      const { container } = render(<Grid>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('applies 1 column', () => {
      const { container } = render(<Grid columns={1}>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('applies 2 columns', () => {
      const { container } = render(<Grid columns={2}>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });

    it('applies 4 columns', () => {
      const { container } = render(<Grid columns={4}>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('applies 5 columns', () => {
      const { container } = render(<Grid columns={5}>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'lg:grid-cols-5');
    });

    it('applies 6 columns', () => {
      const { container } = render(<Grid columns={6}>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3', 'lg:grid-cols-6');
    });

    it('applies auto-fit columns', () => {
      const { container } = render(<Grid columns="auto">Content</Grid>);
      const grid = container.firstChild as HTMLElement;
      expect(grid?.className).toContain('repeat(auto-fit');
    });

    it('applies auto-fill columns', () => {
      const { container } = render(<Grid columns="auto-fill">Content</Grid>);
      const grid = container.firstChild as HTMLElement;
      expect(grid?.className).toContain('repeat(auto-fill');
    });
  });

  describe('Gap Variants', () => {
    it('applies default gap (lg)', () => {
      const { container } = render(<Grid>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-6');
    });

    it('applies none gap', () => {
      const { container } = render(<Grid gap="none">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-0');
    });

    it('applies xs gap', () => {
      const { container } = render(<Grid gap="xs">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-1');
    });

    it('applies sm gap', () => {
      const { container } = render(<Grid gap="sm">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-2');
    });

    it('applies md gap', () => {
      const { container } = render(<Grid gap="md">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-4');
    });

    it('applies xl gap', () => {
      const { container } = render(<Grid gap="xl">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-8');
    });

    it('applies 2xl gap', () => {
      const { container } = render(<Grid gap="2xl">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-12');
    });

    it('applies 3xl gap', () => {
      const { container } = render(<Grid gap="3xl">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('gap-16');
    });
  });

  describe('Align Variants', () => {
    it('applies default align (stretch)', () => {
      const { container } = render(<Grid>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('items-stretch');
    });

    it('applies start align', () => {
      const { container } = render(<Grid align="start">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('items-start');
    });

    it('applies center align', () => {
      const { container } = render(<Grid align="center">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('items-center');
    });

    it('applies end align', () => {
      const { container } = render(<Grid align="end">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('items-end');
    });
  });

  describe('Justify Variants', () => {
    it('applies default justify (stretch)', () => {
      const { container } = render(<Grid>Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('justify-items-stretch');
    });

    it('applies start justify', () => {
      const { container } = render(<Grid justify="start">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('justify-items-start');
    });

    it('applies center justify', () => {
      const { container } = render(<Grid justify="center">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('justify-items-center');
    });

    it('applies end justify', () => {
      const { container } = render(<Grid justify="end">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveClass('justify-items-end');
    });
  });

  describe('Custom minWidth', () => {
    it('applies default minWidth (250px)', () => {
      const { container } = render(<Grid columns="auto">Content</Grid>);
      const grid = container.firstChild as HTMLElement;
      expect(grid.style.getPropertyValue('--grid-min-width')).toBe('250px');
    });

    it('applies custom minWidth', () => {
      const { container } = render(
        <Grid columns="auto" minWidth="300px">
          Content
        </Grid>,
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.style.getPropertyValue('--grid-min-width')).toBe('300px');
    });

    it('merges minWidth with style prop', () => {
      const { container } = render(
        <Grid columns="auto" minWidth="200px" style={{ backgroundColor: 'red' }}>
          Content
        </Grid>,
      );
      const grid = container.firstChild as HTMLElement;
      expect(grid.style.getPropertyValue('--grid-min-width')).toBe('200px');
      expect(grid.style.backgroundColor).toBe('red');
    });
  });

  describe('Combination Variants', () => {
    it('combines columns and gap', () => {
      const { container } = render(
        <Grid columns={4} gap="xl">
          Content
        </Grid>,
      );
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-8');
    });

    it('combines align and justify', () => {
      const { container } = render(
        <Grid align="center" justify="center">
          Content
        </Grid>,
      );
      const grid = container.firstChild;
      expect(grid).toHaveClass('items-center', 'justify-items-center');
    });

    it('combines all variants', () => {
      const { container } = render(
        <Grid columns={2} gap="md" align="start" justify="end">
          Content
        </Grid>,
      );
      const grid = container.firstChild;
      expect(grid).toHaveClass(
        'grid-cols-1',
        'md:grid-cols-2',
        'gap-4',
        'items-start',
        'justify-items-end',
      );
    });

    it('combines variants with custom className', () => {
      const { container } = render(
        <Grid columns={3} gap="lg" className="bg-gray-100">
          Content
        </Grid>,
      );
      const grid = container.firstChild;
      expect(grid).toHaveClass('grid', 'gap-6', 'bg-gray-100');
    });
  });

  describe('Accessibility', () => {
    it('accepts aria attributes', () => {
      const { container } = render(
        <Grid as="ul" aria-label="Product grid">
          Content
        </Grid>,
      );
      const grid = container.firstChild;
      expect(grid).toHaveAttribute('aria-label', 'Product grid');
    });

    it('accepts id attribute', () => {
      const { container } = render(<Grid id="feature-grid">Content</Grid>);
      const grid = container.firstChild;
      expect(grid).toHaveAttribute('id', 'feature-grid');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards all HTML attributes', () => {
      const { container } = render(
        <Grid data-testid="test-grid" data-custom="value">
          Content
        </Grid>,
      );
      const grid = container.firstChild;
      expect(grid).toHaveAttribute('data-testid', 'test-grid');
      expect(grid).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Grid ref={ref as any}>Content</Grid>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
