import axios, { type AxiosInstance } from 'axios';
import { config, validateConfig } from '../config.js';
import type { BlogPost, PublishResult } from '../types.js';

export class LinkedInPublisher {
  private client: AxiosInstance;
  private personUrn: string;

  constructor() {
    if (!validateConfig('linkedin')) {
      throw new Error(
        'LinkedIn API credentials not configured. Set LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_URN in .env',
      );
    }

    this.personUrn = config.linkedin.personUrn;
    this.client = axios.create({
      baseURL: config.linkedin.baseUrl,
      headers: {
        Authorization: `Bearer ${config.linkedin.accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
    });
  }

  async publish(post: BlogPost, dryRun = false): Promise<PublishResult> {
    try {
      if (dryRun) {
        console.log('[DRY RUN] Would publish to LinkedIn:', {
          title: post.title,
          excerpt: post.description,
        });
        return {
          platform: 'linkedin',
          success: true,
          url: 'https://linkedin.com/feed/update/[dry-run]',
        };
      }

      // Create article post
      const article = {
        author: this.personUrn,
        lifecycleState: post.published ? 'PUBLISHED' : 'DRAFT',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: this.formatLinkedInPost(post),
            },
            shareMediaCategory: 'ARTICLE',
            media: [
              {
                status: 'READY',
                description: {
                  text: post.description,
                },
                originalUrl: post.canonicalUrl || '',
                title: {
                  text: post.title,
                },
                ...(post.coverImage && {
                  thumbnails: [
                    {
                      url: post.coverImage,
                    },
                  ],
                }),
              },
            ],
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      const response = await this.client.post('/ugcPosts', article);

      return {
        platform: 'linkedin',
        success: true,
        url: `https://linkedin.com/feed/update/${response.data.id}`,
      };
    } catch (error: any) {
      return {
        platform: 'linkedin',
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  private formatLinkedInPost(post: BlogPost): string {
    // Format post with emojis and structure for LinkedIn
    const tags = post.tags.map((tag) => `#${tag.replace(/\s+/g, '')}`).join(' ');

    return `📝 ${post.title}

${post.description}

${tags}

Read more: ${post.canonicalUrl || '[Link will be added]'}`;
  }

  async publishTextPost(content: string, dryRun = false): Promise<PublishResult> {
    try {
      if (dryRun) {
        console.log('[DRY RUN] Would publish text post to LinkedIn:', content.substring(0, 100));
        return {
          platform: 'linkedin',
          success: true,
          url: 'https://linkedin.com/feed/update/[dry-run]',
        };
      }

      const post = {
        author: this.personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      const response = await this.client.post('/ugcPosts', post);

      return {
        platform: 'linkedin',
        success: true,
        url: `https://linkedin.com/feed/update/${response.data.id}`,
      };
    } catch (error: any) {
      return {
        platform: 'linkedin',
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }
}
