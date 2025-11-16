# Storybook Deployment

This document explains how to deploy the Storybook for the @ccl/ui package.

## Automated Deployment (Vercel)

The Storybook automatically deploys to Vercel on every push to `main` branch.

### Setup Required Secrets

Add these secrets to your GitHub repository:

1. **VERCEL_TOKEN** - Your Vercel API token
2. **VERCEL_ORG_ID** - Your Vercel organization ID
3. **VERCEL_STORYBOOK_PROJECT_ID** - The Vercel project ID for Storybook

### Get Vercel Credentials

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link the project (run from packages/ui directory)
cd packages/ui
vercel link

# Get your org and project IDs
vercel env pull
```

The credentials will be in `.vercel/project.json`

## Manual Deployment

### Build Storybook

```bash
# From root directory
pnpm --filter @ccl/ui build-storybook

# Output will be in packages/ui/storybook-static
```

### Deploy to Vercel Manually

```bash
cd packages/ui
vercel deploy storybook-static --prod
```

### Deploy to Other Platforms

#### Chromatic

```bash
# Install Chromatic
pnpm add -D chromatic

# Deploy
npx chromatic --project-token=<your-token>
```

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd packages/ui
netlify deploy --dir=storybook-static --prod
```

#### GitHub Pages

Add to `.github/workflows/storybook-deploy.yml`:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./packages/ui/storybook-static
```

## Local Development

```bash
# Start Storybook dev server
pnpm --filter @ccl/ui storybook

# Opens at http://localhost:6006
```

## Storybook URL

Once deployed, your Storybook will be available at:
- Production: `https://<your-vercel-project>.vercel.app`
- Preview (PRs): `https://<preview-deployment>.vercel.app`
