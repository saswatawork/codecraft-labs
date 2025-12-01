import axios, { type AxiosInstance } from 'axios';
import { config, validateConfig } from '../config.js';
import type { BlogPost, PublishResult } from '../types.js';

export class DevToPublisher {
  private client: AxiosInstance;

  constructor() {
    if (!validateConfig('devto')) {
      throw new Error('Dev.to API key not configured. Set DEVTO_API_KEY in .env');
    }

    this.client = axios.create({
      baseURL: config.devto.baseUrl,
      headers: {
        'api-key': config.devto.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  async publish(post: BlogPost, dryRun = false): Promise<PublishResult> {
    try {
      if (dryRun) {
        console.log('[DRY RUN] Would publish to Dev.to:', {
          title: post.title,
          tags: post.tags,
          published: post.published,
        });
        return {
          platform: 'dev.to',
          success: true,
          url: 'https://dev.to/[dry-run]',
        };
      }

      // Check if article already exists
      const existingArticles = await this.getMyArticles();
      const existingArticle = existingArticles.find((article: any) => article.title === post.title);

      const article = {
        article: {
          title: post.title,
          published: post.published ?? false,
          body_markdown: post.content,
          tags: post.tags.slice(0, 4), // Dev.to allows max 4 tags
          description: post.description,
          canonical_url: post.canonicalUrl,
          main_image: post.coverImage,
          series: post.series,
        },
      };

      // Update existing article instead of creating new one
      if (existingArticle) {
        console.log(`📝 Updating existing article (ID: ${existingArticle.id})...`);
        const response = await this.client.put(`/articles/${existingArticle.id}`, article);
        return {
          platform: 'dev.to',
          success: true,
          url: response.data.url,
        };
      }

      // Create new article if it doesn't exist
      console.log('📝 Creating new article...');
      const response = await this.client.post('/articles', article);

      return {
        platform: 'dev.to',
        success: true,
        url: response.data.url,
      };
    } catch (error: any) {
      return {
        platform: 'dev.to',
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  async update(articleId: number, post: BlogPost): Promise<PublishResult> {
    try {
      const article = {
        article: {
          title: post.title,
          published: post.published ?? false,
          body_markdown: post.content,
          tags: post.tags.slice(0, 4),
          description: post.description,
          canonical_url: post.canonicalUrl,
          main_image: post.coverImage,
          series: post.series,
        },
      };

      const response = await this.client.put(`/articles/${articleId}`, article);

      return {
        platform: 'dev.to',
        success: true,
        url: response.data.url,
      };
    } catch (error: any) {
      return {
        platform: 'dev.to',
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  async getMyArticles(): Promise<any[]> {
    try {
      // Get all articles including unpublished drafts
      const response = await this.client.get('/articles/me/all');
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch articles:', error.message);
      return [];
    }
  }
}
