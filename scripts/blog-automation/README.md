# Blog Automation Tool 🚀

Automate publishing your blog posts to **dev.to**, **Medium**, **LinkedIn**, and **X (Twitter)** with a single command.

## Features

- ✅ **Multi-platform Publishing** - Publish to 4 platforms simultaneously
- 📝 **Markdown Support** - Write once in Markdown with frontmatter
- 🔄 **Flexible Configuration** - Control publishing per platform via frontmatter
- 🧵 **Twitter Threads** - Automatically convert long posts to Twitter threads
- 🔍 **Dry Run Mode** - Test publishing without making actual API calls
- 📋 **Blog Post Discovery** - List all blog posts in a directory
- 🔌 **Connection Testing** - Verify API credentials before publishing

## Installation

```bash
cd scripts/blog-automation
pnpm install
```

## Setup

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Get API Credentials

#### Dev.to API Key
1. Go to [dev.to/settings/extensions](https://dev.to/settings/extensions)
2. Generate an API key
3. Add to `.env`: `DEVTO_API_KEY=your_key_here`

#### Medium Integration Token
1. Go to [medium.com/me/settings/security](https://medium.com/me/settings/security)
2. Create an integration token
3. Get your author ID from [medium.com/me/stories/public](https://medium.com/me/stories/public) (check URL)
4. Add to `.env`:
   ```
   MEDIUM_API_TOKEN=your_token_here
   MEDIUM_AUTHOR_ID=your_author_id_here
   ```

#### LinkedIn Access Token
1. Create a LinkedIn App at [linkedin.com/developers/apps](https://linkedin.com/developers/apps)
2. Get OAuth 2.0 access token with `w_member_social` scope
3. Get your Person URN from profile API
4. Add to `.env`:
   ```
   LINKEDIN_ACCESS_TOKEN=your_token_here
   LINKEDIN_PERSON_URN=your_urn_here
   ```

**Note:** LinkedIn tokens expire. You'll need to refresh them periodically.

#### X (Twitter) API Credentials
1. Create a Twitter Developer account at [developer.twitter.com](https://developer.twitter.com)
2. Create a new app with OAuth 2.0 enabled
3. Generate API keys and access tokens
4. Add to `.env`:
   ```
   TWITTER_API_KEY=your_api_key
   TWITTER_API_SECRET=your_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_SECRET=your_access_secret
   TWITTER_BEARER_TOKEN=your_bearer_token
   ```

### 3. Build the Tool

```bash
pnpm build
```

## Usage

### Blog Post Format

Create a Markdown file with frontmatter:

```markdown
---
title: "Building a Production Design System with Tailwind CSS v4"
description: "A deep dive into building a world-class component library with bleeding-edge Tailwind CSS v4 features."
tags:
  - tailwindcss
  - webdev
  - react
  - designsystem
canonicalUrl: "https://your-site.com/blog/tailwind-v4"
coverImage: "https://your-site.com/images/cover.jpg"
published: true
series: "Design System Series"
devto:
  published: true
medium:
  published: true
linkedin:
  published: true
twitter:
  published: true
  thread: true
---

# Your Blog Content Here

Write your blog post in **Markdown**...
```

### Commands

#### Publish a Blog Post

```bash
# Publish to all default platforms (dev.to, Medium, LinkedIn)
pnpm dev publish path/to/post.md

# Publish to specific platforms
pnpm dev publish path/to/post.md --platforms devto,medium

# Publish with Twitter thread
pnpm dev publish path/to/post.md --platforms devto,medium,twitter --thread

# Dry run (test without publishing)
pnpm dev publish path/to/post.md --dry-run

# Verbose output
pnpm dev publish path/to/post.md --verbose
```

#### List All Blog Posts

```bash
# List posts in default directory (./blog-posts)
pnpm dev list

# List posts in custom directory
pnpm dev list ../blog-posts
```

#### Test API Connections

```bash
pnpm dev test
```

### Platform-Specific Configuration

You can disable specific platforms in the frontmatter:

```yaml
---
title: "My Post"
# ... other fields
devto:
  published: false  # Skip dev.to
medium:
  published: true
linkedin:
  published: true
twitter:
  published: false  # Skip Twitter
---
```

## Examples

### Example 1: Publish Everywhere

```bash
pnpm dev publish ../../blog-posts/tailwind-v4-production-design-system.md \
  --platforms devto,medium,linkedin,twitter \
  --thread
```

### Example 2: Dry Run Before Publishing

```bash
# Test first
pnpm dev publish ../../blog-posts/my-post.md --dry-run

# If looks good, publish for real
pnpm dev publish ../../blog-posts/my-post.md
```

### Example 3: Update Frontmatter After Publishing

After publishing, you can add the URLs to your frontmatter:

```yaml
---
published: true
devto:
  url: "https://dev.to/username/my-post"
medium:
  url: "https://medium.com/@username/my-post"
linkedin:
  url: "https://linkedin.com/feed/update/..."
twitter:
  url: "https://twitter.com/username/status/..."
---
```

## Twitter Thread Generation

When using `--thread`, the tool:
1. Creates an opening tweet with title + description
2. Splits content into tweet-sized chunks (270 chars)
3. Numbers each tweet (1/, 2/, 3/, etc.)
4. Adds a closing tweet with the full article link
5. Waits 1 second between tweets to avoid rate limits

Example output:
```
Tweet 1: 📝 My Amazing Post

This is the description...

🧵 Thread 👇

Tweet 2: 1/ First key point from the article...

Tweet 3: 2/ Second key point...

Tweet 4: That's a wrap! 🎬

Read the full article:
https://your-site.com/blog/post

#webdev #react #typescript
```

## Limitations & Best Practices

### Rate Limits
- **Dev.to**: 30 articles per 30 seconds
- **Medium**: 1 post per second
- **LinkedIn**: 150 requests per day
- **Twitter**: 300 tweets per 3 hours (v2 API)

### Tag Limits
- **Dev.to**: Max 4 tags
- **Medium**: Max 5 tags
- **LinkedIn**: No tag limit, but hashtags work best
- **Twitter**: Max 3 tags recommended (character limit)

### Best Practices
1. Always test with `--dry-run` first
2. Set `published: false` for drafts
3. Add canonical URLs to avoid duplicate content penalties
4. Use high-quality cover images (1200x630px recommended)
5. Keep descriptions under 160 characters for SEO
6. Test API connections regularly: `pnpm dev test`

## Troubleshooting

### "Cannot find module" errors
```bash
pnpm install
pnpm build
```

### API Authentication Failed
```bash
# Test your API connections
pnpm dev test

# Check your .env file
cat .env

# Make sure tokens haven't expired (especially LinkedIn)
```

### Twitter Rate Limit Exceeded
Wait for the rate limit window to reset (usually 15 minutes).

### Medium HTML Conversion Issues
The tool does basic Markdown → HTML conversion. For complex formatting, consider:
1. Publishing to dev.to first
2. Using the dev.to canonical URL for Medium
3. Medium will import from the canonical URL

## Development

### Build
```bash
pnpm build
```

### Run in Development Mode
```bash
pnpm dev [command]
```

### Project Structure
```
blog-automation/
├── src/
│   ├── publishers/        # Platform-specific publishers
│   │   ├── devto.ts
│   │   ├── medium.ts
│   │   ├── linkedin.ts
│   │   └── twitter.ts
│   ├── cli.ts            # CLI interface
│   ├── config.ts         # Environment configuration
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Helper functions
│   └── index.ts          # Main entry point
├── dist/                 # Compiled JavaScript
├── package.json
├── tsconfig.json
└── .env                  # Your API credentials
```

## Future Enhancements

- [ ] Hashnode integration
- [ ] Reddit r/programming posting
- [ ] Image upload to CDN
- [ ] Scheduled publishing
- [ ] Analytics tracking
- [ ] Cross-post analytics
- [ ] Automatic canonical URL generation
- [ ] Update existing posts
- [ ] Markdown linting before publish

## Contributing

Contributions welcome! Areas for improvement:
- Additional platform integrations
- Better Markdown → HTML conversion for Medium
- Image hosting integration (Cloudinary, AWS S3)
- Scheduled publishing queue
- Analytics dashboard

## License

MIT

---

**Need Help?** Open an issue or reach out to [saswata.career@gmail.com](mailto:saswata.career@gmail.com)
