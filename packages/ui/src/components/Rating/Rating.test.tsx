import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Rating } from './Rating';

describe('Rating', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { container } = render(<Rating value={3} />);
      const rating = container.firstChild as Element;
      expect(rating).toBeInTheDocument();
      expect(rating).toHaveClass('flex', 'items-center');
    });

    it('renders correct number of stars', () => {
      const { container } = render(<Rating value={3} />);
      const stars = container.querySelectorAll('svg');
      expect(stars).toHaveLength(5); // default max
    });

    it('renders custom max stars', () => {
      const { container } = render(<Rating value={4} max={10} />);
      const stars = container.querySelectorAll('svg');
      expect(stars).toHaveLength(10);
    });
  });

  describe('Rating Value', () => {
    it('fills correct number of stars', () => {
      const { container } = render(<Rating value={3} />);
      const filledStars = container.querySelectorAll('.text-yellow-400');
      const emptyStars = container.querySelectorAll('.text-gray-300');

      expect(filledStars).toHaveLength(3);
      expect(emptyStars).toHaveLength(2);
    });

    it('handles zero rating', () => {
      const { container } = render(<Rating value={0} />);
      const filledStars = container.querySelectorAll('.text-yellow-400');
      const emptyStars = container.querySelectorAll('.text-gray-300');

      expect(filledStars).toHaveLength(0);
      expect(emptyStars).toHaveLength(5);
    });

    it('handles full rating', () => {
      const { container } = render(<Rating value={5} />);
      const filledStars = container.querySelectorAll('.text-yellow-400');

      expect(filledStars).toHaveLength(5);
    });

    it('handles partial ratings correctly', () => {
      const { container } = render(<Rating value={2.5} max={5} />);
      const filledStars = container.querySelectorAll('.text-yellow-400');
      // Currently floors the value (2.5 -> 2 filled stars)
      expect(filledStars).toHaveLength(2);
    });
  });

  describe('Size', () => {
    it('applies md size by default', () => {
      const { container } = render(<Rating value={3} />);
      const stars = container.querySelectorAll('svg');
      for (const star of stars) {
        expect(star).toHaveClass('h-5', 'w-5');
      }
    });

    it('applies different sizes', () => {
      const { container, rerender } = render(<Rating value={3} size="sm" />);
      let stars = container.querySelectorAll('svg');
      for (const star of stars) {
        expect(star).toHaveClass('h-4', 'w-4');
      }

      rerender(<Rating value={3} size="lg" />);
      stars = container.querySelectorAll('svg');
      for (const star of stars) {
        expect(star).toHaveClass('h-6', 'w-6');
      }
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA label', () => {
      const { container } = render(<Rating value={4} />);
      const rating = container.firstChild as Element;
      expect(rating).toHaveAttribute('role', 'img');
      expect(rating).toHaveAttribute('aria-label', '4 out of 5 stars');
    });

    it('has correct ARIA label with custom max', () => {
      const { container } = render(<Rating value={7} max={10} />);
      const rating = container.firstChild as Element;
      expect(rating).toHaveAttribute('aria-label', '7 out of 10 stars');
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(<Rating value={3} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('merges custom className with default styles', () => {
      const { container } = render(<Rating value={3} className="my-class" />);
      const rating = container.firstChild as Element;
      expect(rating).toHaveClass('my-class');
      expect(rating).toHaveClass('flex');
      expect(rating).toHaveClass('items-center');
    });
  });
});
