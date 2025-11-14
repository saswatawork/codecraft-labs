#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { createProject } from './commands/create.js';
import { validateProjectName } from './utils/validate.js';
import { TEMPLATES } from './templates/index.js';

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
  .action(async (projectName?: string, options?: any) => {
    console.log(chalk.bold.cyan('\n✨ Welcome to CodeCraft Labs Project Generator\n'));

    let answers: any = {};

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
            return validation.valid || validation.problems![0];
          },
        },
      ]);
      answers.projectName = nameAnswer.projectName;
    } else {
      const validation = validateProjectName(projectName);
      if (!validation.valid) {
        console.error(chalk.red(`\n❌ Invalid project name: ${validation.problems![0]}\n`));
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

    // Get customization options
    const customization = await inquirer.prompt(templateConfig.questions);
    answers = { ...answers, ...customization };

    // Confirm and create
    console.log(chalk.cyan('\n📦 Project Configuration:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.white(`  Name:     ${chalk.bold(answers.projectName)}`));
    console.log(chalk.white(`  Template: ${chalk.bold(answers.template)}`));
    console.log(chalk.white(`  Auth:     ${chalk.bold(answers.authProvider || 'None')}`));
    console.log(chalk.white(`  Theme:    ${chalk.bold(answers.theme || 'Default')}`));
    console.log(chalk.gray('─'.repeat(50) + '\n'));

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
      console.error(chalk.red(`\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`));
      process.exit(1);
    }
  });

program.parse();
