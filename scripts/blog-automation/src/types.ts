export interface BlogPost {
  title: string;
  description: string;
  content: string;
  tags: string[];
  canonicalUrl?: string;
  coverImage?: string;
  published?: boolean;
  series?: string;
}

export interface BlogMetadata {
  title: string;
  description: string;
  tags: string[];
  canonicalUrl?: string;
  coverImage?: string;
  published?: boolean;
  series?: string;
  devto?: {
    published?: boolean;
    seriesName?: string;
  };
  medium?: {
    published?: boolean;
    tags?: string[];
  };
  linkedin?: {
    published?: boolean;
  };
  twitter?: {
    published?: boolean;
    thread?: boolean;
  };
  hashnode?: {
    published?: boolean;
    tags?: string[];
  };
}

export interface PublishResult {
  platform: string;
  success: boolean;
  url?: string;
  error?: string;
}

export interface PublishOptions {
  platforms: ('devto' | 'medium' | 'linkedin' | 'twitter' | 'hashnode')[];
  dryRun?: boolean;
  verbose?: boolean;
}
