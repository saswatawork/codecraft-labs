# Contributing to CodeCraft Labs

Thank you for your interest in contributing to CodeCraft Labs! This document provides guidelines and best practices for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** and clone your fork
2. **Install dependencies**: `pnpm install`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes** following our coding standards
5. **Test your changes**: `pnpm test`
6. **Commit your changes** following our commit guidelines
7. **Push to your fork** and submit a pull request

## Development Workflow

### Running the Project

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint

# Format code
pnpm format
```

### Project Structure

- `/apps/*` - Application projects (portfolio, web, etc.)
- `/packages/*` - Shared packages (ui, shared, config, etc.)
- `/tools/*` - Development tools and configurations

## Coding Standards

### TypeScript

- Use **strict mode** TypeScript
- Avoid `any` types - use `unknown` or proper types
- Prefer interfaces over types for objects
- Use proper JSDoc comments for public APIs

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}

// ❌ Avoid
type ButtonProps = {
  variant: any;
  disabled: boolean | undefined;
};
```

### React Components

- Use **functional components** with hooks
- Implement **proper prop types** with TypeScript
- Add **JSDoc comments** for complex components
- Follow **composition over configuration** pattern
- Use **React.forwardRef** for components that need ref support

```typescript
/**
 * Button component for user interactions
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant }))} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Styling

- Use **Tailwind CSS** for styling
- Utilize the `cn()` utility for conditional classes
- Follow the **mobile-first** approach
- Use **CSS variables** for theming

### Accessibility

- Include proper **ARIA attributes**
- Ensure **keyboard navigation** works
- Test with **screen readers**
- Maintain **color contrast ratios** (WCAG AA minimum)

```typescript
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onKeyDown={handleKeyDown}
>
  {children}
</button>
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI/CD changes

### Examples

```bash
feat(ui): add new Button variant
fix(portfolio): resolve navigation menu overflow
docs(readme): update installation instructions
refactor(ui): simplify Dialog component logic
test(ui): add tests for Input component
```

### Scope Guidelines

- `ui` - UI package changes
- `portfolio` - Portfolio app changes
- `web` - Web app changes
- `config` - Configuration changes
- `deps` - Dependency updates

## Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**: `pnpm test`
4. **Run linting**: `pnpm lint`
5. **Update the changelog** if applicable
6. **Request review** from maintainers

### PR Title Format

Follow the same format as commit messages:

```
feat(ui): add new Dialog component
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots or GIFs

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added and passing
```

## Testing

### Unit Tests

- Write tests for all **new components**
- Aim for **80%+ code coverage**
- Use **React Testing Library** best practices
- Test **user interactions**, not implementation details

```typescript
describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

Test component interactions and state management.

### Accessibility Tests

Ensure components meet accessibility standards:

```typescript
it('has proper ARIA attributes', () => {
  render(<Dialog open={true}>Content</Dialog>);
  
  expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
});
```

## Documentation

- Update **README.md** for significant changes
- Add **JSDoc comments** for public APIs
- Update **Storybook stories** for UI components
- Add **examples** for complex features

## Questions?

If you have questions or need help:

1. Check existing **GitHub Issues**
2. Review the **documentation**
3. Ask in **GitHub Discussions**
4. Contact the maintainers

Thank you for contributing to CodeCraft Labs! 🚀
