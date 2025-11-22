import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Divider />);
      const divider = container.firstChild as Element;
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('w-full', 'h-px');
    });

    it('renders horizontal divider by default', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveClass('w-full', 'h-px');
    });

    it('renders vertical divider', () => {
      const { container } = render(<Divider orientation="vertical" />);
      expect(container.firstChild).toHaveClass('h-full', 'w-px');
    });
  });

  describe('Variant', () => {
    it('applies solid variant by default', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveClass('bg-gray-200');
    });

    it('applies gradient variant', () => {
      const { container } = render(<Divider variant="gradient" />);
      expect(container.firstChild).toHaveClass('bg-gradient-to-r');
    });

    it('applies dashed variant', () => {
      const { container } = render(<Divider variant="dashed" />);
      const divider = container.firstChild as Element;
      expect(divider.className).toMatch(/border-t.*border-dashed/);
    });
  });

  describe('Tone', () => {
    it('applies gray tone by default', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveClass('bg-gray-200');
    });

    it('applies different tones for solid variant', () => {
      const { container, rerender } = render(<Divider tone="blue" />);
      expect(container.firstChild).toHaveClass('bg-blue-200');

      rerender(<Divider tone="purple" />);
      expect(container.firstChild).toHaveClass('bg-purple-200');
    });
  });

  describe('Spacing', () => {
    it('applies md spacing by default for horizontal', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toHaveClass('my-4');
    });

    it('applies different spacing for horizontal', () => {
      const { container, rerender } = render(<Divider spacing="none" />);
      expect(container.firstChild).not.toHaveClass('my-4');

      rerender(<Divider spacing="sm" />);
      expect(container.firstChild).toHaveClass('my-2');

      rerender(<Divider spacing="lg" />);
      expect(container.firstChild).toHaveClass('my-8');
    });

    it('applies different spacing for vertical', () => {
      const { container, rerender } = render(<Divider orientation="vertical" spacing="sm" />);
      expect(container.firstChild).toHaveClass('mx-2');

      rerender(<Divider orientation="vertical" spacing="md" />);
      expect(container.firstChild).toHaveClass('mx-4');

      rerender(<Divider orientation="vertical" spacing="lg" />);
      expect(container.firstChild).toHaveClass('mx-8');
    });
  });

  describe('Text', () => {
    it('renders with text in the middle', () => {
      render(<Divider text="OR" />);
      expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('creates three-part layout with text', () => {
      const { container } = render(<Divider text="More" />);
      const wrapper = container.firstChild as Element;
      expect(wrapper).toHaveClass('flex', 'items-center');
      expect(wrapper.children).toHaveLength(3); // left line, text, right line
    });

    it('only works with horizontal orientation', () => {
      const { container } = render(<Divider orientation="vertical" text="Text" />);
      // Should render simple divider, not text layout
      expect(container.firstChild).toHaveClass('h-full', 'w-px');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(<Divider className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('merges custom className with default styles', () => {
      const { container } = render(<Divider className="my-class" />);
      const divider = container.firstChild as Element;
      expect(divider).toHaveClass('my-class');
      expect(divider).toHaveClass('w-full');
    });
  });

  describe('Combinations', () => {
    it('combines variant, tone, and spacing', () => {
      const { container } = render(<Divider variant="solid" tone="blue" spacing="lg" />);
      const divider = container.firstChild as Element;
      expect(divider).toHaveClass('bg-blue-200');
      expect(divider).toHaveClass('my-8');
    });

    it('gradient with text works correctly', () => {
      const { container } = render(<Divider variant="gradient" text="Section" />);
      expect(screen.getByText('Section')).toBeInTheDocument();
      const lines = container.querySelectorAll('.bg-gradient-to-r');
      expect(lines).toHaveLength(2); // left and right gradient lines
    });
  });
});
