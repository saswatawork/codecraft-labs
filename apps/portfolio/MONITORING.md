# Monitoring Setup Guide

## Overview

This document describes the monitoring setup for CodeCraft Labs portfolio application.

## 🎯 Monitoring Stack

### 1. Sentry (Error Tracking & Performance)
- **Purpose**: Track runtime errors, performance issues, and user sessions
- **Status**: ✅ Installed, ⚠️ Needs Configuration
- **Version**: @sentry/nextjs ^10.27.0

### 2. Vercel Analytics
- **Purpose**: Track page views, visitor analytics, and traffic patterns
- **Status**: ✅ Installed & Active
- **Auto-enabled**: Works automatically on Vercel deployment

### 3. Vercel Speed Insights
- **Purpose**: Monitor Core Web Vitals (LCP, FID, CLS, TTFB, INP)
- **Status**: ✅ Installed & Active
- **Auto-enabled**: Works automatically on Vercel deployment

## 📋 Setup Instructions

### Sentry Configuration

#### 1. Create Sentry Account & Project

1. Go to [sentry.io](https://sentry.io) and sign up
2. Create a new project:
   - **Platform**: Next.js
   - **Project Name**: `codecraft-labs-portfolio`
   - **Team**: Your team name

3. After creation, you'll get a DSN (Data Source Name) like:
   ```
   https://[key]@o[orgId].ingest.sentry.io/[projectId]
   ```

#### 2. Configure Environment Variables

Create `.env.local` in `apps/portfolio/`:

```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://your-key@your-org.ingest.sentry.io/your-project-id

# For source map uploads (production only)
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=codecraft-labs-portfolio
SENTRY_AUTH_TOKEN=your-auth-token
```

**Get Auth Token**:
1. Go to Sentry → Settings → Account → API → Auth Tokens
2. Create new token with scopes: `project:read`, `project:releases`, `org:read`
3. Copy token to `SENTRY_AUTH_TOKEN`

#### 3. Add to Vercel Environment Variables

For production deployment:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SENTRY_DSN` (Production, Preview, Development)
   - `SENTRY_ORG` (Production only)
   - `SENTRY_PROJECT` (Production only)
   - `SENTRY_AUTH_TOKEN` (Production only) - Mark as sensitive

#### 4. Test Sentry Integration

**Development Testing:**
```bash
cd apps/portfolio
pnpm dev
```

Visit: http://localhost:3000/sentry-test

Click "Throw Test Error" button. Check Sentry dashboard for error.

**Production Testing:**
Deploy to Vercel, visit `/sentry-test`, trigger error, verify in Sentry.

### Vercel Analytics & Speed Insights

**No configuration needed!** These are automatically enabled when:
- You deploy to Vercel
- The packages are installed (`@vercel/analytics`, `@vercel/speed-insights`)
- Components are added to root layout (already done ✅)

**Verify:**
1. Deploy to Vercel
2. Visit your site
3. Check Vercel Dashboard → Your Project → Analytics
4. Check Vercel Dashboard → Your Project → Speed Insights

## 📊 What Gets Monitored

### Sentry Captures:
- ✅ **Client-side errors**: JavaScript exceptions in browser
- ✅ **Server-side errors**: API route errors, SSR crashes
- ✅ **Edge errors**: Middleware and edge runtime issues
- ✅ **Performance traces**: API response times, page load performance
- ✅ **Session replays**: User session recordings (on error)
- ✅ **User context**: User ID, session data, breadcrumbs

### Vercel Analytics Tracks:
- ✅ **Page views**: Total visits, unique visitors
- ✅ **Traffic sources**: Referrers, UTM parameters
- ✅ **Geographic data**: Visitor locations
- ✅ **Device info**: Browser, OS, device type
- ✅ **Top pages**: Most visited pages

### Speed Insights Monitors:
- ✅ **LCP (Largest Contentful Paint)**: Loading performance
- ✅ **FID/INP (First Input Delay/Interaction to Next Paint)**: Interactivity
- ✅ **CLS (Cumulative Layout Shift)**: Visual stability
- ✅ **TTFB (Time to First Byte)**: Server response time
- ✅ **FCP (First Contentful Paint)**: Initial render

## 🔍 Monitoring Best Practices

### Sentry Configuration

**Sample Rate Settings** (already configured):
```typescript
// Client config
tracesSampleRate: 1.0  // 100% in dev, reduce to 0.1-0.2 in prod
replaysOnErrorSampleRate: 1.0  // 100% when error occurs
replaysSessionSampleRate: 0.1  // 10% of normal sessions

// Server config
tracesSampleRate: 1.0  // 100% in dev, reduce to 0.1 in prod
```

**Privacy Settings**:
- `maskAllText: true` - Hides sensitive text in replays
- `blockAllMedia: true` - Blocks images/video in replays

**When to Adjust**:
- High traffic site? Reduce sample rates to save costs
- Low traffic? Keep at 100% to catch all issues
- Sensitive data? Keep privacy settings strict

### Alert Configuration (Optional)

In Sentry Dashboard:
1. Go to **Alerts** → **Create Alert Rule**
2. Recommended alerts:
   - New issue created (Slack/Email)
   - Error rate > 1% (Slack)
   - Performance regression (Email)

## 📈 Viewing Monitoring Data

### Sentry Dashboard
```
https://sentry.io/organizations/[your-org]/issues/
```
- **Issues**: All captured errors
- **Performance**: API and page load metrics
- **Releases**: Track errors by deployment version
- **Session Replay**: Watch user sessions

### Vercel Analytics
```
https://vercel.com/[your-team]/[project]/analytics
```
- Real-time visitor count
- Page views over time
- Top pages and referrers

### Vercel Speed Insights
```
https://vercel.com/[your-team]/[project]/speed-insights
```
- Core Web Vitals scores
- Historical performance trends
- Per-page performance breakdown

## 🚨 Troubleshooting

### Sentry Not Capturing Errors

**Check:**
1. Is `NEXT_PUBLIC_SENTRY_DSN` set correctly?
2. Are Sentry config files imported? (Check `instrumentation.ts`)
3. Is production build running? (`next build && next start`)
4. Check browser console for Sentry initialization messages

**Debug Mode:**
```typescript
// In sentry.client.config.ts
Sentry.init({
  debug: true,  // Enable debug logs
  // ...
});
```

### Analytics Not Showing

**Vercel Analytics:**
- Wait 24 hours after first deployment for data to appear
- Must be deployed to Vercel (doesn't work in `localhost`)
- Check package is installed: `pnpm list @vercel/analytics`

**Speed Insights:**
- Requires real user visits (not synthetic tests)
- Data aggregated every 24 hours
- Only available on Vercel Pro or Enterprise (check plan)

### Build Errors

**Sentry Webpack Plugin Issues:**
```bash
# If source map upload fails, disable temporarily
SENTRY_IGNORE_BUILD_ERRORS=1 pnpm build
```

**Fix permanently:**
- Ensure `SENTRY_AUTH_TOKEN` has correct permissions
- Check `SENTRY_ORG` and `SENTRY_PROJECT` match your Sentry project

## 📚 Resources

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Vercel Analytics Docs](https://vercel.com/docs/analytics)
- [Vercel Speed Insights Docs](https://vercel.com/docs/speed-insights)
- [Web Vitals Explained](https://web.dev/vitals/)

## ✅ Checklist

Before deploying to production:

- [ ] Sentry account created
- [ ] Sentry project created
- [ ] `NEXT_PUBLIC_SENTRY_DSN` added to Vercel env vars
- [ ] `SENTRY_AUTH_TOKEN` added to Vercel env vars
- [ ] Test error throwing works (visit `/sentry-test`)
- [ ] Verified error appears in Sentry dashboard
- [ ] Vercel Analytics enabled (automatic)
- [ ] Speed Insights enabled (automatic on Pro plan)
- [ ] Set up Sentry alerts (optional but recommended)
- [ ] Document monitoring in README

## 🎯 Success Metrics

After setup, you should see:
- **Sentry**: Errors captured within seconds
- **Analytics**: Visitor data within 24 hours
- **Speed Insights**: Core Web Vitals after 24 hours

## 💡 Next Steps

1. **Week 1**: Complete Sentry setup with production DSN
2. **Week 2**: Create Sentry alerts for critical errors
3. **Week 3**: Set up performance budgets in Speed Insights
4. **Week 4**: Document learnings in blog post
