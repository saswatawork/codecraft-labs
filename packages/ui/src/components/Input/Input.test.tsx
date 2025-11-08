import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

// Mock icon for testing
const MockIcon = () => <span data-testid="mock-icon">🔍</span>

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('renders input field', () => {
      render(<Input placeholder="Enter text" />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', 'Enter text')
    })

    it('renders with label', () => {
      render(<Input label="Email" placeholder="Enter email" />)
      expect(screen.getByLabelText('Email')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Input helperText="This is helper text" />)
      expect(screen.getByText('This is helper text')).toBeInTheDocument()
    })

    it('renders with error message', () => {
      render(<Input error="This field is required" />)
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('handles error state styling', () => {
      render(<Input error="Error message" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-destructive')
    })

    it('handles success state styling', () => {
      render(<Input success />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-success')
    })

    it('shows loading spinner', () => {
      render(<Input loading />)
      const input = screen.getByRole('textbox')
      // Should have spinner in the component
      expect(input.parentElement?.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Icons', () => {
    it('renders left icon', () => {
      render(<Input leftIcon={<MockIcon />} />)
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    it('renders right icon', () => {
      render(<Input rightIcon={<MockIcon />} />)
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    it('applies correct padding with icons', () => {
      render(<Input leftIcon={<MockIcon />} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('pl-10')
    })
  })

  describe('Events', () => {
    it('handles onChange events', () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'test' } })
      
      expect(handleChange).toHaveBeenCalled()
    })

    it('handles focus and blur', () => {
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()
      
      render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
      
      const input = screen.getByRole('textbox')
      fireEvent.focus(input)
      fireEvent.blur(input)
      
      expect(handleFocus).toHaveBeenCalled()
      expect(handleBlur).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(<Input label="Username" />)
      const input = screen.getByRole('textbox')
      const label = screen.getByText('Username')
      
      expect(input).toHaveAttribute('id')
      expect(label).toHaveAttribute('for', input.getAttribute('id'))
    })

    it('has proper input type', () => {
      render(<Input type="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })
  })
})