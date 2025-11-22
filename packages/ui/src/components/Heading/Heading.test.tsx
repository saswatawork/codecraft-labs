import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Heading } from './Heading';

describe('Heading', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Heading>Hello World</Heading>);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Hello World');
    });

    it('renders different heading levels', () => {
      const { rerender } = render(<Heading level={1}>Level 1</Heading>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

      rerender(<Heading level={3}>Level 3</Heading>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

      rerender(<Heading level={6}>Level 6</Heading>);
      expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    });

    it('applies correct semantic HTML element', () => {
      const { container } = render(<Heading level={3}>Content</Heading>);
      expect(container.querySelector('h3')).toBeInTheDocument();
    });
  });

  describe('Text Alignment', () => {
    it('applies left alignment by default', () => {
      render(<Heading>Left</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-left');
    });

    it('applies center alignment', () => {
      render(<Heading align="center">Centered</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-center');
    });

    it('applies right alignment', () => {
      render(<Heading align="right">Right</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-right');
    });
  });

  describe('Sizing', () => {
    it('applies default responsive sizing based on level', () => {
      render(<Heading level={1}>H1</Heading>);
      const heading = screen.getByRole('heading');
      expect(heading.className).toMatch(/text-4xl.*md:text-5xl.*lg:text-6xl/);
    });

    it('allows custom size override', () => {
      render(
        <Heading level={1} size="lg">
          Custom Size
        </Heading>,
      );
      expect(screen.getByRole('heading')).toHaveClass('text-lg');
    });

    it('applies different sizes correctly', () => {
      const { rerender } = render(<Heading size="xs">Extra Small</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-xs');

      rerender(<Heading size="4xl">4XL</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-4xl');
    });
  });

  describe('Font Weight', () => {
    it('applies bold weight by default', () => {
      render(<Heading>Bold</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('font-bold');
    });

    it('applies different weights', () => {
      const { rerender } = render(<Heading weight="normal">Normal</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('font-normal');

      rerender(<Heading weight="semibold">Semibold</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('font-semibold');

      rerender(<Heading weight="extrabold">Extrabold</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('font-extrabold');
    });
  });

  describe('Color Tone', () => {
    it('applies default tone', () => {
      render(<Heading>Default</Heading>);
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('text-gray-900');
    });

    it('applies different color tones', () => {
      const { rerender } = render(<Heading tone="blue">Blue</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-blue-600');

      rerender(<Heading tone="purple">Purple</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-purple-600');

      rerender(<Heading tone="muted">Muted</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('text-gray-700');
    });
  });

  describe('Gradient', () => {
    it('applies gradient effect when enabled', () => {
      render(<Heading gradient>Gradient Text</Heading>);
      const heading = screen.getByRole('heading');
      const span = heading.querySelector('span');

      expect(span).toBeInTheDocument();
      expect(span).toHaveClass('bg-gradient-to-r', 'bg-clip-text', 'text-transparent');
    });

    it('uses default gradient colors', () => {
      render(<Heading gradient>Gradient</Heading>);
      const span = screen.getByRole('heading').querySelector('span');
      expect(span).toHaveClass('from-blue-600', 'via-purple-600', 'to-pink-600');
    });

    it('allows custom gradient colors', () => {
      render(
        <Heading gradient gradientColors="from-red-500 to-yellow-500">
          Custom Gradient
        </Heading>,
      );
      const span = screen.getByRole('heading').querySelector('span');
      expect(span).toHaveClass('from-red-500', 'to-yellow-500');
    });

    it('ignores tone when gradient is enabled', () => {
      render(
        <Heading gradient tone="blue">
          Gradient Blue
        </Heading>,
      );
      const heading = screen.getByRole('heading');
      expect(heading).not.toHaveClass('text-blue-600');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      render(<Heading className="custom-class">Custom</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('custom-class');
    });

    it('merges custom className with default styles', () => {
      render(<Heading className="my-custom-class">Merged</Heading>);
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('my-custom-class');
      expect(heading).toHaveClass('font-bold');
      expect(heading).toHaveClass('leading-tight');
    });
  });

  describe('Accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLHeadingElement | null };
      render(<Heading ref={ref}>Ref Test</Heading>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
      expect(ref.current?.tagName).toBe('H2');
    });

    it('passes through native HTML attributes', () => {
      render(
        <Heading id="test-heading" data-testid="heading">
          Test
        </Heading>,
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveAttribute('id', 'test-heading');
      expect(heading).toHaveAttribute('data-testid', 'heading');
    });

    it('maintains proper heading hierarchy', () => {
      render(
        <div>
          <Heading level={1}>Main Title</Heading>
          <Heading level={2}>Subtitle</Heading>
          <Heading level={3}>Section</Heading>
        </div>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    it('applies leading-tight for better heading appearance', () => {
      render(<Heading>Tight Leading</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('leading-tight');
    });

    it('applies tracking-tight for better heading appearance', () => {
      render(<Heading>Tight Tracking</Heading>);
      expect(screen.getByRole('heading')).toHaveClass('tracking-tight');
    });
  });

  describe('Responsive Sizing', () => {
    it('h1 has responsive text sizing', () => {
      render(<Heading level={1}>Responsive H1</Heading>);
      const heading = screen.getByRole('heading');
      expect(heading.className).toMatch(/text-4xl/);
      expect(heading.className).toMatch(/md:text-5xl/);
      expect(heading.className).toMatch(/lg:text-6xl/);
    });

    it('h2 has responsive text sizing', () => {
      render(<Heading level={2}>Responsive H2</Heading>);
      const heading = screen.getByRole('heading');
      expect(heading.className).toMatch(/text-3xl/);
      expect(heading.className).toMatch(/md:text-4xl/);
      expect(heading.className).toMatch(/lg:text-5xl/);
    });
  });
});
