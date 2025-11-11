import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage, AvatarStatus, CompoundAvatar } from './Avatar';

describe('Avatar', () => {
  describe('Avatar Root', () => {
    it('renders correctly', () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Avatar ref={ref}>Test</Avatar>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <Avatar data-testid="avatar" size="xs">
          Test
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('h-6', 'w-6');

      rerender(
        <Avatar data-testid="avatar" size="sm">
          Test
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('h-8', 'w-8');

      rerender(
        <Avatar data-testid="avatar" size="md">
          Test
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('h-10', 'w-10');

      rerender(
        <Avatar data-testid="avatar" size="lg">
          Test
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('h-12', 'w-12');

      rerender(
        <Avatar data-testid="avatar" size="xl">
          Test
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('h-16', 'w-16');

      rerender(
        <Avatar data-testid="avatar" size="2xl">
          Test
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('h-20', 'w-20');
    });

    it('applies custom className', () => {
      render(
        <Avatar data-testid="avatar" className="custom-class">
          Test
        </Avatar>
      );
      expect(screen.getByTestId('avatar')).toHaveClass('custom-class');
    });

    it('passes through HTML attributes', () => {
      render(
        <Avatar data-testid="avatar" role="img" aria-label="User avatar">
          Test
        </Avatar>
      );
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveAttribute('role', 'img');
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
    });

    it('applies default size when no size is provided', () => {
      render(<Avatar data-testid="avatar">Test</Avatar>);
      expect(screen.getByTestId('avatar')).toHaveClass('h-10', 'w-10'); // md is default
    });

    it('has proper structure classes', () => {
      render(<Avatar data-testid="avatar">Test</Avatar>);
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveClass('relative', 'flex', 'shrink-0', 'overflow-hidden', 'rounded-full');
    });
  });

  describe('AvatarImage', () => {
    it('renders image correctly', () => {
      render(<AvatarImage data-testid="avatar-image" src="/test.jpg" alt="Test User" />);
      const image = screen.getByTestId('avatar-image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/test.jpg');
      expect(image).toHaveAttribute('alt', 'Test User');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLImageElement>();
      render(<AvatarImage ref={ref} src="/test.jpg" alt="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLImageElement);
    });

    it('applies correct image classes', () => {
      render(<AvatarImage data-testid="avatar-image" src="/test.jpg" alt="Test" />);
      const image = screen.getByTestId('avatar-image');
      expect(image).toHaveClass('aspect-square', 'h-full', 'w-full', 'object-cover');
    });

    it('applies custom className', () => {
      render(
        <AvatarImage
          data-testid="avatar-image"
          src="/test.jpg"
          alt="Test"
          className="custom-image"
        />
      );
      expect(screen.getByTestId('avatar-image')).toHaveClass('custom-image');
    });

    it('passes through image attributes', () => {
      render(<AvatarImage data-testid="avatar-image" src="/test.jpg" alt="Test" loading="lazy" />);
      expect(screen.getByTestId('avatar-image')).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('AvatarFallback', () => {
    it('renders fallback correctly', () => {
      render(<AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>);
      const fallback = screen.getByTestId('avatar-fallback');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('JD');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<AvatarFallback ref={ref}>JD</AvatarFallback>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies variant styles correctly', () => {
      const { rerender } = render(
        <AvatarFallback data-testid="fallback" variant="default">
          JD
        </AvatarFallback>
      );
      expect(screen.getByTestId('fallback')).toHaveClass('bg-primary/10', 'text-primary');

      rerender(
        <AvatarFallback data-testid="fallback" variant="secondary">
          JD
        </AvatarFallback>
      );
      expect(screen.getByTestId('fallback')).toHaveClass(
        'bg-secondary',
        'text-secondary-foreground'
      );

      rerender(
        <AvatarFallback data-testid="fallback" variant="muted">
          JD
        </AvatarFallback>
      );
      expect(screen.getByTestId('fallback')).toHaveClass('bg-muted', 'text-muted-foreground');

      rerender(
        <AvatarFallback data-testid="fallback" variant="accent">
          JD
        </AvatarFallback>
      );
      expect(screen.getByTestId('fallback')).toHaveClass('bg-accent', 'text-accent-foreground');

      rerender(
        <AvatarFallback data-testid="fallback" variant="destructive">
          JD
        </AvatarFallback>
      );
      expect(screen.getByTestId('fallback')).toHaveClass('bg-destructive/10', 'text-destructive');
    });

    it('applies default variant when none provided', () => {
      render(<AvatarFallback data-testid="fallback">JD</AvatarFallback>);
      expect(screen.getByTestId('fallback')).toHaveClass('bg-primary/10', 'text-primary');
    });

    it('has proper structure classes', () => {
      render(<AvatarFallback data-testid="fallback">JD</AvatarFallback>);
      const fallback = screen.getByTestId('fallback');
      expect(fallback).toHaveClass(
        'flex',
        'h-full',
        'w-full',
        'items-center',
        'justify-center',
        'rounded-full',
        'font-medium'
      );
    });
  });

  describe('AvatarStatus', () => {
    it('renders status indicator correctly', () => {
      render(<AvatarStatus data-testid="status" status="online" size="md" />);
      expect(screen.getByTestId('status')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<AvatarStatus ref={ref} status="online" size="md" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies status colors correctly', () => {
      const { rerender } = render(<AvatarStatus data-testid="status" status="online" size="md" />);
      expect(screen.getByTestId('status')).toHaveClass('bg-green-500');

      rerender(<AvatarStatus data-testid="status" status="offline" size="md" />);
      expect(screen.getByTestId('status')).toHaveClass('bg-gray-400');

      rerender(<AvatarStatus data-testid="status" status="away" size="md" />);
      expect(screen.getByTestId('status')).toHaveClass('bg-yellow-500');

      rerender(<AvatarStatus data-testid="status" status="busy" size="md" />);
      expect(screen.getByTestId('status')).toHaveClass('bg-red-500');
    });

    it('applies size-based positioning correctly', () => {
      const { rerender } = render(<AvatarStatus data-testid="status" status="online" size="xs" />);
      expect(screen.getByTestId('status')).toHaveClass('h-1.5', 'w-1.5');

      rerender(<AvatarStatus data-testid="status" status="online" size="sm" />);
      expect(screen.getByTestId('status')).toHaveClass('h-2', 'w-2');

      rerender(<AvatarStatus data-testid="status" status="online" size="2xl" />);
      expect(screen.getByTestId('status')).toHaveClass('h-4', 'w-4');
    });

    it('includes aria-label for accessibility', () => {
      render(<AvatarStatus data-testid="status" status="online" size="md" />);
      expect(screen.getByTestId('status')).toHaveAttribute('aria-label', 'User is online');
    });

    it('handles missing status gracefully', () => {
      render(<AvatarStatus data-testid="status" size="md" />);
      const status = screen.getByTestId('status');
      expect(status).toBeInTheDocument();
      expect(status).not.toHaveAttribute('aria-label');
    });
  });

  describe('CompoundAvatar', () => {
    it('renders with image successfully', () => {
      render(<CompoundAvatar data-testid="compound-avatar" src="/test.jpg" alt="John Doe" />);
      expect(screen.getByTestId('compound-avatar')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpg');
    });

    it('renders fallback when no image provided', () => {
      render(<CompoundAvatar data-testid="compound-avatar" alt="John Doe" />);
      expect(screen.getByTestId('compound-avatar')).toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument(); // Initials from "John Doe"
    });

    it('generates initials correctly from alt text', () => {
      render(<CompoundAvatar alt="Jane Smith" />);
      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('generates initials correctly from fallback prop', () => {
      render(<CompoundAvatar fallback="Custom Fallback" />);
      expect(screen.getByText('CF')).toBeInTheDocument();
    });

    it('limits initials to 2 characters', () => {
      render(<CompoundAvatar alt="John Michael Smith Johnson" />);
      expect(screen.getByText('JM')).toBeInTheDocument(); // Only first 2 initials
    });

    it('handles single name correctly', () => {
      render(<CompoundAvatar alt="Madonna" />);
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('shows question mark for empty names', () => {
      render(<CompoundAvatar />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('renders status indicator when provided', () => {
      render(
        <CompoundAvatar data-testid="compound-avatar" alt="John Doe" status="online" size="md" />
      );
      const status = screen.getByLabelText('User is online');
      expect(status).toBeInTheDocument();
      expect(status).toHaveClass('bg-green-500');
    });

    it('applies fallback variant correctly', () => {
      render(<CompoundAvatar alt="John Doe" fallbackVariant="secondary" />);
      const fallback = screen.getByText('JD');
      expect(fallback).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(<CompoundAvatar ref={ref} alt="Test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes through all avatar props', () => {
      render(
        <CompoundAvatar
          data-testid="compound-avatar"
          alt="John Doe"
          size="lg"
          className="custom-avatar"
          role="img"
        />
      );
      const avatar = screen.getByTestId('compound-avatar');
      expect(avatar).toHaveClass('h-12', 'w-12', 'custom-avatar');
      expect(avatar).toHaveAttribute('role', 'img');
    });

    it('renders children when provided', () => {
      render(
        <CompoundAvatar alt="John Doe">
          <span data-testid="custom-child">Custom</span>
        </CompoundAvatar>
      );
      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });
  });

  describe('Compound Usage', () => {
    it('renders complete avatar with all components', () => {
      render(
        <Avatar data-testid="avatar" size="lg">
          <AvatarImage src="/test.jpg" alt="John Doe" />
          <AvatarFallback variant="secondary">JD</AvatarFallback>
          <AvatarStatus status="online" size="lg" />
        </Avatar>
      );

      expect(screen.getByTestId('avatar')).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByLabelText('User is online')).toBeInTheDocument();
    });

    it('allows custom styling on all components', () => {
      render(
        <Avatar data-testid="avatar" className="custom-avatar">
          <AvatarImage src="/test.jpg" alt="John Doe" className="custom-image" />
          <AvatarFallback variant="accent" className="custom-fallback">
            JD
          </AvatarFallback>
          <AvatarStatus status="away" size="lg" className="custom-status" />
        </Avatar>
      );

      expect(screen.getByTestId('avatar')).toHaveClass('custom-avatar');
      expect(screen.getByRole('img')).toHaveClass('custom-image');
      expect(screen.getByText('JD')).toHaveClass('custom-fallback');
      expect(screen.getByLabelText('User is away')).toHaveClass('custom-status');
    });
  });
});
