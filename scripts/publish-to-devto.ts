#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';

interface DevToArticle {
  title: string;
  body_markdown: string;
  published: boolean;
  tags?: string[];
  series?: string;
  canonical_url?: string;
}

async function publishToDevTo(filePath: string) {
  const apiKey = process.env.DEV_TO_API_KEY;

  if (!apiKey) {
    console.error('❌ DEV_TO_API_KEY not found in environment variables');
    console.log('📝 To get your API key:');
    console.log('   1. Go to https://dev.to/settings/extensions');
    console.log('   2. Generate a new API key');
    console.log('   3. Add to .env: DEV_TO_API_KEY=your_key_here');
    process.exit(1);
  }

  // Read the markdown file
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    console.error('❌ Invalid markdown file format. Frontmatter not found.');
    process.exit(1);
  }

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  // Parse frontmatter
  const title = frontmatter.match(/title:\s*"(.+)"/)?.[1] || '';
  const tagsMatch = frontmatter.match(/tags:\s*\n((?:\s*-\s*.+\n?)+)/);
  const tags = tagsMatch
    ? tagsMatch[1]
        .split('\n')
        .map((t) => t.trim().replace(/^-\s*/, ''))
        .filter(Boolean)
    : [];
  const series = frontmatter.match(/series:\s*"(.+)"/)?.[1];
  const published = frontmatter.match(/published:\s*(true|false)/)?.[1] === 'true';

  // Prepare article data
  const article: DevToArticle = {
    title,
    body_markdown: body.trim(),
    published,
    tags: tags.slice(0, 4), // dev.to allows max 4 tags
  };

  if (series) {
    article.series = series;
  }

  console.log('\n📝 Publishing article to dev.to...');
  console.log(`   Title: ${title}`);
  console.log(`   Tags: ${tags.join(', ')}`);
  console.log(`   Series: ${series || 'None'}`);
  console.log(`   Published: ${published}`);

  try {
    const response = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({ article }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Failed to publish:', error);
      process.exit(1);
    }

    const result = await response.json();
    console.log('\n✅ Successfully published!');
    console.log(`   URL: ${result.url}`);
    console.log(`   ID: ${result.id}`);
  } catch (error) {
    console.error('❌ Error publishing to dev.to:', error);
    process.exit(1);
  }
}

// Get file path from command line argument
const filePath = process.argv[2];

if (!filePath) {
  console.error('❌ Please provide a file path');
  console.log('Usage: tsx scripts/publish-to-devto.ts <path-to-markdown-file>');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`❌ File not found: ${filePath}`);
  process.exit(1);
}

publishToDevTo(filePath);
