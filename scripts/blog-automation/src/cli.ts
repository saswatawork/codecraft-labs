#!/usr/bin/env node

import path from 'node:path';
import { Command } from 'commander';
import { DevToPublisher } from './publishers/devto.js';
import { LinkedInPublisher } from './publishers/linkedin.js';
import { MediumPublisher } from './publishers/medium.js';
import { TwitterPublisher } from './publishers/twitter.js';
import type { PublishResult } from './types.js';
import { findBlogPosts, formatResults, parseBlogPost, validateBlogPost } from './utils.js';

const program = new Command();

program
  .name('publish-blog')
  .description('Automate blog publishing to dev.to, Medium, LinkedIn, and X (Twitter)')
  .version('1.0.0');

program
  .command('publish')
  .description('Publish a blog post to specified platforms')
  .argument('<file>', 'Path to markdown file')
  .option(
    '-p, --platforms <platforms>',
    'Comma-separated platforms (devto,medium,linkedin,twitter)',
    'devto,medium,linkedin',
  )
  .option('-d, --dry-run', 'Simulate publishing without actual API calls', false)
  .option('-t, --thread', 'Publish as Twitter thread', false)
  .option('-v, --verbose', 'Show detailed output', false)
  .action(async (file: string, options) => {
    try {
      const filePath = path.resolve(process.cwd(), file);
      const { post, metadata } = parseBlogPost(filePath);

      // Validate post
      const validation = validateBlogPost(post);
      if (!validation.valid) {
        console.error('❌ Blog post validation failed:');
        for (const error of validation.errors) {
          console.error(`  - ${error}`);
        }
        process.exit(1);
      }

      if (options.verbose) {
        console.log('📝 Blog Post Details:');
        console.log(`  Title: ${post.title}`);
        console.log(`  Tags: ${post.tags.join(', ')}`);
        console.log(`  Published: ${post.published}`);
        console.log('');
      }

      const platforms = options.platforms.split(',').map((p: string) => p.trim());
      const results: PublishResult[] = [];

      // Publish to each platform
      for (const platform of platforms) {
        // Check if platform is disabled in metadata
        if (metadata[platform]?.published === false) {
          console.log(`⏭️  Skipping ${platform} (disabled in frontmatter)`);
          continue;
        }

        try {
          switch (platform) {
            case 'devto': {
              const publisher = new DevToPublisher();
              const result = await publisher.publish(post, options.dryRun);
              results.push(result);
              break;
            }

            case 'medium': {
              const publisher = new MediumPublisher();
              const result = await publisher.publish(post, options.dryRun);
              results.push(result);
              break;
            }

            case 'linkedin': {
              const publisher = new LinkedInPublisher();
              const result = await publisher.publish(post, options.dryRun);
              results.push(result);
              break;
            }

            case 'twitter': {
              const publisher = new TwitterPublisher();
              const result = await publisher.publish(post, options.thread, options.dryRun);
              results.push(result);
              break;
            }

            default:
              console.warn(`⚠️  Unknown platform: ${platform}`);
          }
        } catch (error: any) {
          results.push({
            platform,
            success: false,
            error: error.message,
          });
        }
      }

      formatResults(results);
    } catch (error: any) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all blog posts in a directory')
  .argument('[directory]', 'Directory to search', './blog-posts')
  .action((directory: string) => {
    try {
      const dir = path.resolve(process.cwd(), directory);
      const files = findBlogPosts(dir);

      if (files.length === 0) {
        console.log(`No blog posts found in ${dir}`);
        return;
      }

      console.log(`\n📚 Found ${files.length} blog post(s):\n`);

      files.forEach((file, index) => {
        const { post } = parseBlogPost(file);
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   ${path.relative(process.cwd(), file)}`);
        console.log(`   Tags: ${post.tags.join(', ')}`);
        console.log('');
      });
    } catch (error: any) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('test')
  .description('Test API connections for all platforms')
  .action(async () => {
    console.log('🔌 Testing API connections...\n');

    const tests = [
      {
        name: 'Dev.to',
        test: async () => {
          const publisher = new DevToPublisher();
          const articles = await publisher.getMyArticles();
          return `✅ Connected (${articles.length} articles found)`;
        },
      },
      {
        name: 'Medium',
        test: async () => {
          const publisher = new MediumPublisher();
          const user = await publisher.getUser();
          return user ? `✅ Connected (${user.username})` : '❌ Failed';
        },
      },
      {
        name: 'LinkedIn',
        test: async () => {
          // LinkedIn doesn't have a simple test endpoint
          return '⚠️  No test endpoint available';
        },
      },
      {
        name: 'Twitter',
        test: async () => {
          // Twitter v2 API doesn't have a simple test endpoint without user context
          return '⚠️  No test endpoint available';
        },
      },
    ];

    for (const { name, test } of tests) {
      try {
        const result = await test();
        console.log(`${name}: ${result}`);
      } catch (error: any) {
        console.log(`${name}: ❌ ${error.message}`);
      }
    }

    console.log('');
  });

program.parse();
