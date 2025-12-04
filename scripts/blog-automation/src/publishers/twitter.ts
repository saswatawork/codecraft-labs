import axios, { type AxiosInstance } from 'axios';
import { config, validateConfig } from '../config.js';
import type { BlogPost, PublishResult } from '../types.js';

export class TwitterPublisher {
  private client: AxiosInstance;

  constructor() {
    if (!validateConfig('twitter')) {
      throw new Error('Twitter API credentials not configured. Set TWITTER_* variables in .env');
    }

    this.client = axios.create({
      baseURL: config.twitter.baseUrl,
      headers: {
        Authorization: `Bearer ${config.twitter.bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async publish(post: BlogPost, asThread = false, dryRun = false): Promise<PublishResult> {
    try {
      if (dryRun) {
        console.log('[DRY RUN] Would publish to X (Twitter):', {
          title: post.title,
          asThread,
        });
        return {
          platform: 'twitter',
          success: true,
          url: 'https://twitter.com/username/status/[dry-run]',
        };
      }

      if (asThread) {
        return this.publishThread(post);
      }

      // Single tweet with link
      const tweetText = this.formatTweet(post);

      const response = await this.client.post('/tweets', {
        text: tweetText,
      });

      return {
        platform: 'twitter',
        success: true,
        url: `https://twitter.com/i/web/status/${response.data.data.id}`,
      };
    } catch (error: any) {
      return {
        platform: 'twitter',
        success: false,
        error: error.response?.data?.detail || error.message,
      };
    }
  }

  private async publishThread(post: BlogPost): Promise<PublishResult> {
    try {
      // Break content into tweet-sized chunks (280 chars)
      const tweets = this.createThread(post);

      let previousTweetId: string | undefined;
      const tweetIds: string[] = [];

      for (const tweet of tweets) {
        const payload: any = { text: tweet };

        if (previousTweetId) {
          payload.reply = {
            in_reply_to_tweet_id: previousTweetId,
          };
        }

        const response = await this.client.post('/tweets', payload);
        const tweetId = response.data.data.id;
        tweetIds.push(tweetId);
        previousTweetId = tweetId;

        // Rate limit: wait 1 second between tweets
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      return {
        platform: 'twitter',
        success: true,
        url: `https://twitter.com/i/web/status/${tweetIds[0]}`,
      };
    } catch (error: any) {
      return {
        platform: 'twitter',
        success: false,
        error: error.response?.data?.detail || error.message,
      };
    }
  }

  private formatTweet(post: BlogPost): string {
    const tags = post.tags
      .slice(0, 3)
      .map((tag) => `#${tag.replace(/\s+/g, '')}`)
      .join(' ');

    const maxLength = 280;
    const linkLength = 23; // Twitter counts URLs as 23 chars
    const tagsLength = tags.length + 1; // +1 for newline
    const availableLength = maxLength - linkLength - tagsLength - 10; // buffer

    let text = `📝 ${post.title}\n\n${post.description}`;
    if (text.length > availableLength) {
      text = `${text.substring(0, availableLength - 3)}...`;
    }

    return `${text}\n\n${post.canonicalUrl || ''}\n\n${tags}`;
  }

  private createThread(post: BlogPost): string[] {
    const tweets: string[] = [];

    // First tweet: Title + description
    tweets.push(`📝 ${post.title}\n\n${post.description}\n\n🧵 Thread 👇`);

    // Extract key points from content (simplified)
    const sections = post.content.split('\n\n');
    const maxTweetLength = 270; // Leave room for numbering

    for (let i = 0; i < sections.length && tweets.length < 10; i++) {
      const section = sections[i]?.trim();
      if (!section || section.length === 0 || section.startsWith('#')) continue;

      if (section.length <= maxTweetLength) {
        tweets.push(`${tweets.length}/ ${section}`);
      } else {
        // Split long sections
        const words = section.split(' ');
        let chunk = '';
        for (const word of words) {
          if ((chunk + word).length > maxTweetLength) {
            tweets.push(`${tweets.length}/ ${chunk.trim()}`);
            chunk = `${word} `;
          } else {
            chunk += `${word} `;
          }
        }
        if (chunk.trim()) {
          tweets.push(`${tweets.length}/ ${chunk.trim()}`);
        }
      }
    }

    // Final tweet with link
    tweets.push(
      `That's a wrap! 🎬\n\nRead the full article:\n${post.canonicalUrl || '[Link]'}\n\n${post.tags
        .slice(0, 3)
        .map((t) => `#${t.replace(/\s+/g, '')}`)
        .join(' ')}`,
    );

    return tweets;
  }
}
