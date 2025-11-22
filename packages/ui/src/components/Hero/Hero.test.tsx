import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroRoot as Hero } from './Hero';

describe('Hero', () => {
  describe('Hero Root', () => {
    it('renders children correctly', () => {
      render(<Hero>Test Content</Hero>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders as section element by default', () => {
      const { container } = render(<Hero>Content</Hero>);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is provided', () => {
      const { container } = render(<Hero as="div">Content</Hero>);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Hero className="custom-class">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('custom-class');
    });

    it('applies default variant', () => {
      const { container } = render(<Hero>Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('bg-white');
    });

    it('applies gradient variant', () => {
      const { container } = render(<Hero variant="gradient">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('bg-gradient-to-br');
    });

    it('applies gradient-bold variant', () => {
      const { container } = render(<Hero variant="gradient-bold">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('bg-gradient-to-r', 'text-white');
    });

    it('applies dark variant', () => {
      const { container } = render(<Hero variant="dark">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('bg-gray-900', 'text-white');
    });

    it('applies light variant', () => {
      const { container } = render(<Hero variant="light">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('bg-gray-50');
    });

    it('applies center align by default', () => {
      const { container } = render(<Hero>Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('text-center');
    });

    it('applies left align', () => {
      const { container } = render(<Hero align="left">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('text-left');
    });

    it('applies right align', () => {
      const { container } = render(<Hero align="right">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('text-right');
    });

    it('applies default spacing (lg)', () => {
      const { container } = render(<Hero>Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('py-20', 'md:py-24');
    });

    it('applies sm spacing', () => {
      const { container } = render(<Hero spacing="sm">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('py-12', 'md:py-16');
    });

    it('applies xl spacing', () => {
      const { container } = render(<Hero spacing="xl">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveClass('py-24', 'md:py-28');
    });
  });

  describe('Hero.Badge', () => {
    it('renders badge content', () => {
      render(<Hero.Badge>New Feature</Hero.Badge>);
      expect(screen.getByText('New Feature')).toBeInTheDocument();
    });

    it('applies badge styling', () => {
      const { container } = render(<Hero.Badge>Badge</Hero.Badge>);
      const badge = container.firstChild;
      expect(badge).toHaveClass('inline-block', 'bg-blue-100', 'text-blue-800');
    });

    it('accepts custom className', () => {
      const { container } = render(<Hero.Badge className="custom">Badge</Hero.Badge>);
      const badge = container.firstChild;
      expect(badge).toHaveClass('custom');
    });
  });

  describe('Hero.Title', () => {
    it('renders title content', () => {
      render(<Hero.Title>Main Title</Hero.Title>);
      expect(screen.getByText('Main Title')).toBeInTheDocument();
    });

    it('renders as h1 by default', () => {
      const { container } = render(<Hero.Title>Title</Hero.Title>);
      expect(container.querySelector('h1')).toBeInTheDocument();
    });

    it('renders as h2 when level is 2', () => {
      const { container } = render(<Hero.Title level={2}>Title</Hero.Title>);
      expect(container.querySelector('h2')).toBeInTheDocument();
    });

    it('renders as h3 when level is 3', () => {
      const { container } = render(<Hero.Title level={3}>Title</Hero.Title>);
      expect(container.querySelector('h3')).toBeInTheDocument();
    });

    it('applies title styling', () => {
      const { container } = render(<Hero.Title>Title</Hero.Title>);
      const title = container.querySelector('h1');
      expect(title).toHaveClass('font-black', 'text-gray-900');
    });

    it('accepts custom className', () => {
      const { container } = render(<Hero.Title className="custom">Title</Hero.Title>);
      const title = container.querySelector('h1');
      expect(title).toHaveClass('custom');
    });
  });

  describe('Hero.Description', () => {
    it('renders description content', () => {
      render(<Hero.Description>Description text</Hero.Description>);
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('applies description styling', () => {
      const { container } = render(<Hero.Description>Text</Hero.Description>);
      const description = container.firstChild;
      expect(description).toHaveClass('text-gray-600', 'leading-relaxed');
    });

    it('accepts custom className', () => {
      const { container } = render(<Hero.Description className="custom">Text</Hero.Description>);
      const description = container.firstChild;
      expect(description).toHaveClass('custom');
    });
  });

  describe('Hero.Actions', () => {
    it('renders action buttons', () => {
      render(
        <Hero.Actions>
          <button type="button">Action 1</button>
          <button type="button">Action 2</button>
        </Hero.Actions>,
      );
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
    });

    it('applies actions styling', () => {
      const { container } = render(<Hero.Actions>Actions</Hero.Actions>);
      const actions = container.firstChild;
      expect(actions).toHaveClass('flex', 'gap-3', 'justify-center');
    });

    it('accepts custom className', () => {
      const { container } = render(<Hero.Actions className="custom">Actions</Hero.Actions>);
      const actions = container.firstChild;
      expect(actions).toHaveClass('custom');
    });
  });

  describe('Hero.Content', () => {
    it('renders content wrapper', () => {
      render(<Hero.Content>Content</Hero.Content>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies content styling', () => {
      const { container } = render(<Hero.Content>Content</Hero.Content>);
      const content = container.firstChild;
      expect(content).toHaveClass('max-w-4xl', 'mx-auto', 'space-y-6');
    });

    it('accepts custom className', () => {
      const { container } = render(<Hero.Content className="custom">Content</Hero.Content>);
      const content = container.firstChild;
      expect(content).toHaveClass('custom');
    });
  });

  describe('Hero.Stats', () => {
    it('renders stats grid', () => {
      render(
        <Hero.Stats>
          <div>Stat 1</div>
          <div>Stat 2</div>
        </Hero.Stats>,
      );
      expect(screen.getByText('Stat 1')).toBeInTheDocument();
      expect(screen.getByText('Stat 2')).toBeInTheDocument();
    });

    it('applies stats grid styling', () => {
      const { container } = render(<Hero.Stats>Stats</Hero.Stats>);
      const stats = container.firstChild;
      expect(stats).toHaveClass('grid', 'grid-cols-2', 'md:grid-cols-4');
    });

    it('accepts custom className', () => {
      const { container } = render(<Hero.Stats className="custom">Stats</Hero.Stats>);
      const stats = container.firstChild;
      expect(stats).toHaveClass('custom');
    });
  });

  describe('Composition', () => {
    it('renders complete hero with all subcomponents', () => {
      render(
        <Hero>
          <Hero.Content>
            <Hero.Badge>Badge</Hero.Badge>
            <Hero.Title>Title</Hero.Title>
            <Hero.Description>Description</Hero.Description>
            <Hero.Actions>
              <button type="button">Action</button>
            </Hero.Actions>
          </Hero.Content>
          <Hero.Stats>
            <div>Stat</div>
          </Hero.Stats>
        </Hero>,
      );

      expect(screen.getByText('Badge')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Stat')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('accepts aria attributes', () => {
      const { container } = render(<Hero aria-label="Hero section">Content</Hero>);
      const hero = container.querySelector('section');
      expect(hero).toHaveAttribute('aria-label', 'Hero section');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Hero ref={ref as any}>Content</Hero>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});
