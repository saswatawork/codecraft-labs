import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconBox } from './IconBox';

const TestIcon = () => <svg data-testid="test-icon" />;

describe('IconBox', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(
        <IconBox>
          <TestIcon />
        </IconBox>,
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('flex', 'items-center', 'justify-center');
    });

    it('renders children correctly', () => {
      render(
        <IconBox>
          <span>Icon</span>
        </IconBox>,
      );
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });
  });

  describe('Tone', () => {
    it('applies blue tone by default', () => {
      const { container } = render(
        <IconBox>
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('bg-blue-100', 'text-blue-600');
    });

    it('applies different tones', () => {
      const { container, rerender } = render(
        <IconBox tone="green">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('bg-green-100', 'text-green-600');

      rerender(
        <IconBox tone="purple">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('bg-purple-100', 'text-purple-600');

      rerender(
        <IconBox tone="orange">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('bg-orange-100', 'text-orange-600');

      rerender(
        <IconBox tone="red">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('bg-red-100', 'text-red-600');

      rerender(
        <IconBox tone="gray">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('bg-gray-100', 'text-gray-600');
    });
  });

  describe('Size', () => {
    it('applies md size by default', () => {
      const { container } = render(
        <IconBox>
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('h-10', 'w-10');
    });

    it('applies different sizes', () => {
      const { container, rerender } = render(
        <IconBox size="sm">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('h-8', 'w-8');

      rerender(
        <IconBox size="lg">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('h-12', 'w-12');

      rerender(
        <IconBox size="xl">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('h-16', 'w-16');
    });
  });

  describe('Shape', () => {
    it('applies rounded shape by default', () => {
      const { container } = render(
        <IconBox>
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('rounded-lg');
    });

    it('applies different shapes', () => {
      const { container, rerender } = render(
        <IconBox shape="square">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('rounded-none');

      rerender(
        <IconBox shape="circle">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('rounded-full');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <IconBox className="custom-class">
          <TestIcon />
        </IconBox>,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('merges custom className with default styles', () => {
      const { container } = render(
        <IconBox className="my-class">
          <TestIcon />
        </IconBox>,
      );
      const box = container.firstChild as Element;
      expect(box).toHaveClass('my-class');
      expect(box).toHaveClass('flex');
      expect(box).toHaveClass('items-center');
    });
  });

  describe('Combinations', () => {
    it('combines size, tone, and shape', () => {
      const { container } = render(
        <IconBox size="lg" tone="purple" shape="circle">
          <TestIcon />
        </IconBox>,
      );
      const box = container.firstChild as Element;
      expect(box).toHaveClass('h-12', 'w-12');
      expect(box).toHaveClass('bg-purple-100', 'text-purple-600');
      expect(box).toHaveClass('rounded-full');
    });
  });
});
