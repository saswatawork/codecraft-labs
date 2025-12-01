# Complete API Setup Guide 🔑

Step-by-step instructions to get API keys for all platforms.

## Prerequisites

```bash
cd scripts/blog-automation
cp .env.example .env
```

Now edit `.env` with your favorite editor:
```bash
nano .env
# or
code .env
# or
vim .env
```

---

## 1. Dev.to API Key ⭐ (EASIEST - 2 minutes)

### Steps:
1. **Sign in to Dev.to**
   - Go to https://dev.to/enter
   - Sign in with GitHub, Google, or email

2. **Navigate to API Settings**
   - Click your profile icon (top right)
   - Go to **Settings** → **Extensions**
   - Or directly: https://dev.to/settings/extensions

3. **Generate API Key**
   - Scroll to "DEV Community API Keys"
   - Click **Generate API Key**
   - Give it a name: "Blog Automation Tool"
   - Copy the generated key (starts with `dev_...`)

4. **Add to .env**
   ```bash
   DEVTO_API_KEY=dev_xxxxxxxxxxxxxxxxxxxxxx
   ```

### ✅ Verify:
```bash
curl https://dev.to/api/articles/me \
  -H "api-key: YOUR_API_KEY"
```

---

## 2. Medium Integration Token ⭐ (EASY - 5 minutes)

### Steps:

#### Part A: Get Integration Token

**⚠️ Important Note:** Medium has deprecated self-service integration tokens. As of 2024, Medium API access requires applying for access.

**Option 1: Apply for Medium API Access (Recommended)**
1. **Request API Access**
   - Go to https://medium.com
   - Contact Medium support or check if you have "Partner Program" access
   - Medium has restricted API access to partners only

**Option 2: Alternative - Use RSS-to-Medium Tools**
Since Medium API is now restricted, consider these alternatives:
- Use Medium's import tool (manually import from URL)
- Use Zapier/IFTTT to cross-post from RSS
- Manually publish to Medium (copy/paste)

**Option 3: If You Already Have Legacy Access**
1. **Sign in to Medium**
   - Go to https://medium.com
   - Sign in with your account

2. **Navigate to Settings**
   - Click your profile icon (top right)
   - Click **Settings**
   - Or directly: https://medium.com/me/settings

3. **Look for Integration Tokens**
   - In Settings, look for **"Security and apps"** or **"Integration tokens"** section
   - **Note:** This section may not be visible if you don't have legacy API access
   - If you see it:
     - Enter description: "Blog Automation"
     - Click **Get integration token**
     - Copy the token (starts with `2`)

4. **Add Token to .env** (if you have access)
   ```bash
   MEDIUM_API_TOKEN=2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Current Status:** Medium has significantly restricted API access. Most users cannot generate integration tokens anymore.

#### Part B: Get Your Author ID
1. **Find Your Author ID**
   - Go to https://medium.com/me/stories/public
   - Look at the URL, it will be: `https://medium.com/@YOUR_USERNAME`
   - OR use API:
   ```bash
   curl https://api.medium.com/v1/me \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Extract Author ID from Response**
   ```json
   {
     "data": {
       "id": "1a2b3c4d5e6f",  ← This is your Author ID
       "username": "yourname",
       ...
     }
   }
   ```

3. **Add Author ID to .env**
   ```bash
   MEDIUM_AUTHOR_ID=1a2b3c4d5e6f
   ```

### ✅ Verify:
```bash
curl https://api.medium.com/v1/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 3. LinkedIn Access Token ⚠️ (INTERMEDIATE - 15-30 minutes)

**Note:** LinkedIn OAuth is more complex. You need to create an app and go through OAuth flow.

### Option A: Quick Test Token (Expires in 60 days)

1. **Create LinkedIn App**
   - Go to https://www.linkedin.com/developers/apps
   - Click **Create app**
   - Fill in:
     - **App name**: "Blog Automation"
     - **LinkedIn Page**: Select or create a company page
     - **App logo**: Upload any image
     - **Legal agreement**: Check the box
   - Click **Create app**

2. **Request API Access**
   - In your app dashboard, go to **Products** tab
   - Request access to **Share on LinkedIn** and **Sign In with LinkedIn using OpenID Connect**
   - Wait for approval (usually instant for personal use)

3. **Get Client Credentials**
   - Go to **Auth** tab
   - Copy **Client ID** and **Client Secret**

4. **Get Authorization Code**
   - Build this URL (replace YOUR_CLIENT_ID):
   ```
   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://localhost:3000/callback&scope=w_member_social%20profile%20openid
   ```
   - Open in browser
   - Authorize the app
   - You'll be redirected to localhost with `code=XXXX` in URL
   - Copy the `code` value

5. **Exchange Code for Access Token**
   ```bash
   curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code" \
     -d "code=YOUR_AUTH_CODE" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "redirect_uri=https://localhost:3000/callback"
   ```

6. **Extract Access Token**
   ```json
   {
     "access_token": "AQXXXxxxxxxxxxxxxxx",  ← Your access token
     "expires_in": 5184000,
     ...
   }
   ```

7. **Get Your Person URN**
   ```bash
   curl -X GET https://api.linkedin.com/v2/userinfo \
     -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
   ```
   
   Response:
   ```json
   {
     "sub": "xxxxxx",  ← This is your Person URN
     "name": "Your Name",
     ...
   }
   ```

8. **Add to .env**
   ```bash
   LINKEDIN_ACCESS_TOKEN=AQXXXxxxxxxxxxxxxxx
   LINKEDIN_PERSON_URN=xxxxxx
   ```

### Option B: Use OAuth Playground (Easier)

1. **Use LinkedIn OAuth 2.0 Playground**
   - Go to: https://developer.linkedin.com/docs/oauth2
   - Use their OAuth playground to get tokens quickly

### ⚠️ Important Notes:
- LinkedIn tokens expire after 60 days
- You'll need to refresh them periodically
- For production, implement refresh token flow

### ✅ Verify:
```bash
curl https://api.linkedin.com/v2/userinfo \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 4. X (Twitter) API Credentials 🔴 (ADVANCED - 20-30 minutes)

**Note:** Twitter requires developer account approval, which can take 1-2 days.

### Steps:

#### Part A: Apply for Developer Account
1. **Go to Twitter Developer Portal**
   - Visit https://developer.twitter.com/en/portal/dashboard
   - Sign in with your Twitter account

2. **Apply for Developer Account**
   - Click **Sign up for Free Account**
   - Select use case: "Building tools for my own use"
   - Fill in the questionnaire:
     - **What's your name?**: Your real name
     - **Country**: Your country
     - **Use case**: "Automating blog post sharing"
     - **Description**: "Personal tool to cross-post blog articles from my website to Twitter. Will only post to my own account."
   - Accept terms and submit

3. **Wait for Approval**
   - Usually takes 1-2 days
   - Check your email for approval

#### Part B: Create an App
1. **Create New App**
   - Go to https://developer.twitter.com/en/portal/projects-and-apps
   - Click **+ Create App**
   - Enter app name: "Blog Automation"
   - Copy the **API Key** and **API Secret** immediately (you can't see them again!)

2. **Set Up App Permissions**
   - Go to your app's **Settings** tab
   - Under **User authentication settings**, click **Set up**
   - Enable **OAuth 2.0**
   - Select **Read and Write** permissions
   - Add Callback URL: `https://localhost:3000/callback`
   - Add Website URL: Your portfolio URL
   - Save

3. **Generate Access Token and Secret**
   - Go to **Keys and tokens** tab
   - Under **Authentication Tokens**, click **Generate**
   - Copy both **Access Token** and **Access Token Secret**

4. **Get Bearer Token**
   - In **Keys and tokens** tab
   - Copy the **Bearer Token**

5. **Add All Credentials to .env**
   ```bash
   TWITTER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
   TWITTER_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWITTER_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWITTER_ACCESS_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWITTER_BEARER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Alternative: Use OAuth 2.0 Flow

If you want user authentication instead of app authentication:

```bash
# Get request token
curl -X POST https://api.twitter.com/oauth/request_token \
  --user "YOUR_API_KEY:YOUR_API_SECRET"
```

### ⚠️ Important Notes:
- Twitter API v2 is rate-limited: 300 tweets per 3 hours
- Bearer token is for read-only operations
- Access token/secret needed for posting tweets
- Elevated access may be required for some features

### ✅ Verify:
```bash
curl https://api.twitter.com/2/users/me \
  -H "Authorization: Bearer YOUR_BEARER_TOKEN"
```

---

## 5. Optional: Cloudinary (For Image Hosting)

If you want to automatically upload images:

1. **Sign Up for Cloudinary**
   - Go to https://cloudinary.com/users/register/free
   - Sign up for free account

2. **Get API Credentials**
   - Go to Dashboard: https://cloudinary.com/console
   - Copy:
     - **Cloud name**
     - **API Key**
     - **API Secret**

3. **Add to .env**
   ```bash
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## Complete .env Example

After completing all steps, your `.env` should look like:

```bash
# Dev.to API (✅ REQUIRED for dev.to)
DEVTO_API_KEY=dev_xxxxxxxxxxxxxxxxxxxxxx

# Medium API (✅ REQUIRED for Medium)
MEDIUM_API_TOKEN=2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MEDIUM_AUTHOR_ID=1a2b3c4d5e6f

# LinkedIn API (✅ REQUIRED for LinkedIn)
LINKEDIN_ACCESS_TOKEN=AQXXXxxxxxxxxxxxxxx
LINKEDIN_PERSON_URN=xxxxxx

# X (Twitter) API (✅ REQUIRED for Twitter)
TWITTER_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWITTER_BEARER_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Image hosting
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Test Your Setup

After configuring API keys:

```bash
cd scripts/blog-automation

# Build the tool
pnpm build

# Test all connections
pnpm dev test
```

Expected output:
```
🔌 Testing API connections...

Dev.to: ✅ Connected (5 articles found)
Medium: ✅ Connected (yourname)
LinkedIn: ⚠️  No test endpoint available
Twitter: ⚠️  No test endpoint available
```

---

## Troubleshooting

### "API authentication failed"

**Dev.to:**
- Make sure key starts with `dev_`
- Check you copied the entire key (no spaces)
- Verify at: https://dev.to/settings/extensions

**Medium:**
- Token must start with `2`
- Author ID is alphanumeric (no dashes or underscores)
- Test with curl command above

**LinkedIn:**
- Token may have expired (60 day limit)
- Check scope includes `w_member_social`
- Regenerate if needed

**Twitter:**
- Verify all 5 credentials are set
- Check app has Read + Write permissions
- Make sure you're not rate-limited

### "Cannot find module" errors

```bash
cd scripts/blog-automation
pnpm install
pnpm build
```

### Rate Limits

If you hit rate limits:
- **Dev.to**: 30 articles per 30 seconds
- **Medium**: 1 post per second
- **LinkedIn**: 150 requests per day
- **Twitter**: 300 tweets per 3 hours

Wait for the window to reset before trying again.

---

## Security Best Practices

1. **Never commit .env to git**
   ```bash
   # Already in .gitignore, but verify:
   git check-ignore .env
   ```

2. **Rotate keys regularly**
   - LinkedIn: Every 60 days (forced)
   - Others: Every 90 days (recommended)

3. **Use separate keys for development/production**

4. **Store production keys in environment variables**
   ```bash
   # On your server:
   export DEVTO_API_KEY="dev_xxx"
   export MEDIUM_API_TOKEN="2xxx"
   # etc.
   ```

---

## Quick Start Priority

If you want to start quickly, set up platforms in this order:

1. **Dev.to** (2 min) ⭐ Easiest, largest developer audience, fully accessible API
2. **LinkedIn** (30 min) ⚠️ Moderate, great for networking, requires OAuth setup
3. **Twitter** (1-2 days) 🔴 Hardest (requires developer approval)
4. **Medium** (Not Available) 🔴 API access restricted to partners only

**Recommended:** Start with **Dev.to only** for automated publishing. Manually publish to Medium and LinkedIn using their web interfaces until you set up OAuth.

### Alternative Workflow Without Medium API:
1. Publish to Dev.to using the tool
2. Get the Dev.to article URL
3. Use Medium's "Import a story" feature:
   - Go to https://medium.com/p/import
   - Paste your Dev.to article URL
   - Medium will automatically import it with proper canonical URL

---

## Need Help?

- **Dev.to API Docs**: https://developers.forem.com/api
- **Medium API Docs**: https://github.com/Medium/medium-api-docs
- **LinkedIn API Docs**: https://learn.microsoft.com/en-us/linkedin/
- **Twitter API Docs**: https://developer.twitter.com/en/docs/twitter-api

**Still stuck?** Open an issue or reach out to saswata.career@gmail.com
