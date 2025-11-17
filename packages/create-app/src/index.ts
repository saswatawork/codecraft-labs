#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import { createProject } from './commands/create.js';
import { TEMPLATES } from './templates/index.js';
import { validateProjectName } from './utils/validate.js';

const program = new Command();

program
  .name('create-ccl-app')
  .description('Create a new CodeCraft Labs project from templates')
  .version('1.0.0');

program
  .argument('[project-name]', 'Name of the project')
  .option('-t, --template <template>', 'Template to use (portfolio, saas, ecommerce, docs)')
  .option('--no-install', 'Skip dependency installation')
  .option('--no-git', 'Skip git initialization')
  // Non-interactive / advanced configuration flags
  .option('--description <description>', 'Project description')
  .option('--theme <theme>', 'Theme mode (auto|light|dark|custom)')
  .option('--sections <sections>', 'Comma separated list of sections')
  .option('--auth <provider>', 'Auth provider (nextauth|clerk|supabase|none)')
  .option('--cms <cms>', 'CMS option (mdx|contentful|sanity|none)')
  .option('--analytics', 'Enable analytics')
  .option('--no-analytics', 'Disable analytics')
  .option('--seo', 'Enable SEO setup')
  .option('--no-seo', 'Disable SEO setup')
  .option('--user-name <name>', 'Your display name for portfolio')
  .option('--github <username>', 'GitHub username')
  .option('--linkedin <slug>', 'LinkedIn profile slug')
  .option('--email <address>', 'Public contact email address')
  .option('--tagline <tagline>', 'Hero subtitle / tagline text')
  .action(async (projectName?: string, options?: Record<string, unknown>) => {
    console.log(chalk.bold.cyan('\n✨ Welcome to CodeCraft Labs Project Generator\n'));

    interface ProjectAnswers {
      projectName: string;
      template: string;
      authProvider?: string;
      cms?: string;
      theme?: string;
      analytics?: boolean;
      seo?: boolean;
      install?: boolean;
      git?: boolean;
      confirm?: boolean;
    }

    let answers: Partial<ProjectAnswers> = {};

    // Get project name
    if (!projectName) {
      const nameAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: 'my-ccl-project',
          validate: (input: string) => {
            const validation = validateProjectName(input);
            return validation.valid || validation.problems?.[0];
          },
        },
      ]);
      answers.projectName = nameAnswer.projectName;
    } else {
      const validation = validateProjectName(projectName);
      if (!validation.valid) {
        console.error(chalk.red(`\n❌ Invalid project name: ${validation.problems?.[0]}\n`));
        process.exit(1);
      }
      answers.projectName = projectName;
    }

    // Get template choice
    if (!options?.template) {
      const templateAnswer = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Select a template:',
          choices: [
            {
              name: '📱 Portfolio - Personal/Agency portfolio site',
              value: 'portfolio',
            },
            {
              name: '💼 SaaS Dashboard - Project management app',
              value: 'saas',
              disabled: '(Coming soon)',
            },
            {
              name: '🛍️  E-commerce - Online store',
              value: 'ecommerce',
              disabled: '(Coming soon)',
            },
            {
              name: '📚 Documentation - Component docs site',
              value: 'docs',
              disabled: '(Coming soon)',
            },
          ],
        },
      ]);
      answers.template = templateAnswer.template;
    } else {
      answers.template = options.template;
    }

    // Template-specific configuration
    const templateConfig = TEMPLATES[answers.template as keyof typeof TEMPLATES];

    if (!templateConfig) {
      console.error(chalk.red(`\n❌ Template "${answers.template}" not found\n`));
      process.exit(1);
    }

    // Determine if we can skip interactive questions (all provided via flags)
    const hasNonInteractiveFlags =
      options?.theme ||
      options?.sections ||
      options?.auth ||
      options?.cms ||
      typeof options?.analytics !== 'undefined' ||
      typeof options?.seo !== 'undefined' ||
      options?.description ||
      options?.userName ||
      options?.github ||
      options?.linkedin ||
      options?.email ||
      options?.tagline;

    if (answers.template === 'portfolio' && hasNonInteractiveFlags) {
      // Parse sections
      const sections = (
        options.sections
          ? String(options.sections)
              .split(',')
              .map((s: string) => s.trim())
              .filter(Boolean)
          : []
      ) as string[];

      answers = {
        ...answers,
        description: options.description || 'My portfolio website built with CodeCraft Labs',
        theme: options.theme || 'auto',
        sections: sections.length ? sections : ['hero', 'about', 'projects', 'skills', 'contact'],
        authProvider: options.auth || 'none',
        cms: options.cms || 'mdx',
        analytics: typeof options.analytics !== 'undefined',
        seo: typeof options.seo !== 'undefined',
        userName: options.userName || 'Your Name',
        githubUsername: options.github || 'yourusername',
        linkedinUsername: options.linkedin || 'yourusername',
        emailAddress: options.email || 'your.email@example.com',
        tagline:
          options.tagline ||
          'A passionate developer creating beautiful and functional web experiences',
      };
    } else {
      // Interactive mode (original behavior)
      const customization = await inquirer.prompt(templateConfig.questions);
      answers = { ...answers, ...customization };
      // Derive optional defaults
      answers.userName = 'Your Name';
      answers.githubUsername = 'yourusername';
      answers.linkedinUsername = 'yourusername';
      answers.emailAddress = 'your.email@example.com';
      answers.tagline = 'A passionate developer creating beautiful and functional web experiences';
    }

    // Confirm and create
    console.log(chalk.cyan('\n📦 Project Configuration:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.white(`  Name:     ${chalk.bold(answers.projectName)}`));
    console.log(chalk.white(`  Template: ${chalk.bold(answers.template)}`));
    console.log(chalk.white(`  Auth:     ${chalk.bold(answers.authProvider || 'None')}`));
    console.log(chalk.white(`  Theme:    ${chalk.bold(answers.theme || 'Default')}`));
    if (answers.sections) {
      console.log(
        chalk.white(
          `  Sections: ${chalk.bold(Array.isArray(answers.sections) ? answers.sections.join(', ') : answers.sections)}`,
        ),
      );
    }
    if (answers.cms) {
      console.log(chalk.white(`  CMS:      ${chalk.bold(answers.cms)}`));
    }
    console.log(
      chalk.white(`  Analytics:${chalk.bold(answers.analytics ? 'Enabled' : 'Disabled')}`),
    );
    console.log(chalk.white(`  SEO:      ${chalk.bold(answers.seo ? 'Enabled' : 'Disabled')}`));
    console.log(chalk.gray(`${'─'.repeat(50)}\n`));

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Proceed with project creation?',
        default: true,
      },
    ]);

    if (!confirm) {
      console.log(chalk.yellow('\n⚠️  Project creation cancelled\n'));
      process.exit(0);
    }

    // Create the project
    const spinner = ora('Creating project...').start();

    try {
      await createProject({
        projectName: answers.projectName,
        template: answers.template,
        options: {
          ...answers,
          install: options?.install !== false,
          git: options?.git !== false,
        },
      });

      spinner.succeed(chalk.green('Project created successfully!'));

      // Success message
      console.log(chalk.green.bold('\n✅ All done!\n'));
      console.log(chalk.white('Get started with:\n'));
      console.log(chalk.cyan(`  cd ${answers.projectName}`));
      console.log(chalk.cyan('  pnpm dev\n'));
      console.log(chalk.gray('Happy coding! 🚀\n'));
    } catch (error) {
      spinner.fail(chalk.red('Project creation failed'));
      console.error(
        chalk.red(`\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`),
      );
      process.exit(1);
    }
  });

program.parse();
