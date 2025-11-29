import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Section>Test Content</Section>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders as section element by default', () => {
      const { container } = render(<Section>Content</Section>);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is provided', () => {
      const { container } = render(<Section as="article">Content</Section>);
      expect(container.querySelector('article')).toBeInTheDocument();
      expect(container.querySelector('section')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Section className="custom-class">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-class');
    });
  });

  describe('Spacing Variants', () => {
    it('applies default spacing (lg)', () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-20', 'md:py-28');
    });

    it('applies none spacing', () => {
      const { container } = render(<Section spacing="none">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-0');
    });

    it('applies xs spacing', () => {
      const { container } = render(<Section spacing="xs">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-8', 'md:py-12');
    });

    it('applies sm spacing', () => {
      const { container } = render(<Section spacing="sm">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-12', 'md:py-16');
    });

    it('applies md spacing', () => {
      const { container } = render(<Section spacing="md">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-16', 'md:py-24');
    });

    it('applies xl spacing', () => {
      const { container } = render(<Section spacing="xl">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-24', 'md:py-32');
    });

    it('applies 2xl spacing', () => {
      const { container } = render(<Section spacing="2xl">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-32', 'md:py-40');
    });
  });

  describe('Width Variants', () => {
    it('applies default width (wide)', () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('mx-auto', 'max-w-6xl');
    });

    it('applies full width', () => {
      const { container } = render(<Section width="full">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('w-full');
    });

    it('applies contained width', () => {
      const { container } = render(<Section width="contained">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('mx-auto', 'px-4');
    });

    it('applies narrow width', () => {
      const { container } = render(<Section width="narrow">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('mx-auto', 'max-w-4xl');
    });

    it('applies ultra width', () => {
      const { container } = render(<Section width="ultra">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('mx-auto', 'max-w-7xl');
    });
  });

  describe('Accessibility', () => {
    it('accepts aria attributes', () => {
      const { container } = render(
        <Section aria-label="Main content" aria-labelledby="heading">
          Content
        </Section>,
      );
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-label', 'Main content');
      expect(section).toHaveAttribute('aria-labelledby', 'heading');
    });

    it('accepts id attribute', () => {
      const { container } = render(<Section id="hero-section">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('id', 'hero-section');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards all HTML attributes', () => {
      const { container } = render(
        <Section data-testid="test-section" data-custom="value">
          Content
        </Section>,
      );
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('data-testid', 'test-section');
      expect(section).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Section ref={ref as any}>Content</Section>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Combination Variants', () => {
    it('combines spacing and width variants', () => {
      const { container } = render(
        <Section spacing="xl" width="narrow">
          Content
        </Section>,
      );
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-24', 'md:py-32', 'mx-auto', 'max-w-4xl');
    });

    it('combines variants with custom className', () => {
      const { container } = render(
        <Section spacing="md" width="contained" className="bg-gray-100">
          Content
        </Section>,
      );
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-16', 'md:py-24', 'mx-auto', 'bg-gray-100');
    });
  });

  describe('Background Variants', () => {
    it('applies default variant (no background)', () => {
      const { container } = render(<Section>Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('w-full');
      expect(section).not.toHaveClass('bg-white');
    });

    it('applies light variant', () => {
      const { container } = render(<Section variant="light">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-white');
    });

    it('applies light-gray variant', () => {
      const { container } = render(<Section variant="light-gray">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-gray-50');
    });

    it('applies gradient-light variant', () => {
      const { container } = render(<Section variant="gradient-light">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-gradient-to-b', 'from-gray-50', 'to-white');
    });

    it('applies gradient-dark variant', () => {
      const { container } = render(<Section variant="gradient-dark">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass(
        'bg-gradient-to-br',
        'from-gray-900',
        'to-blue-900',
        'text-white',
      );
    });

    it('applies gradient-purple variant', () => {
      const { container } = render(<Section variant="gradient-purple">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass(
        'bg-gradient-to-br',
        'from-purple-900',
        'to-indigo-900',
        'text-white',
      );
    });

    it('applies dark variant', () => {
      const { container } = render(<Section variant="dark">Content</Section>);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-gray-900', 'text-white');
    });

    it('combines background variant with spacing and width', () => {
      const { container } = render(
        <Section variant="gradient-light" spacing="xl" width="narrow">
          Content
        </Section>,
      );
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-gradient-to-b', 'py-24', 'md:py-32', 'max-w-4xl');
    });
  });
});
