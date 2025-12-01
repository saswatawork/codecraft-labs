# Deployment Guide

This guide covers deploying CodeCraft Labs applications and the component library to Vercel.

## 📦 What to Deploy

### 1. Portfolio Application (`apps/portfolio`)
- **URL**: https://your-portfolio.vercel.app
- **Purpose**: Personal portfolio showcasing projects and skills
- **Framework**: Next.js 16
- **Features**: SSG, optimized images, SEO

### 2. Component Library Storybook (`packages/ui`)
- **URL**: https://ccl-ui.vercel.app
- **Purpose**: Public component documentation
- **Framework**: Storybook 8
- **Features**: Component showcase, interactive examples

## 🚀 Deployment Steps

### Portfolio Deployment

1. **Connect Repository to Vercel**
   ```bash
   # Install Vercel CLI
   pnpm add -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link project
   cd apps/portfolio
   vercel link
   ```

2. **Configure Project Settings**
   - Framework Preset: `Next.js`
   - Root Directory: `apps/portfolio`
   - Build Command: `pnpm --filter @ccl/ui build && pnpm --filter portfolio build`
   - Output Directory: `.next`
   - Install Command: `pnpm install --frozen-lockfile`

3. **Environment Variables**
   No environment variables required for basic deployment.

4. **Deploy**
   ```bash
   # Production deployment
   vercel --prod
   
   # Preview deployment
   vercel
   ```

### Storybook Deployment

1. **Connect Repository to Vercel**
   ```bash
   cd packages/ui
   vercel link
   ```

2. **Configure Project Settings**
   - Framework Preset: `Other`
   - Root Directory: `packages/ui`
   - Build Command: `cd ../.. && pnpm install && pnpm --filter=@ccl/ui build-storybook`
   - Output Directory: `storybook-static`
   - Install Command: `cd ../.. && pnpm install`

3. **Deploy**
   ```bash
   vercel --prod
   ```

## ✅ Pre-Deployment Checklist

### Portfolio
- [x] Build succeeds locally: `pnpm --filter portfolio build`
- [x] All TypeScript errors resolved
- [x] SEO meta tags configured
- [x] Images optimized
- [x] Custom 404 page included
- [x] vercel.json configured

### Storybook
- [x] Storybook builds successfully: `pnpm --filter @ccl/ui build-storybook`
- [x] All stories render correctly
- [x] No console errors
- [x] vercel.json configured

## 🔧 Vercel Configuration Files

### Portfolio (`apps/portfolio/vercel.json`)
```json
{
  "framework": "nextjs",
  "installCommand": "pnpm install --frozen-lockfile",
  "buildCommand": "pnpm --filter @ccl/ui build && pnpm --filter portfolio build"
}
```

### Storybook (`packages/ui/vercel.json`)
```json
{
  "buildCommand": "cd ../.. && pnpm install && pnpm --filter=@ccl/ui build-storybook",
  "outputDirectory": "storybook-static",
  "installCommand": "cd ../.. && pnpm install",
  "framework": null,
  "public": false
}
```

## 🎯 Build Verification

Before deploying, verify builds locally:

```bash
# Verify portfolio build
cd apps/portfolio
pnpm build
# Should complete without errors

# Verify Storybook build
cd packages/ui
pnpm build-storybook
# Should create storybook-static/ directory

# Verify UI package build
cd packages/ui
pnpm build
# Bundle: 157.07 KB (ESM), 70.61 KB (CJS)

# Run all tests
cd packages/ui
pnpm test
# Should show: 355 tests passing
```

## 📊 Expected Build Output

### Portfolio
```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /blog

○  (Static)  prerendered as static content
```

### UI Package
```
dist/index.mjs  157.07 KB │ gzip: 30.91 KB
dist/index.js   70.61 KB  │ gzip: 20.97 KB
```

## 🔍 Post-Deployment Verification

After deploying, check:

### Portfolio
- [ ] Homepage loads correctly
- [ ] Hero section displays properly
- [ ] Projects section renders with cards
- [ ] Navigation works
- [ ] Responsive design on mobile
- [ ] Page load speed < 3s
- [ ] Lighthouse score > 90

### Storybook
- [ ] All components load
- [ ] Interactive controls work
- [ ] Stories render correctly
- [ ] Search functionality works
- [ ] Responsive on all devices

## 🐛 Troubleshooting

### Build Fails - "Cannot find module @ccl/ui"
**Solution**: Ensure build command includes UI package build:
```json
"buildCommand": "pnpm --filter @ccl/ui build && pnpm --filter portfolio build"
```

### Storybook Build Fails - "pnpm not found"
**Solution**: Vercel needs to install from root:
```json
"installCommand": "cd ../.. && pnpm install"
```

### Build Succeeds but Pages Don't Load
**Solution**: Check outputDirectory in vercel.json matches build output

### TypeScript Errors in Production
**Solution**: Run `pnpm typecheck` locally to catch errors before deploying

## 📈 Performance Optimization

### Already Implemented
- [x] Image optimization with Next.js Image component
- [x] Static page generation (SSG)
- [x] Bundle size optimization (157 KB)
- [x] Tree-shaking enabled
- [x] CSS optimization
- [x] Font optimization

### Recommended Settings in Vercel Dashboard
- Enable "Automatically optimize images"
- Enable "Compression" (Gzip/Brotli)
- Set appropriate Cache-Control headers
- Enable "Speed Insights"

## 🔐 Security

### Implemented
- [x] Security headers configured
- [x] TypeScript strict mode
- [x] Dependencies audited
- [x] No sensitive data in code

### Vercel Security Settings
- Enable "Branch Protection"
- Set deployment protection rules
- Enable "Deployment Protection"
- Configure CORS if needed

## 📚 Additional Resources

- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Storybook Deployment Guide](https://storybook.js.org/docs/react/sharing/publish-storybook)

## 🎉 Success Criteria

Deployment is successful when:
- ✅ Portfolio builds and deploys without errors
- ✅ Storybook builds and deploys without errors
- ✅ All pages load correctly
- ✅ Performance metrics are green
- ✅ No console errors in production
- ✅ Responsive design works on all devices
- ✅ SEO meta tags are present

---

Built with ❤️ by Saswata Pal
