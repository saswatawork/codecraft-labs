# Quick Start Guide

## 1. Install Dependencies

```bash
cd scripts/blog-automation
pnpm install
```

## 2. Configure API Keys

```bash
# Copy template
cp .env.example .env

# Edit .env and add your API keys
nano .env
```

### Quick API Key Setup

**Dev.to** (Easiest - 2 minutes):
- Visit: https://dev.to/settings/extensions
- Click "Generate API Key"
- Copy to `.env`

**Medium** (Easy - 5 minutes):
- Visit: https://medium.com/me/settings/security
- Click "Integration tokens" → Generate
- Get Author ID from your profile URL
- Copy both to `.env`

**LinkedIn** (⚠️ Complex OAuth - Skip for now):
- LinkedIn API requires complex OAuth setup
- **Recommended:** Post manually to LinkedIn instead
- See alternative below ↓

**Twitter** (Advanced - 20 minutes):
- Apply for Developer account: https://developer.twitter.com
- Create app with OAuth 2.0
- Generate all required tokens

## 3. Build & Test

```bash
# Build the tool
pnpm build

# Test API connections
pnpm dev test
```

## 4. Publish Your First Post

```bash
# Test with dry run
pnpm dev publish ../../blog-posts/your-post.md --dry-run

# Publish to dev.to and Medium
pnpm dev publish ../../blog-posts/your-post.md --platforms devto,medium

# Publish everywhere including Twitter thread
pnpm dev publish ../../blog-posts/your-post.md \
  --platforms devto,medium,linkedin,twitter \
  --thread
```

## Blog Post Template

Create `blog-posts/my-post.md`:

```markdown
---
title: "Your Amazing Blog Post Title"
description: "A compelling one-liner about your post (160 chars max)"
tags:
  - javascript
  - webdev
  - tutorial
canonicalUrl: "https://your-site.com/blog/my-post"
published: false  # Set true when ready
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

# Your Content Here

Write your blog post in **Markdown**...
```

## Common Commands

```bash
# List all blog posts
pnpm dev list

# Publish with verbose output
pnpm dev publish path/to/post.md --verbose

# Publish to specific platforms only
pnpm dev publish path/to/post.md --platforms devto,medium

# Test without publishing
pnpm dev publish path/to/post.md --dry-run
```

## Troubleshooting

**"Cannot find module"**
```bash
pnpm install
pnpm build
```

**"API authentication failed"**
```bash
# Check your tokens
cat .env

# Test connections
pnpm dev test
```

---

## Simplified Workflow (Recommended) 

### What Actually Works Well:

**✅ Automate:**
- **Dev.to** - Simple API key, works perfectly
- **Twitter** - Once approved, works great (with threads!)

**⚠️ Manual (Easier than API):**
- **LinkedIn** - OAuth is complex, just post manually (2 minutes)
- **Medium** - API restricted, use import feature instead

### Recommended Publishing Flow:

```bash
# 1. Publish to Dev.to automatically
pnpm dev publish ../../blog-posts/your-post.md --platforms devto

# 2. Share on LinkedIn manually (2 minutes):
#    - Go to linkedin.com
#    - Create post with title + excerpt
#    - Add link to Dev.to article
#    - Add relevant hashtags

# 3. Import to Medium (30 seconds):
#    - Go to https://medium.com/p/import
#    - Paste your Dev.to URL
#    - Click import (canonical URL handled automatically)

# 4. Tweet (optional - if Twitter developer account approved):
pnpm dev publish ../../blog-posts/your-post.md --platforms twitter --thread
```

**Why This Works Better:**
- ✅ Less time fighting with APIs
- ✅ More control over LinkedIn presentation
- ✅ Medium import preserves formatting perfectly
- ✅ Dev.to automation still saves tons of time
- ✅ Twitter threads work great once setup

---

## LinkedIn Manual Post Template

When sharing on LinkedIn, use this format for maximum engagement:

```
📝 [Your Post Title]

[2-3 sentence summary of what you built/learned]

Key highlights:
• Point 1
• Point 2  
• Point 3

Read the full article: [Dev.to link]

#WebDevelopment #React #TypeScript #[YourNiche]
```

**Example:**
```
📝 Building a Production Design System with Tailwind CSS v4

Just shipped a world-class component library with 60+ components and 468 passing tests using bleeding-edge Tailwind v4. Here's what I learned about early adoption and production-ready systems.

Key highlights:
• 48% faster builds with Tailwind v4
• Compound component patterns for flexibility
• Complete testing strategy with Vitest
• TypeScript strict mode from day one

Read the full deep dive: https://dev.to/yourname/article

#WebDevelopment #TailwindCSS #React #DesignSystems #TypeScript
```

---

## LinkedIn OAuth Setup (Advanced - Optional)

**⚠️ Warning:** LinkedIn OAuth is complex with 60-day token expiry. Manual posting is often faster and more reliable.

**Only proceed if you:**
- Need to post programmatically to LinkedIn regularly
- Are comfortable with OAuth flows
- Don't mind renewing tokens every 60 days

### Step 1: Create LinkedIn App (5 minutes)

1. **Go to LinkedIn Developers**
   - Visit: https://www.linkedin.com/developers/apps
   - Sign in with your LinkedIn account
   - Click **"Create app"** button

2. **Fill App Details**
   ```
   App name: Blog Automation
   LinkedIn Page: [Select your personal page or create one]
   Privacy policy URL: https://your-site.com/privacy (or use a placeholder)
   App logo: Upload any square image (400x400px minimum)
   Legal agreement: ✓ Check the box
   ```
   - Click **"Create app"**

3. **Verify Your App**
   - LinkedIn will send verification link to your page admin email
   - Check email and click verify link
   - Return to app dashboard

### Step 2: Request API Products (2 minutes)

1. **Go to Products Tab**
   - In your app dashboard, click **"Products"** tab
   
2. **Request Access to Two Products**
   - Find **"Share on LinkedIn"** → Click **"Request access"**
   - Find **"Sign In with LinkedIn using OpenID Connect"** → Click **"Request access"**
   
3. **Wait for Approval**
   - Usually instant for personal use
   - Check "Products" tab - status should show "Added" or "Approved"

### Step 3: Get Client Credentials (1 minute)

1. **Go to Auth Tab**
   - Click **"Auth"** tab in your app dashboard
   
2. **Copy Credentials**
   - Copy **Client ID** (looks like: `78xxxxxxxxxxxxx`)
   - Copy **Client Secret** (looks like: `xxxxxxxxxxxxxxxx`)
   - Keep these safe - you'll need them in next step

### Step 4: Generate Access Token (5 minutes)

**Option A: Using Browser (Easier)**

1. **Build Authorization URL**
   Replace `YOUR_CLIENT_ID` with your actual Client ID:
   ```
   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://oauth.pstmn.io/v1/callback&scope=profile%20email%20w_member_social%20openid
   ```

2. **Open URL in Browser**
   - Paste the complete URL in your browser
   - Click **"Allow"** to authorize your app
   - You'll be redirected to a page with a URL like:
   ```
   https://oauth.pstmn.io/v1/callback?code=AQTxxx...&state=xxx
   ```
   - Copy the `code=` value (everything after `code=` and before `&state`)

3. **Exchange Code for Token**
   Open terminal and run (replace YOUR_* with your actual values):
   ```bash
   curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code" \
     -d "code=YOUR_AUTH_CODE_FROM_STEP_2" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "redirect_uri=https://oauth.pstmn.io/v1/callback"
   ```

4. **Copy Access Token**
   Response will look like:
   ```json
   {
     "access_token": "AQVxxx...",
     "expires_in": 5184000,
     "scope": "profile,email,w_member_social,openid"
   }
   ```
   - Copy the `access_token` value

**Option B: Using Postman OAuth Helper (Easiest)**

1. **Install Postman** (if you don't have it)
   - Download from: https://www.postman.com/downloads/

2. **Create New Request**
   - Open Postman
   - Create new request
   - Click **"Authorization"** tab
   - Select **"OAuth 2.0"** from Type dropdown

3. **Configure OAuth**
   ```
   Token Name: LinkedIn Token
   Grant Type: Authorization Code
   Callback URL: https://oauth.pstmn.io/v1/callback
   Auth URL: https://www.linkedin.com/oauth/v2/authorization
   Access Token URL: https://www.linkedin.com/oauth/v2/accessToken
   Client ID: [YOUR_CLIENT_ID]
   Client Secret: [YOUR_CLIENT_SECRET]
   Scope: profile email w_member_social openid
   ```

4. **Get Token**
   - Click **"Get New Access Token"**
   - Browser opens → Click "Allow"
   - Token appears in Postman
   - Click **"Use Token"**
   - Copy the access token

### Step 5: Get Your Person URN (2 minutes)

With your access token, run:
```bash
curl https://api.linkedin.com/v2/userinfo \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Response:
```json
{
  "sub": "a1b2c3d4e5",
  "name": "Your Name",
  "given_name": "First",
  "family_name": "Last",
  "picture": "...",
  "email": "..."
}
```

- Copy the `"sub"` value - this is your Person URN

### Step 6: Add to .env

```bash
LINKEDIN_ACCESS_TOKEN=AQVxxx...your_long_token
LINKEDIN_PERSON_URN=a1b2c3d4e5
```

### Step 7: Test It!

```bash
cd scripts/blog-automation
pnpm build
pnpm dev test
```

You should see:
```
LinkedIn: ⚠️  No test endpoint available
```
(This is normal - LinkedIn doesn't have a simple test endpoint)

Test actual publishing:
```bash
pnpm dev publish ../../blog-posts/your-post.md \
  --platforms linkedin \
  --dry-run
```

---

## Quick Reference

**Important URLs:**
- Create app: https://www.linkedin.com/developers/apps
- OAuth helper: Use Postman or browser method above
- API docs: https://learn.microsoft.com/en-us/linkedin/

**Token Expiry:**
- LinkedIn access tokens expire after **60 days**
- You'll need to regenerate using the same process
- Mark your calendar for renewal!

**Troubleshooting:**
- **"Invalid scope"**: Make sure "Share on LinkedIn" product is approved
- **"Invalid redirect_uri"**: Use exactly `https://oauth.pstmn.io/v1/callback`
- **"Unauthorized"**: Check Client ID and Secret are correct
- **"Expired token"**: Generate new token (they expire after 60 days)

---

## Bottom Line: Start Simple

**For Week 1 (Today):**
```bash
# Just setup Dev.to (2 minutes)
DEVTO_API_KEY=dev_your_key_here
```

**Publish workflow:**
```bash
# Automate Dev.to
pnpm dev publish ../../blog-posts/tailwind-v4.md --platforms devto

# Share manually on LinkedIn (2 min) - better engagement anyway!
# Import to Medium (30 sec) - use their import tool
```

**Week 2+:** Add Twitter automation if you get developer approval

**Reality Check:**
- Spending 30 minutes on LinkedIn OAuth vs. 2 minutes manual posting?
- Manual LinkedIn posts often get MORE engagement (you can add custom intro)
- Medium import tool works flawlessly
- Focus automation where it matters: Dev.to ✅, Twitter ✅

**Need help?** Check full [API-SETUP-GUIDE.md](./API-SETUP-GUIDE.md) for detailed docs.
