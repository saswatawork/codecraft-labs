# Storybook Deployment Setup - Complete! ✅

## 🎉 Your Storybook is Live!

**URL:** https://storybook-static-83d4szw7s-saswata-pals-projects-66942854.vercel.app

## What's Done:

1. ✅ Built Storybook successfully
2. ✅ Linked to Vercel project (`storybook-static`)
3. ✅ Deployed to production
4. ✅ Created GitHub Actions workflow for auto-deployment
5. ✅ Added project IDs to workflow

## Next Step: Add GitHub Secret for Auto-Deployment

To enable automatic deployments on every push, you need to add your Vercel token to GitHub:

### 1. Get Your Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: `GitHub Actions - Storybook`
4. Set scope: `Full Account`
5. Click "Create" and **copy the token**

### 2. Add Token to GitHub

1. Go to: https://github.com/saswatawork/codecraft-labs/settings/secrets/actions
2. Click "New repository secret"
3. Name: `VERCEL_TOKEN`
4. Value: Paste the token you copied
5. Click "Add secret"

### 3. Test It!

After adding the secret, commit and push these changes:

```bash
git add -A
git commit -m "feat(ui): add storybook deployment"
git push origin main
```

The workflow will automatically:
- Build Storybook
- Deploy to Vercel
- Update your live Storybook URL

## Project Details

- **Organization ID:** team_rln3ZLZpVPsyISrPIMv1JbAO
- **Project ID:** prj_haBovtwfPI4AjzNXFXV4wFhsG3Ev
- **Project Name:** storybook-static

## Local Development

```bash
# Start Storybook
pnpm --filter @ccl/ui storybook

# Build Storybook
pnpm --filter @ccl/ui build-storybook

# Deploy manually
cd packages/ui
vercel deploy storybook-static --prod
```

## Workflow Location

`.github/workflows/storybook-deploy.yml`
