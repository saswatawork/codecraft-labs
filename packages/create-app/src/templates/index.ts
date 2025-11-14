import type { QuestionCollection } from 'inquirer';

export interface TemplateConfig {
  name: string;
  description: string;
  questions: QuestionCollection;
}

export const TEMPLATES: Record<string, TemplateConfig> = {
  portfolio: {
    name: 'Portfolio',
    description: 'Personal or agency portfolio website',
    questions: [
      {
        type: 'input',
        name: 'description',
        message: 'Project description:',
        default: 'My portfolio website built with CodeCraft Labs',
      },
      {
        type: 'list',
        name: 'theme',
        message: 'Choose a theme:',
        choices: [
          { name: '🌓 Auto (System preference)', value: 'auto' },
          { name: '☀️  Light mode', value: 'light' },
          { name: '🌙 Dark mode', value: 'dark' },
          { name: '🎨 Custom (configure later)', value: 'custom' },
        ],
        default: 'auto',
      },
      {
        type: 'checkbox',
        name: 'sections',
        message: 'Select sections to include:',
        choices: [
          { name: '🏠 Hero section', value: 'hero', checked: true },
          { name: '👤 About section', value: 'about', checked: true },
          { name: '💼 Projects/Portfolio', value: 'projects', checked: true },
          { name: '🛠️  Skills section', value: 'skills', checked: true },
          { name: '📝 Blog', value: 'blog', checked: false },
          { name: '💬 Testimonials', value: 'testimonials', checked: false },
          { name: '📧 Contact form', value: 'contact', checked: true },
        ],
        validate: (answer: string[]) => {
          if (answer.length < 1) {
            return 'You must choose at least one section.';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'authProvider',
        message: 'Authentication provider:',
        choices: [
          { name: '🔐 NextAuth.js v5 (Recommended)', value: 'nextauth' },
          { name: '💎 Clerk', value: 'clerk' },
          { name: '🔋 Supabase', value: 'supabase' },
          { name: '❌ None (Skip auth)', value: 'none' },
        ],
        default: 'nextauth',
      },
      {
        type: 'list',
        name: 'cms',
        message: 'Content management:',
        choices: [
          { name: '📄 MDX (Local files)', value: 'mdx' },
          { name: '🌐 Contentful', value: 'contentful' },
          { name: '🎨 Sanity', value: 'sanity' },
          { name: '❌ None', value: 'none' },
        ],
        default: 'mdx',
      },
      {
        type: 'confirm',
        name: 'analytics',
        message: 'Include analytics setup (Vercel Analytics)?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'seo',
        message: 'Include SEO optimization setup?',
        default: true,
      },
    ],
  },
  // Additional templates will be added here
  saas: {
    name: 'SaaS Dashboard',
    description: 'SaaS application with dashboard',
    questions: [],
  },
  ecommerce: {
    name: 'E-commerce',
    description: 'Online store',
    questions: [],
  },
  docs: {
    name: 'Documentation',
    description: 'Documentation site',
    questions: [],
  },
};
