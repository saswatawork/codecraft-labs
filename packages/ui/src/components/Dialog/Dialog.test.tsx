import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  Dialog, 
  DialogTrigger,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose,
  CompoundDialog
} from './Dialog';

// Mock createPortal for testing
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Dialog', () => {
  beforeEach(() => {
    // Reset body styles before each test
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // Clean up after each test
    document.body.style.overflow = '';
  });

  describe('Dialog Root', () => {
    it('renders without crashing', () => {
      render(
        <Dialog open={false}>
          <div>Dialog content</div>
        </Dialog>
      );
      expect(screen.queryByText('Dialog content')).toBeInTheDocument();
    });

    it('manages open state correctly', () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <Dialog open={false} onOpenChange={onOpenChange}>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );

      expect(screen.queryByText('Content')).not.toBeInTheDocument();

      rerender(
        <Dialog open={true} onOpenChange={onOpenChange}>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    test('calls onOpenChange when state changes', () => {
    const onOpenChange = vi.fn();
    
    render(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogClose />
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
  });

  describe('DialogTrigger', () => {
    it('opens dialog when clicked', () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog open={false} onOpenChange={onOpenChange}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      );

      fireEvent.click(screen.getByText('Open Dialog'));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Dialog>
          <DialogTrigger ref={ref}>Trigger</DialogTrigger>
        </Dialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('works with asChild prop', () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog open={false} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <button type="button">Custom Button</button>
          </DialogTrigger>
        </Dialog>
      );

      fireEvent.click(screen.getByText('Custom Button'));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('passes through additional props', () => {
      render(
        <Dialog>
          <DialogTrigger data-testid="trigger" className="custom-trigger">
            Trigger
          </DialogTrigger>
        </Dialog>
      );

      const trigger = screen.getByTestId('trigger');
      expect(trigger).toHaveClass('custom-trigger');
    });
  });

  describe('DialogContent', () => {
    it('renders content when dialog is open', () => {
      render(
        <Dialog open={true}>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      );

      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });

    it('does not render when dialog is closed', () => {
      render(
        <Dialog open={false}>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      );

      expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
    });

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <Dialog open={true}>
          <DialogContent size="sm" data-testid="dialog">Content</DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('dialog')).toHaveClass('max-w-sm');

      rerender(
        <Dialog open={true}>
          <DialogContent size="lg" data-testid="dialog">Content</DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('dialog')).toHaveClass('max-w-lg');

      rerender(
        <Dialog open={true}>
          <DialogContent size="full" data-testid="dialog">Content</DialogContent>
        </Dialog>
      );
      expect(screen.getByTestId('dialog')).toHaveClass('max-w-[95vw]');
    });

    it('closes on escape key when closeOnEscape is true', async () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={onOpenChange}>
          <DialogContent closeOnEscape={true}>Content</DialogContent>
        </Dialog>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });

    it('does not close on escape when closeOnEscape is false', async () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={onOpenChange}>
          <DialogContent closeOnEscape={false}>Content</DialogContent>
        </Dialog>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      await waitFor(() => {
        expect(onOpenChange).not.toHaveBeenCalled();
      });
    });

    it('manages body scroll correctly', () => {
      const { unmount } = render(
        <Dialog open={true}>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Dialog open={true}>
          <DialogContent ref={ref}>Content</DialogContent>
        </Dialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('has proper accessibility attributes', () => {
      render(
        <Dialog open={true}>
          <DialogContent data-testid="dialog">Content</DialogContent>
        </Dialog>
      );

      const dialog = screen.getByTestId('dialog');
      expect(dialog).toHaveAttribute('role', 'dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('DialogHeader', () => {
    it('renders header content correctly', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader data-testid="header">
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader ref={ref}>Header</DialogHeader>
          </DialogContent>
        </Dialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogHeader className="custom-header" data-testid="header">
              Header
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByTestId('header')).toHaveClass('custom-header');
    });
  });

  describe('DialogTitle', () => {
    it('renders as h2 by default', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const title = screen.getByText('Dialog Title');
      expect(title.tagName).toBe('H2');
    });

    it('renders with custom heading level', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogTitle as="h1">Dialog Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      const title = screen.getByText('Dialog Title');
      expect(title.tagName).toBe('H1');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLHeadingElement>();
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogTitle ref={ref}>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it('applies custom className', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogTitle className="custom-title">Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText('Title')).toHaveClass('custom-title');
    });
  });

  describe('DialogDescription', () => {
    it('renders description correctly', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogDescription>This is a description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLParagraphElement>();
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogDescription ref={ref}>Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('applies custom className', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogDescription className="custom-desc">Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText('Description')).toHaveClass('custom-desc');
    });
  });

  describe('DialogFooter', () => {
    it('renders footer content correctly', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogFooter data-testid="footer">
              <button type="button">Cancel</button>
              <button type="button">Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogFooter ref={ref}>Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('DialogClose', () => {
    it('closes dialog when clicked', () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </Dialog>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Close Close' }));
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('renders default close icon when no children provided', () => {
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogClose data-testid="close" />
          </DialogContent>
        </Dialog>
      );

      const closeButton = screen.getByTestId('close');
      expect(closeButton.querySelector('svg')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument(); // sr-only text
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Dialog open={true}>
          <DialogContent>
            <DialogClose ref={ref}>Close</DialogClose>
          </DialogContent>
        </Dialog>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('CompoundDialog', () => {
    it('renders complete dialog with all props', () => {
      const onOpenChange = vi.fn();
      render(
        <CompoundDialog
          open={true}
          onOpenChange={onOpenChange}
          title="Confirm Action"
          description="Are you sure you want to continue?"
          footer={<button type="button">Confirm</button>}
        >
          <p>Dialog content</p>
        </CompoundDialog>
      );

      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to continue?')).toBeInTheDocument();
      expect(screen.getByText('Dialog content')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('renders with trigger', () => {
      render(
        <CompoundDialog
          open={false}
          onOpenChange={() => {}}
          title="Dialog"
          trigger={<button type="button">Open Dialog</button>}
        >
          Content
        </CompoundDialog>
      );

      expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    });

    it('can hide close button', () => {
      render(
        <CompoundDialog
          open={true}
          onOpenChange={() => {}}
          title="Dialog"
          showClose={false}
        >
          Content
        </CompoundDialog>
      );

      // Close button should not be present
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });

    it('passes through content props', () => {
      render(
        <CompoundDialog
          open={true}
          onOpenChange={() => {}}
          title="Dialog"
          size="lg"
          className="custom-dialog"
          data-testid="compound-dialog"
        >
          Content
        </CompoundDialog>
      );

      const dialog = screen.getByTestId('compound-dialog');
      expect(dialog).toHaveClass('max-w-lg', 'custom-dialog');
    });
  });

  describe('Keyboard Navigation', () => {
    it('handles escape key correctly', async () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={onOpenChange}>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });

    it('ignores non-escape keys', async () => {
      const onOpenChange = vi.fn();
      render(
        <Dialog open={true} onOpenChange={onOpenChange}>
          <DialogContent>Content</DialogContent>
        </Dialog>
      );

      fireEvent.keyDown(document, { key: 'Enter' });
      await waitFor(() => {
        expect(onOpenChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    it('throws error when dialog components are used outside Dialog context', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<DialogTrigger>Trigger</DialogTrigger>);
      }).toThrow('Dialog components must be used within a Dialog');

      consoleSpy.mockRestore();
    });
  });
});