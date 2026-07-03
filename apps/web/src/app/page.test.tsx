import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home', () => {
  it('renders the hero heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('CodeCraft Labs');
  });

  it('renders the email input with an accessible label', () => {
    render(<Home />);
    expect(screen.getByLabelText(/Try our Input component/i)).toHaveAttribute('type', 'email');
  });

  it('renders each demo badge', () => {
    render(<Home />);
    for (const label of ['TypeScript', 'React 19', 'Tailwind', 'Vitest']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('renders the primary action buttons', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: /View Components/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Live Demo/i })).toBeInTheDocument();
  });
});
