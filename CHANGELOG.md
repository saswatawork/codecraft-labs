# Changelog

All notable changes to CodeCraft Labs will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive CI/CD workflow with GitHub Actions
- Security headers configuration for Next.js applications
- Performance monitoring utilities
- Accessibility utilities for better WCAG compliance
- Form validation utilities
- Error handling utilities
- Contributing guidelines (CONTRIBUTING.md)
- Security policy (SECURITY.md)
- Environment variables template (.env.example)
- Enhanced test coverage configuration

### Changed
- Improved TypeScript type safety across create-app package
- Enhanced Next.js configuration with security headers and optimizations
- Updated component exports for better tree-shaking
- Improved error boundary patterns

### Fixed
- Type safety issues in Handlebars helpers
- Component export inconsistencies
- Missing accessibility features

## [1.0.0] - 2024-11-17

### Added
- Initial monorepo structure with Turborepo
- Portfolio application with Next.js 15
- UI component library with Storybook
- Create-app CLI tool for project scaffolding
- Comprehensive testing setup with Vitest
- TypeScript configurations
- Biome for linting and formatting
- MDX support for content management

### Components
- Button component with multiple variants
- Input component with validation states
- Badge component
- Card component
- Avatar component with group support
- Dialog/Modal component
- Navigation component
- Container component
- SectionHeading component
- Stat component
- ProjectCard component

### Features
- Full TypeScript support with strict mode
- Tailwind CSS v4 integration
- Radix UI primitives
- Responsive design patterns
- Dark mode support
- Accessibility features (WCAG AA compliance)
- Component testing with React Testing Library
- Storybook documentation

### Developer Experience
- Hot module replacement
- Fast builds with Turbo
- Automated linting and formatting
- Commit linting with Commitlint
- Git hooks with Husky
- Changesets for version management

## [0.1.0] - 2024-10-01

### Added
- Project initialization
- Basic monorepo structure
- Development environment setup

---

## Release Process

1. Create a feature branch
2. Make changes and commit using conventional commits
3. Run `pnpm changeset` to document changes
4. Create a pull request
5. After merge, run `pnpm version-packages` to bump versions
6. Run `pnpm release` to publish packages

## Types of Changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes

[Unreleased]: https://github.com/saswatawork/codecraft-labs/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/saswatawork/codecraft-labs/releases/tag/v1.0.0
[0.1.0]: https://github.com/saswatawork/codecraft-labs/releases/tag/v0.1.0
