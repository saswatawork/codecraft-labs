import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

export const config = {
  devto: {
    apiKey: process.env['DEVTO_API_KEY'] || '',
    baseUrl: 'https://dev.to/api',
  },
  medium: {
    apiToken: process.env['MEDIUM_API_TOKEN'] || '',
    authorId: process.env['MEDIUM_AUTHOR_ID'] || '',
    baseUrl: 'https://api.medium.com/v1',
  },
  linkedin: {
    accessToken: process.env['LINKEDIN_ACCESS_TOKEN'] || '',
    personUrn: process.env['LINKEDIN_PERSON_URN'] || '',
    baseUrl: 'https://api.linkedin.com/v2',
  },
  twitter: {
    apiKey: process.env['TWITTER_API_KEY'] || '',
    apiSecret: process.env['TWITTER_API_SECRET'] || '',
    accessToken: process.env['TWITTER_ACCESS_TOKEN'] || '',
    accessSecret: process.env['TWITTER_ACCESS_SECRET'] || '',
    bearerToken: process.env['TWITTER_BEARER_TOKEN'] || '',
    baseUrl: 'https://api.twitter.com/2',
  },
  hashnode: {
    apiKey: process.env['HASHNODE_API_KEY'] || '',
    publicationId: process.env['HASHNODE_PUBLICATION_ID'] || '',
    username: process.env['HASHNODE_USERNAME'] || '',
  },
  cloudinary: {
    cloudName: process.env['CLOUDINARY_CLOUD_NAME'] || '',
    apiKey: process.env['CLOUDINARY_API_KEY'] || '',
    apiSecret: process.env['CLOUDINARY_API_SECRET'] || '',
  },
};

export function validateConfig(platform: string): boolean {
  switch (platform) {
    case 'devto':
      return !!config.devto.apiKey;
    case 'medium':
      return !!config.medium.apiToken && !!config.medium.authorId;
    case 'linkedin':
      return !!config.linkedin.accessToken && !!config.linkedin.personUrn;
    case 'twitter':
      return !!(
        config.twitter.apiKey &&
        config.twitter.apiSecret &&
        config.twitter.accessToken &&
        config.twitter.accessSecret
      );
    case 'hashnode':
      return !!config.hashnode.apiKey;
    default:
      return false;
  }
}
