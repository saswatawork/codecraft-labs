// Commit message format: type(scope): description
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting, missing semicolons, etc
        'refactor', // Code refactoring
        'test', // Adding tests
        'chore', // Maintenance tasks
        'perf', // Performance improvements
        'ci', // CI/CD changes
        'build', // Build system changes
        'revert', // Revert changes
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'web', // Frontend app
        'api', // Backend app
        'admin', // Admin app
        'ui', // UI package
        'shared', // Shared package
        'config', // Configuration
        'deps', // Dependencies
        'docs', // Documentation
      ],
    ],
  },
};
