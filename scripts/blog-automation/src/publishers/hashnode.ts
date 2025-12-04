import axios, { type AxiosInstance } from 'axios';
import { config, validateConfig } from '../config.js';
import { validateHashnodeContent } from '../hashnode-sanitizer.js';
import type { BlogPost, PublishResult } from '../types.js';

export class HashnodePublisher {
  private client: AxiosInstance;

  constructor() {
    if (!validateConfig('hashnode')) {
      throw new Error('Hashnode API key not configured. Set HASHNODE_API_KEY in .env');
    }

    this.client = axios.create({
      baseURL: 'https://gql.hashnode.com',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.hashnode.apiKey,
      },
    });
  }

  async publish(post: BlogPost, dryRun = false): Promise<PublishResult> {
    try {
      // Sanitize content for Hashnode (escape HTML tags)
      const validation = validateHashnodeContent(post);
      if (validation.warnings.length > 0) {
        console.log('⚠️  Hashnode content sanitization:');
        for (const warning of validation.warnings) {
          console.log(`   ${warning}`);
        }
      }

      // Use sanitized content
      const sanitizedPost = { ...post, content: validation.sanitizedContent };

      if (dryRun) {
        console.log('[DRY RUN] Would publish to Hashnode:', {
          title: sanitizedPost.title,
          tags: sanitizedPost.tags,
          published: sanitizedPost.published,
        });
        return {
          platform: 'hashnode',
          success: true,
          url: 'https://hashnode.com/[dry-run]',
        };
      }

      // Check if post already exists
      const existingPost = await this.findExistingPost(sanitizedPost.title);

      if (existingPost) {
        console.log(`📝 Updating existing post (ID: ${existingPost.id})...`);
        return await this.updatePost(existingPost.id, sanitizedPost);
      }

      // Create new post
      console.log('📝 Creating new post...');
      return await this.createPost(sanitizedPost);
    } catch (error: any) {
      return {
        platform: 'hashnode',
        success: false,
        error: error.response?.data?.errors?.[0]?.message || error.message,
      };
    }
  }

  private async createPost(post: BlogPost): Promise<PublishResult> {
    const mutation = `
      mutation PublishPost($input: PublishPostInput!) {
        publishPost(input: $input) {
          post {
            id
            slug
            url
          }
        }
      }
    `;

    const variables = {
      input: {
        title: post.title,
        contentMarkdown: post.content,
        tags: post.tags.map((tag) => ({
          slug: tag.toLowerCase().replace(/\s+/g, '-'),
          name: tag,
        })),
        coverImageOptions: post.coverImage
          ? {
              coverImageURL: post.coverImage,
            }
          : undefined,
        ...(config.hashnode.publicationId && { publicationId: config.hashnode.publicationId }),
        metaTags: {
          description: post.description,
        },
        originalArticleURL: post.canonicalUrl,
      },
    };

    const response = await this.client.post('', {
      query: mutation,
      variables,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message || 'Failed to create post');
    }

    const result = response.data.data.publishPost;

    return {
      platform: 'hashnode',
      success: true,
      url: result.post.url,
    };
  }

  private async updatePost(postId: string, post: BlogPost): Promise<PublishResult> {
    const mutation = `
      mutation UpdatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          post {
            id
            slug
            url
          }
        }
      }
    `;

    const variables = {
      input: {
        id: postId,
        title: post.title,
        contentMarkdown: post.content,
        tags: post.tags.map((tag) => ({
          slug: tag.toLowerCase().replace(/\s+/g, '-'),
          name: tag,
        })),
        coverImageOptions: post.coverImage
          ? {
              coverImageURL: post.coverImage,
            }
          : undefined,
        metaTags: {
          description: post.description,
        },
      },
    };

    const response = await this.client.post('', {
      query: mutation,
      variables,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message || 'Failed to update post');
    }

    const result = response.data.data.updatePost;

    return {
      platform: 'hashnode',
      success: true,
      url: result.post.url,
    };
  }

  private async findExistingPost(title: string): Promise<{ id: string } | null> {
    // Check user's personal posts (not publication posts)
    const query = `
      query {
        me {
          posts(pageSize: 20, page: 1) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.client.post('', {
        query,
      });

      if (response.data.errors) {
        return null;
      }

      const posts = response.data.data?.me?.posts?.edges || [];
      const existingPost = posts.find((edge: any) => edge.node.title === title);

      return existingPost ? { id: existingPost.node.id } : null;
    } catch (error: any) {
      // If we can't fetch existing posts, assume it's new
      return null;
    }
  }

  async getMyPosts(): Promise<any[]> {
    if (!config.hashnode.publicationId) {
      throw new Error('Publication ID required to fetch posts');
    }

    const query = `
      query Publication($id: ObjectId!) {
        publication(id: $id) {
          posts(first: 50) {
            edges {
              node {
                id
                title
                slug
                url
                publishedAt
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.client.post('', {
        query,
        variables: {
          id: config.hashnode.publicationId,
        },
      });

      const edges = response.data.data?.publication?.posts?.edges || [];
      return edges.map((edge: any) => edge.node);
    } catch (error: any) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }
}
