import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import Handlebars from 'handlebars';
import ora from 'ora';
import '../utils/handlebars-helpers.js';

export interface TemplateOptions {
  install: boolean;
  git: boolean;
  authProvider?: string;
  cms?: string;
  theme?: string;
  seo?: boolean;
  analytics?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface CreateProjectOptions {
  projectName: string;
  template: string;
  options: TemplateOptions;
}

export async function createProject({
  projectName,
  template,
  options,
}: CreateProjectOptions): Promise<void> {
  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (await fs.pathExists(targetDir)) {
    throw new Error(`Directory "${projectName}" already exists`);
  }

  // Create project directory
  await fs.ensureDir(targetDir);

  // Resolve template directory relative to this file (dist/commands/create.js -> ../templates)
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templateDir = path.join(__dirname, '../templates', template);

  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template "${template}" not found at path: ${templateDir}`);
  }

  // Copy template files
  await copyTemplate(templateDir, targetDir, {
    projectName,
    ...options,
  });

  // Initialize git
  if (options.git) {
    const gitSpinner = ora('Initializing git repository...').start();
    try {
      await execa('git', ['init'], { cwd: targetDir });
      await execa('git', ['add', '-A'], { cwd: targetDir });
      await execa('git', ['commit', '-m', 'Initial commit from create-ccl-app'], {
        cwd: targetDir,
      });
      gitSpinner.succeed('Git repository initialized');
    } catch (error) {
      gitSpinner.warn('Git initialization failed (skipping)');
    }
  }

  // Install dependencies
  if (options.install) {
    const installSpinner = ora('Installing dependencies...').start();
    try {
      await execa('pnpm', ['install'], { cwd: targetDir });
      installSpinner.succeed('Dependencies installed');
    } catch (error) {
      installSpinner.fail('Dependency installation failed');
      console.log(chalk.yellow('\n⚠️  You can install dependencies manually with: pnpm install\n'));
    }
  }
}

async function copyTemplate(
  templateDir: string,
  targetDir: string,
  data: Record<string, string | boolean | string[] | undefined>,
): Promise<void> {
  const files = await fs.readdir(templateDir, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = path.join(templateDir, file.name);
    const targetPath = path.join(targetDir, file.name);

    if (file.isDirectory()) {
      await fs.ensureDir(targetPath);
      await copyTemplate(sourcePath, targetPath, data);
    } else {
      // Check if file is a template (ends with .hbs)
      if (file.name.endsWith('.hbs')) {
        const content = await fs.readFile(sourcePath, 'utf-8');
        const template = Handlebars.compile(content);
        const rendered = template(data);
        const finalPath = targetPath.replace(/\.hbs$/, '');
        await fs.writeFile(finalPath, rendered, 'utf-8');
      } else {
        await fs.copy(sourcePath, targetPath);
      }
    }
  }
}
