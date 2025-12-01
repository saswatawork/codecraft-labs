import axios, { type AxiosInstance } from 'axios';
import { config, validateConfig } from '../config.js';
import type { BlogPost, PublishResult } from '../types.js';

export class MediumPublisher {
  private client: AxiosInstance;
  private authorId: string;

  constructor() {
    if (!validateConfig('medium')) {
      throw new Error(
        'Medium API credentials not configured. Set MEDIUM_API_TOKEN and MEDIUM_AUTHOR_ID in .env',
      );
    }

    this.authorId = config.medium.authorId;
    this.client = axios.create({
      baseURL: config.medium.baseUrl,
      headers: {
        Authorization: `Bearer ${config.medium.apiToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async publish(post: BlogPost, dryRun = false): Promise<PublishResult> {
    try {
      if (dryRun) {
        console.log('[DRY RUN] Would publish to Medium:', {
          title: post.title,
          tags: post.tags,
          published: post.published,
        });
        return {
          platform: 'medium',
          success: true,
          url: 'https://medium.com/@username/[dry-run]',
        };
      }

      // Convert markdown to HTML (Medium accepts HTML)
      const htmlContent = this.markdownToHtml(post.content);

      const article = {
        title: post.title,
        contentFormat: 'html',
        content: htmlContent,
        tags: post.tags.slice(0, 5), // Medium allows max 5 tags
        publishStatus: post.published ? 'public' : 'draft',
        canonicalUrl: post.canonicalUrl,
      };

      const response = await this.client.post(`/users/${this.authorId}/posts`, article);

      return {
        platform: 'medium',
        success: true,
        url: response.data.data.url,
      };
    } catch (error: any) {
      return {
        platform: 'medium',
        success: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      };
    }
  }

  private markdownToHtml(markdown: string): string {
    // Basic markdown to HTML conversion
    // You can use 'marked' library for more sophisticated conversion
    const html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Code blocks
      .replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Line breaks
      .replace(/\n/g, '<br>');

    return html;
  }

  async getUser(): Promise<any> {
    try {
      const response = await this.client.get('/me');
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to fetch user info:', error.message);
      return null;
    }
  }
}
