import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Stack>
          <div>Item 1</div>
          <div>Item 2</div>
        </Stack>,
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('renders as div element by default', () => {
      const { container } = render(<Stack>Content</Stack>);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is provided', () => {
      const { container } = render(<Stack as="nav">Content</Stack>);
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Stack className="custom-class">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('custom-class');
    });
  });

  describe('Direction Variants', () => {
    it('applies vertical direction by default', () => {
      const { container } = render(<Stack>Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('flex-col');
    });

    it('applies horizontal direction', () => {
      const { container } = render(<Stack direction="horizontal">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('flex-row');
    });
  });

  describe('Spacing Variants', () => {
    it('applies default spacing (md)', () => {
      const { container } = render(<Stack>Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-4');
    });

    it('applies none spacing', () => {
      const { container } = render(<Stack spacing="none">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-0');
    });

    it('applies xs spacing', () => {
      const { container } = render(<Stack spacing="xs">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-1');
    });

    it('applies sm spacing', () => {
      const { container } = render(<Stack spacing="sm">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-2');
    });

    it('applies lg spacing', () => {
      const { container } = render(<Stack spacing="lg">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-6');
    });

    it('applies xl spacing', () => {
      const { container } = render(<Stack spacing="xl">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-8');
    });

    it('applies 2xl spacing', () => {
      const { container } = render(<Stack spacing="2xl">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-12');
    });

    it('applies 3xl spacing', () => {
      const { container } = render(<Stack spacing="3xl">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('gap-16');
    });
  });

  describe('Align Variants', () => {
    it('applies default align (stretch)', () => {
      const { container } = render(<Stack>Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('items-stretch');
    });

    it('applies start align', () => {
      const { container } = render(<Stack align="start">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('items-start');
    });

    it('applies center align', () => {
      const { container } = render(<Stack align="center">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('items-center');
    });

    it('applies end align', () => {
      const { container } = render(<Stack align="end">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('items-end');
    });

    it('applies baseline align', () => {
      const { container } = render(<Stack align="baseline">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('items-baseline');
    });
  });

  describe('Justify Variants', () => {
    it('applies default justify (start)', () => {
      const { container } = render(<Stack>Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('justify-start');
    });

    it('applies center justify', () => {
      const { container } = render(<Stack justify="center">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('justify-center');
    });

    it('applies end justify', () => {
      const { container } = render(<Stack justify="end">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('justify-end');
    });

    it('applies between justify', () => {
      const { container } = render(<Stack justify="between">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('justify-between');
    });

    it('applies around justify', () => {
      const { container } = render(<Stack justify="around">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('justify-around');
    });

    it('applies evenly justify', () => {
      const { container } = render(<Stack justify="evenly">Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('justify-evenly');
    });
  });

  describe('Wrap Variants', () => {
    it('does not wrap by default', () => {
      const { container } = render(<Stack>Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('flex-nowrap');
    });

    it('applies wrap when enabled', () => {
      const { container } = render(<Stack wrap>Content</Stack>);
      const stack = container.firstChild;
      expect(stack).toHaveClass('flex-wrap');
    });
  });

  describe('Combination Variants', () => {
    it('combines direction and spacing', () => {
      const { container } = render(
        <Stack direction="horizontal" spacing="lg">
          Content
        </Stack>,
      );
      const stack = container.firstChild;
      expect(stack).toHaveClass('flex-row', 'gap-6');
    });

    it('combines align and justify', () => {
      const { container } = render(
        <Stack align="center" justify="between">
          Content
        </Stack>,
      );
      const stack = container.firstChild;
      expect(stack).toHaveClass('items-center', 'justify-between');
    });

    it('combines all variants', () => {
      const { container } = render(
        <Stack direction="horizontal" spacing="xl" align="center" justify="around" wrap>
          Content
        </Stack>,
      );
      const stack = container.firstChild;
      expect(stack).toHaveClass('flex-row', 'gap-8', 'items-center', 'justify-around', 'flex-wrap');
    });

    it('combines variants with custom className', () => {
      const { container } = render(
        <Stack direction="horizontal" spacing="md" className="bg-gray-100 p-4">
          Content
        </Stack>,
      );
      const stack = container.firstChild;
      expect(stack).toHaveClass('flex-row', 'gap-4', 'bg-gray-100', 'p-4');
    });
  });

  describe('Accessibility', () => {
    it('accepts aria attributes', () => {
      const { container } = render(
        <Stack as="nav" aria-label="Navigation">
          Content
        </Stack>,
      );
      const stack = container.firstChild;
      expect(stack).toHaveAttribute('aria-label', 'Navigation');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards all HTML attributes', () => {
      const { container } = render(
        <Stack data-testid="test-stack" data-custom="value">
          Content
        </Stack>,
      );
      const stack = container.firstChild;
      expect(stack).toHaveAttribute('data-testid', 'test-stack');
      expect(stack).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Stack ref={ref as any}>Content</Stack>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
