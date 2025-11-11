import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { 
  Navigation, 
  NavigationContainer,
  NavigationBrand,
  NavigationMenu,
  NavigationItem,
  NavigationToggle,
  NavigationActions,
  CompoundNavigation
} from './Navigation';

describe('Navigation', () => {
  describe('Navigation Root', () => {
    it('renders without crashing', () => {
      render(
        <Navigation>
          <div>Navigation content</div>
        </Navigation>
      );
      expect(screen.getByText('Navigation content')).toBeInTheDocument();
    });

    it('applies variant styles correctly', () => {
      const { rerender } = render(
        <Navigation variant="default" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('border-border');

      rerender(
        <Navigation variant="ghost" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('border-transparent');

      rerender(
        <Navigation variant="floating" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('rounded-lg', 'shadow-sm');
    });

    it('applies size styles correctly', () => {
      const { rerender } = render(
        <Navigation size="sm" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('h-12');

      rerender(
        <Navigation size="md" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('h-14');

      rerender(
        <Navigation size="lg" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('h-16');
    });

    it('applies position styles correctly', () => {
      const { rerender } = render(
        <Navigation position="static" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('relative');

      rerender(
        <Navigation position="sticky" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('sticky');

      rerender(
        <Navigation position="fixed" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('fixed');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLElement>();
      render(
        <Navigation ref={ref}>
          Content
        </Navigation>
      );
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
    });

    it('applies custom className', () => {
      render(
        <Navigation className="custom-nav" data-testid="nav">
          Content
        </Navigation>
      );
      expect(screen.getByTestId('nav')).toHaveClass('custom-nav');
    });
  });

  describe('NavigationContainer', () => {
    it('renders container correctly', () => {
      render(
        <Navigation>
          <NavigationContainer data-testid="container">
            Container content
          </NavigationContainer>
        </Navigation>
      );
      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(screen.getByText('Container content')).toBeInTheDocument();
    });

    it('applies spacing variants correctly', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationContainer spacing="sm" data-testid="container">
            Content
          </NavigationContainer>
        </Navigation>
      );
      expect(screen.getByTestId('container')).toHaveClass('gap-2');

      rerender(
        <Navigation>
          <NavigationContainer spacing="md" data-testid="container">
            Content
          </NavigationContainer>
        </Navigation>
      );
      expect(screen.getByTestId('container')).toHaveClass('gap-4');

      rerender(
        <Navigation>
          <NavigationContainer spacing="lg" data-testid="container">
            Content
          </NavigationContainer>
        </Navigation>
      );
      expect(screen.getByTestId('container')).toHaveClass('gap-6');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Navigation>
          <NavigationContainer ref={ref}>
            Content
          </NavigationContainer>
        </Navigation>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('NavigationBrand', () => {
    it('renders brand with text', () => {
      render(
        <Navigation>
          <NavigationBrand text="Brand Name" />
        </Navigation>
      );
      expect(screen.getByText('Brand Name')).toBeInTheDocument();
    });

    it('renders brand with logo', () => {
      render(
        <Navigation>
          <NavigationBrand logo={<img src="logo.png" alt="Logo" />} />
        </Navigation>
      );
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    it('renders brand with both logo and text', () => {
      render(
        <Navigation>
          <NavigationBrand 
            logo={<img src="logo.png" alt="Logo" />}
            text="Brand Name"
          />
        </Navigation>
      );
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByText('Brand Name')).toBeInTheDocument();
    });

    it('renders as link when href is provided', () => {
      render(
        <Navigation>
          <NavigationBrand href="/" text="Brand Name" />
        </Navigation>
      );
      const link = screen.getByText('Brand Name').closest('a');
      expect(link).toHaveAttribute('href', '/');
    });

    it('renders children when provided', () => {
      render(
        <Navigation>
          <NavigationBrand>
            <span>Custom Brand Content</span>
          </NavigationBrand>
        </Navigation>
      );
      expect(screen.getByText('Custom Brand Content')).toBeInTheDocument();
    });

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationBrand size="sm" text="Brand" data-testid="brand" />
        </Navigation>
      );
      expect(screen.getByTestId('brand')).toHaveClass('text-sm');

      rerender(
        <Navigation>
          <NavigationBrand size="lg" text="Brand" data-testid="brand" />
        </Navigation>
      );
      expect(screen.getByTestId('brand')).toHaveClass('text-lg');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Navigation>
          <NavigationBrand ref={ref} text="Brand" />
        </Navigation>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('NavigationMenu', () => {
    it('renders menu items', () => {
      render(
        <Navigation>
          <NavigationMenu>
            <span>Menu Item</span>
          </NavigationMenu>
        </Navigation>
      );
      expect(screen.getByText('Menu Item')).toBeInTheDocument();
    });

    it('shows/hides based on mobile toggle state', () => {
      render(
        <Navigation>
          <NavigationToggle />
          <NavigationMenu data-testid="menu">
            Menu Content
          </NavigationMenu>
        </Navigation>
      );

      const menu = screen.getByTestId('menu');
      const toggle = screen.getByRole('button');

      // Initially hidden on mobile
      expect(menu).toHaveClass('hidden');

      // Show when toggle is clicked
      fireEvent.click(toggle);
      expect(menu).toHaveClass('flex');

      // Hide when toggle is clicked again
      fireEvent.click(toggle);
      expect(menu).toHaveClass('hidden');
    });

    it('applies orientation variants correctly', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationMenu orientation="horizontal" data-testid="menu">
            Content
          </NavigationMenu>
        </Navigation>
      );
      expect(screen.getByTestId('menu')).toHaveClass('flex-row');

      rerender(
        <Navigation>
          <NavigationMenu orientation="vertical" data-testid="menu">
            Content
          </NavigationMenu>
        </Navigation>
      );
      expect(screen.getByTestId('menu')).toHaveClass('flex-col');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Navigation>
          <NavigationMenu ref={ref}>
            Content
          </NavigationMenu>
        </Navigation>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('NavigationItem', () => {
    it('renders navigation item', () => {
      render(
        <Navigation>
          <NavigationItem href="/about">About</NavigationItem>
        </Navigation>
      );
      const link = screen.getByText('About');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/about');
    });

    it('applies variant styles correctly', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationItem variant="default" href="/test" data-testid="item">
            Test
          </NavigationItem>
        </Navigation>
      );
      expect(screen.getByTestId('item')).toHaveClass('text-foreground/60');

      rerender(
        <Navigation>
          <NavigationItem variant="ghost" href="/test" data-testid="item">
            Test
          </NavigationItem>
        </Navigation>
      );
      expect(screen.getByTestId('item')).toHaveClass('hover:bg-transparent');
    });

    it('shows active state correctly', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationItem href="/test" active={false} data-testid="item">
            Test
          </NavigationItem>
        </Navigation>
      );
      expect(screen.getByTestId('item')).not.toHaveClass('bg-accent');

      rerender(
        <Navigation>
          <NavigationItem href="/test" active={true} data-testid="item">
            Test
          </NavigationItem>
        </Navigation>
      );
      expect(screen.getByTestId('item')).toHaveClass('bg-accent');
    });

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationItem size="sm" href="/test" data-testid="item">
            Test
          </NavigationItem>
        </Navigation>
      );
      expect(screen.getByTestId('item')).toHaveClass('h-8');

      rerender(
        <Navigation>
          <NavigationItem size="lg" href="/test" data-testid="item">
            Test
          </NavigationItem>
        </Navigation>
      );
      expect(screen.getByTestId('item')).toHaveClass('h-10');
    });

    it('works with asChild prop', () => {
      render(
        <Navigation>
          <NavigationItem asChild>
            <button type="button">Custom Button</button>
          </NavigationItem>
        </Navigation>
      );
      const button = screen.getByText('Custom Button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <Navigation>
          <NavigationItem ref={ref} href="/test">
            Test
          </NavigationItem>
        </Navigation>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('NavigationToggle', () => {
    it('renders toggle button', () => {
      render(
        <Navigation>
          <NavigationToggle />
        </Navigation>
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    it('toggles menu state when clicked', () => {
      render(
        <Navigation>
          <NavigationToggle />
          <NavigationMenu data-testid="menu">
            Menu Content
          </NavigationMenu>
        </Navigation>
      );

      const button = screen.getByRole('button');
      const menu = screen.getByTestId('menu');

      // Initially closed
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(menu).toHaveClass('hidden');

      // Click to open
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(menu).toHaveClass('flex');

      // Click to close
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(menu).toHaveClass('hidden');
    });

    it('calls onToggle when provided', () => {
      const onToggle = vi.fn();
      render(
        <Navigation>
          <NavigationToggle onToggle={onToggle} />
        </Navigation>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('works with controlled state', () => {
      const onToggle = vi.fn();
      render(
        <Navigation>
          <NavigationToggle isOpen={true} onToggle={onToggle} />
        </Navigation>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(button);
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('shows different icons for open/closed states', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationToggle isOpen={false} onToggle={() => {}} />
        </Navigation>
      );

      let svg = screen.getByRole('button').querySelector('svg');
      expect(svg).toBeInTheDocument();

      rerender(
        <Navigation>
          <NavigationToggle isOpen={true} onToggle={() => {}} />
        </Navigation>
      );

      svg = screen.getByRole('button').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies size variants correctly', () => {
      const { rerender } = render(
        <Navigation>
          <NavigationToggle size="sm" data-testid="toggle" />
        </Navigation>
      );
      expect(screen.getByTestId('toggle')).toHaveClass('h-8', 'w-8');

      rerender(
        <Navigation>
          <NavigationToggle size="lg" data-testid="toggle" />
        </Navigation>
      );
      expect(screen.getByTestId('toggle')).toHaveClass('h-10', 'w-10');
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <Navigation>
          <NavigationToggle ref={ref} />
        </Navigation>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('NavigationActions', () => {
    it('renders actions content', () => {
      render(
        <Navigation>
          <NavigationActions>
            <button type="button">Login</button>
            <button type="button">Sign Up</button>
          </NavigationActions>
        </Navigation>
      );
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Navigation>
          <NavigationActions ref={ref}>
            Actions
          </NavigationActions>
        </Navigation>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('applies custom className', () => {
      render(
        <Navigation>
          <NavigationActions className="custom-actions" data-testid="actions">
            Actions
          </NavigationActions>
        </Navigation>
      );
      expect(screen.getByTestId('actions')).toHaveClass('custom-actions');
    });
  });

  describe('CompoundNavigation', () => {
    it('renders complete navigation with all props', () => {
      const items = [
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ];

      render(
        <CompoundNavigation
          brand={{
            text: 'My App',
            href: '/',
          }}
          items={items}
          actions={
            <button type="button">Login</button>
          }
        />
      );

      expect(screen.getByText('My App')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('renders with logo brand', () => {
      render(
        <CompoundNavigation
          brand={{
            logo: <img src="logo.png" alt="Logo" />,
            text: 'My App',
          }}
          items={[]}
        />
      );

      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.getByText('My App')).toBeInTheDocument();
    });

    it('renders without brand when not provided', () => {
      render(
        <CompoundNavigation
          items={[
            { label: 'Home', href: '/' },
          ]}
        />
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('hides toggle when showToggle is false', () => {
      render(
        <CompoundNavigation
          showToggle={false}
          items={[
            { label: 'Home', href: '/' },
          ]}
        />
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders children in menu', () => {
      render(
        <CompoundNavigation items={[]}>
          <span>Custom Menu Item</span>
        </CompoundNavigation>
      );

      expect(screen.getByText('Custom Menu Item')).toBeInTheDocument();
    });

    it('applies containerSpacing correctly', () => {
      render(
        <CompoundNavigation
          containerSpacing="lg"
          items={[]}
          data-testid="nav"
        />
      );

      // Check if the container has the correct spacing class
      const nav = screen.getByTestId('nav');
      const container = nav.querySelector('div');
      expect(container).toHaveClass('gap-6');
    });
  });

  describe('Error Handling', () => {
    it('throws error when NavigationMenu is used outside Navigation context', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<NavigationMenu>Menu</NavigationMenu>);
      }).toThrow('Navigation components must be used within a Navigation');

      consoleSpy.mockRestore();
    });

    it('throws error when NavigationToggle is used outside Navigation context', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<NavigationToggle />);
      }).toThrow('Navigation components must be used within a Navigation');

      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes on toggle', () => {
      render(
        <Navigation>
          <NavigationToggle />
        </Navigation>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Toggle navigation menu');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when toggle state changes', () => {
      render(
        <Navigation>
          <NavigationToggle />
        </Navigation>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders nav element with proper semantics', () => {
      render(
        <Navigation data-testid="nav">
          Content
        </Navigation>
      );

      const nav = screen.getByTestId('nav');
      expect(nav.tagName).toBe('NAV');
    });
  });
});