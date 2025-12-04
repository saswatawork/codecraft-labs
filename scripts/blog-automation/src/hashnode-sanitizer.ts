import type { BlogPost } from './types.js';

/**
 * Sanitizes blog content for Hashnode
 * Ensures HTML tags are properly escaped with backticks (excluding code blocks)
 */
export function sanitizeForHashnode(content: string): string {
  const lines = content.split('\n');
  const sanitizedLines: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    // Track code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      sanitizedLines.push(line);
      continue;
    }

    // Don't modify lines inside code blocks
    if (inCodeBlock) {
      sanitizedLines.push(line);
      continue;
    }

    // Escape HTML tags that are NOT already in backticks
    // Pattern: <word> that is not preceded by ` and not followed by `
    const htmlTagPattern = /(?<!`)(<[a-z][a-z0-9]*>)(?!`)/gi;
    const sanitizedLine = line.replace(htmlTagPattern, '`$1`');

    sanitizedLines.push(sanitizedLine);
  }

  return sanitizedLines.join('\n');
}

/**
 * Validates blog post content before publishing to Hashnode
 */
export function validateHashnodeContent(post: BlogPost): {
  valid: boolean;
  warnings: string[];
  sanitizedContent: string;
} {
  const warnings: string[] = [];

  // Check for unescaped HTML tags (outside of code blocks)
  const lines = post.content.split('\n');
  let inCodeBlock = false;
  let hasUnescapedHTML = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // Track code blocks
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    // Skip lines inside code blocks
    if (inCodeBlock) continue;

    // Check for unescaped HTML tags (not in backticks)
    const unescapedPattern = /(?<!`)<[a-z][a-z0-9]*>(?!`)/gi;
    const matches = line.match(unescapedPattern);

    if (matches) {
      hasUnescapedHTML = true;
      warnings.push(`Line ${i + 1}: Found unescaped HTML: ${matches.join(', ')}`);
    }
  }

  // Sanitize the content
  const sanitizedContent = sanitizeForHashnode(post.content);

  if (hasUnescapedHTML) {
    warnings.push('⚠️  Auto-sanitized HTML tags by adding backticks');
  }

  return {
    valid: true, // Always valid after sanitization
    warnings,
    sanitizedContent,
  };
}
