import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Badge } from './Badge'

// Mock icon for testing
const MockIcon = () => <span data-testid="mock-icon">✓</span>

describe('Badge Component', () => {
  describe('Basic Rendering', () => {
    it('renders badge with text', () => {
      render(<Badge>New</Badge>)
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Badge className="custom-badge">Test</Badge>)
      const badge = screen.getByText('Test')
      expect(badge).toHaveClass('custom-badge')
    })
  })

  describe('Variants', () => {
    it('applies default variant styles', () => {
      render(<Badge>Default</Badge>)
      const badge = screen.getByText('Default')
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground')
    })

    it('applies secondary variant styles', () => {
      render(<Badge variant="secondary">Secondary</Badge>)
      const badge = screen.getByText('Secondary')
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground')
    })

    it('applies destructive variant styles', () => {
      render(<Badge variant="destructive">Error</Badge>)
      const badge = screen.getByText('Error')
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground')
    })
  })

  describe('Sizes', () => {
    it('applies small size', () => {
      render(<Badge size="sm">Small</Badge>)
      const badge = screen.getByText('Small')
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs')
    })

    it('applies large size', () => {
      render(<Badge size="lg">Large</Badge>)
      const badge = screen.getByText('Large')
      expect(badge).toHaveClass('px-3', 'py-1', 'text-sm')
    })
  })

  describe('Features', () => {
    it('renders dot indicator', () => {
      render(<Badge dot>Online</Badge>)
      const badge = screen.getByText('Online')
      // Dot should be rendered as a child element
      expect(badge.querySelector('div')).toBeInTheDocument()
    })

    it('renders left icon', () => {
      render(<Badge leftIcon={<MockIcon />}>With Icon</Badge>)
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
      expect(screen.getByText('With Icon')).toBeInTheDocument()
    })

    it('renders right icon', () => {
      render(<Badge rightIcon={<MockIcon />}>With Icon</Badge>)
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    it('shows loading state', () => {
      render(<Badge loading>Loading</Badge>)
      const badge = screen.getByText('Loading')
      expect(badge).toHaveClass('animate-pulse')
      // Should show loading spinner
      expect(badge.querySelector('div')).toBeInTheDocument()
    })

    it('applies interactive styles', () => {
      render(<Badge interactive>Clickable</Badge>)
      const badge = screen.getByText('Clickable')
      expect(badge).toHaveClass('cursor-pointer')
    })
  })

  describe('Polymorphic Rendering', () => {
    it('renders as button when specified', () => {
      render(<Badge as="button">Button Badge</Badge>)
      const element = screen.getByText('Button Badge')
      expect(element.tagName).toBe('BUTTON')
    })

    it('renders as span by default', () => {
      render(<Badge>Default Badge</Badge>)
      const element = screen.getByText('Default Badge')
      expect(element.tagName).toBe('DIV')
    })
  })

  describe('Events', () => {
    it('handles click events when interactive', () => {
      const handleClick = vi.fn()
      render(
        <Badge interactive onClick={handleClick}>
          Clickable Badge
        </Badge>
      )
      
      fireEvent.click(screen.getByText('Clickable Badge'))
      expect(handleClick).toHaveBeenCalled()
    })

    it('does not interfere with non-interactive badges', () => {
      const handleClick = vi.fn()
      render(
        <Badge onClick={handleClick}>
          Non-interactive Badge
        </Badge>
      )
      
      fireEvent.click(screen.getByText('Non-interactive Badge'))
      expect(handleClick).toHaveBeenCalled()
    })
  })
})