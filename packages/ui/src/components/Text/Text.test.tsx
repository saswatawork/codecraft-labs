import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as paragraph by default', () => {
      const { container } = render(<Text>Paragraph</Text>);
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('renders as different HTML elements', () => {
      const { container, rerender } = render(<Text as="span">Span</Text>);
      expect(container.querySelector('span')).toBeInTheDocument();

      rerender(<Text as="div">Div</Text>);
      expect(container.querySelector('div')).toBeInTheDocument();

      rerender(<Text as="label">Label</Text>);
      expect(container.querySelector('label')).toBeInTheDocument();
    });
  });

  describe('Size', () => {
    it('applies base size by default', () => {
      render(<Text>Base Size</Text>);
      expect(screen.getByText('Base Size')).toHaveClass('text-base');
    });

    it('applies different text sizes', () => {
      const { rerender } = render(<Text size="xs">Extra Small</Text>);
      expect(screen.getByText('Extra Small')).toHaveClass('text-xs');

      rerender(<Text size="sm">Small</Text>);
      expect(screen.getByText('Small')).toHaveClass('text-sm');

      rerender(<Text size="lg">Large</Text>);
      expect(screen.getByText('Large')).toHaveClass('text-lg');

      rerender(<Text size="xl">Extra Large</Text>);
      expect(screen.getByText('Extra Large')).toHaveClass('text-xl');

      rerender(<Text size="2xl">2XL</Text>);
      expect(screen.getByText('2XL')).toHaveClass('text-2xl');
    });
  });

  describe('Font Weight', () => {
    it('applies normal weight by default', () => {
      render(<Text>Normal</Text>);
      expect(screen.getByText('Normal')).toHaveClass('font-normal');
    });

    it('applies different font weights', () => {
      const { rerender } = render(<Text weight="medium">Medium</Text>);
      expect(screen.getByText('Medium')).toHaveClass('font-medium');

      rerender(<Text weight="semibold">Semibold</Text>);
      expect(screen.getByText('Semibold')).toHaveClass('font-semibold');

      rerender(<Text weight="bold">Bold</Text>);
      expect(screen.getByText('Bold')).toHaveClass('font-bold');
    });
  });

  describe('Color', () => {
    it('applies default color', () => {
      render(<Text>Default</Text>);
      expect(screen.getByText('Default')).toHaveClass('text-gray-900');
    });

    it('applies different colors', () => {
      const { rerender } = render(<Text color="muted">Muted</Text>);
      expect(screen.getByText('Muted')).toHaveClass('text-gray-700');

      rerender(<Text color="subtle">Subtle</Text>);
      expect(screen.getByText('Subtle')).toHaveClass('text-gray-600');

      rerender(<Text color="blue">Blue</Text>);
      expect(screen.getByText('Blue')).toHaveClass('text-blue-600');

      rerender(<Text color="purple">Purple</Text>);
      expect(screen.getByText('Purple')).toHaveClass('text-purple-600');

      rerender(<Text color="red">Red</Text>);
      expect(screen.getByText('Red')).toHaveClass('text-red-600');
    });
  });

  describe('Line Height', () => {
    it('applies normal leading by default', () => {
      render(<Text>Normal Leading</Text>);
      expect(screen.getByText('Normal Leading')).toHaveClass('leading-normal');
    });

    it('applies different line heights', () => {
      const { rerender } = render(<Text leading="tight">Tight</Text>);
      expect(screen.getByText('Tight')).toHaveClass('leading-tight');

      rerender(<Text leading="relaxed">Relaxed</Text>);
      expect(screen.getByText('Relaxed')).toHaveClass('leading-relaxed');

      rerender(<Text leading="loose">Loose</Text>);
      expect(screen.getByText('Loose')).toHaveClass('leading-loose');
    });
  });

  describe('Text Alignment', () => {
    it('applies left alignment by default', () => {
      render(<Text>Left</Text>);
      expect(screen.getByText('Left')).toHaveClass('text-left');
    });

    it('applies different alignments', () => {
      const { rerender } = render(<Text align="center">Center</Text>);
      expect(screen.getByText('Center')).toHaveClass('text-center');

      rerender(<Text align="right">Right</Text>);
      expect(screen.getByText('Right')).toHaveClass('text-right');

      rerender(<Text align="justify">Justify</Text>);
      expect(screen.getByText('Justify')).toHaveClass('text-justify');
    });
  });

  describe('Truncate', () => {
    it('does not truncate by default', () => {
      render(<Text>Long text content</Text>);
      expect(screen.getByText('Long text content')).not.toHaveClass('truncate');
    });

    it('applies truncate class when enabled', () => {
      render(<Text truncate>Very long text that should be truncated</Text>);
      expect(screen.getByText('Very long text that should be truncated')).toHaveClass('truncate');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      render(<Text className="custom-class">Custom</Text>);
      expect(screen.getByText('Custom')).toHaveClass('custom-class');
    });

    it('merges custom className with default styles', () => {
      render(<Text className="my-custom-class">Merged</Text>);
      const text = screen.getByText('Merged');
      expect(text).toHaveClass('my-custom-class');
      expect(text).toHaveClass('text-base');
      expect(text).toHaveClass('font-normal');
    });
  });

  describe('Accessibility', () => {
    it('passes through id attribute', () => {
      render(<Text id="test-text">Test</Text>);
      const text = screen.getByText('Test');
      expect(text).toHaveAttribute('id', 'test-text');
    });

    it('works with label element for form accessibility', () => {
      render(
        <div>
          <Text as="label">Label Text</Text>
          <input id="input-field" />
        </div>,
      );
      const label = screen.getByText('Label Text');
      expect(label.tagName).toBe('LABEL');
    });
  });

  describe('Combinations', () => {
    it('combines multiple props correctly', () => {
      render(
        <Text size="lg" weight="semibold" color="blue" leading="relaxed" align="center">
          Combined Props
        </Text>,
      );
      const text = screen.getByText('Combined Props');
      expect(text).toHaveClass('text-lg');
      expect(text).toHaveClass('font-semibold');
      expect(text).toHaveClass('text-blue-600');
      expect(text).toHaveClass('leading-relaxed');
      expect(text).toHaveClass('text-center');
    });

    it('works as span with truncate', () => {
      render(
        <Text as="span" size="sm" truncate>
          Truncated Span
        </Text>,
      );
      const text = screen.getByText('Truncated Span');
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('truncate');
      expect(text).toHaveClass('text-sm');
    });
  });
});
