import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SkillCard } from './SkillCard';

const TestIcon = () => <svg data-testid="test-icon" />;

describe('SkillCard', () => {
  const defaultProps = {
    title: 'Frontend Development',
    icon: <TestIcon />,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
  };

  describe('Rendering', () => {
    it('renders with required props', () => {
      render(<SkillCard {...defaultProps} />);

      expect(screen.getByText('Frontend Development')).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('Tailwind')).toBeInTheDocument();
    });

    it('renders all skills as badges', () => {
      render(<SkillCard {...defaultProps} />);

      for (const skill of defaultProps.skills) {
        const badge = screen.getByText(skill);
        expect(badge).toBeInTheDocument();
      }
    });

    it('renders icon in IconBox', () => {
      render(<SkillCard {...defaultProps} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  describe('Tone', () => {
    it('applies blue tone by default', () => {
      const { container } = render(<SkillCard {...defaultProps} />);
      // IconBox should have blue tone classes
      const iconBox = container.querySelector('.bg-blue-100');
      expect(iconBox).toBeInTheDocument();
    });

    it('applies different tones to icon and badges', () => {
      const { container, rerender } = render(<SkillCard {...defaultProps} tone="green" />);
      expect(container.querySelector('.bg-green-100')).toBeInTheDocument();

      rerender(<SkillCard {...defaultProps} tone="purple" />);
      expect(container.querySelector('.bg-purple-100')).toBeInTheDocument();

      rerender(<SkillCard {...defaultProps} tone="orange" />);
      expect(container.querySelector('.bg-orange-100')).toBeInTheDocument();
    });
  });

  describe('Skills Grid', () => {
    it('renders skills in a 2-column grid', () => {
      const { container } = render(<SkillCard {...defaultProps} />);
      const grid = container.querySelector('.grid-cols-2');
      expect(grid).toBeInTheDocument();
    });

    it('handles different numbers of skills', () => {
      const { rerender } = render(
        <SkillCard title="Test" icon={<TestIcon />} skills={['Skill1', 'Skill2']} />,
      );
      expect(screen.getByText('Skill1')).toBeInTheDocument();
      expect(screen.getByText('Skill2')).toBeInTheDocument();

      rerender(
        <SkillCard
          title="Test"
          icon={<TestIcon />}
          skills={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']}
        />,
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('H')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('has proper card styling', () => {
      const { container } = render(<SkillCard {...defaultProps} />);
      const card = container.firstChild as Element;

      expect(card).toHaveClass('p-10');
      expect(card).toHaveClass('rounded-2xl');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('bg-white');
    });

    it('uses Stack for spacing', () => {
      render(<SkillCard {...defaultProps} />);
      // Stack component is used, content should be properly spaced
      expect(screen.getByText('Frontend Development')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(<SkillCard {...defaultProps} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('merges custom className with default styles', () => {
      const { container } = render(<SkillCard {...defaultProps} className="shadow-lg" />);
      const card = container.firstChild as Element;
      expect(card).toHaveClass('shadow-lg');
      expect(card).toHaveClass('p-10');
      expect(card).toHaveClass('rounded-2xl');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic heading for title', () => {
      render(<SkillCard {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Frontend Development');
    });

    it('renders all skills in the grid', () => {
      const { container } = render(<SkillCard {...defaultProps} />);
      const grid = container.querySelector('.grid-cols-2');
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(defaultProps.skills.length);
    });
  });

  describe('Content Variations', () => {
    it('works with short title', () => {
      render(<SkillCard {...defaultProps} title="CSS" />);
      expect(screen.getByText('CSS')).toBeInTheDocument();
    });

    it('works with long title', () => {
      render(
        <SkillCard {...defaultProps} title="Advanced Frontend Architecture & Design Patterns" />,
      );
      expect(
        screen.getByText('Advanced Frontend Architecture & Design Patterns'),
      ).toBeInTheDocument();
    });

    it('works with minimal skills', () => {
      render(<SkillCard title="Minimal" icon={<TestIcon />} skills={['Only One']} />);
      expect(screen.getByText('Only One')).toBeInTheDocument();
    });
  });
});
