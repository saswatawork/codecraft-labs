import validateNpmPackageName from 'validate-npm-package-name';

export function validateProjectName(name: string): {
  valid: boolean;
  problems?: string[];
} {
  const validation = validateNpmPackageName(name);

  if (!validation.validForNewPackages) {
    return {
      valid: false,
      problems: [...(validation.errors || []), ...(validation.warnings || [])],
    };
  }

  return { valid: true };
}
