import fs from 'node:fs';
import path from 'node:path';
import matter from 'front-matter';
import type { BlogMetadata, BlogPost } from './types.js';

export function parseBlogPost(filePath: string): { post: BlogPost; metadata: BlogMetadata } {
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(content);

  const metadata = parsed.attributes as BlogMetadata;
  const body = parsed.body;

  const post: BlogPost = {
    title: metadata.title,
    description: metadata.description,
    content: body,
    tags: metadata.tags || [],
    canonicalUrl: metadata.canonicalUrl,
    coverImage: metadata.coverImage,
    published: metadata.published ?? false,
    series: metadata.series,
  };

  return { post, metadata };
}

export function formatResults(results: any[]): void {
  console.log('\n📊 Publishing Results:\n');

  for (const result of results) {
    if (result.success) {
      console.log(`✅ ${result.platform}: ${result.url}`);
    } else {
      console.log(`❌ ${result.platform}: ${result.error}`);
    }
  }

  const successful = results.filter((r) => r.success).length;
  const total = results.length;

  console.log(`\n✨ Published to ${successful}/${total} platforms\n`);
}

export function validateBlogPost(post: BlogPost): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!post.title || post.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!post.description || post.description.trim().length === 0) {
    errors.push('Description is required');
  }

  if (!post.content || post.content.trim().length === 0) {
    errors.push('Content is required');
  }

  if (!post.tags || post.tags.length === 0) {
    errors.push('At least one tag is required');
  }

  if (post.tags && post.tags.length > 5) {
    errors.push('Maximum 5 tags allowed');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function findBlogPosts(directory: string): string[] {
  const files: string[] = [];

  function traverse(dir: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  }

  traverse(directory);
  return files;
}
