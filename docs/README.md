# CodeCraft Labs Documentation

Welcome to the comprehensive documentation for CodeCraft Labs. All project documentation is organized here for easy navigation.

## 📚 Documentation Structure

```
docs/
├── README.md                    # This file - documentation index
├── planning/                    # Blog content planning
├── guides/                      # How-to guides & setup instructions
└── architecture/                # Design system architecture
```

---

## 🗺️ Blog Planning

**The only planning docs still relevant post-cleanup**

- [Blog Content Strategy](./planning/BLOG-CONTENT-STRATEGY.md)
- [Blog Topics Summary](./planning/BLOG-TOPICS-SUMMARY.md)
- [Blog Content Roadmap (Visual)](./planning/BLOG-CONTENT-ROADMAP-VISUAL.md)

The prior 90-day transformation checklist, 12-week roadmap, and weekly sprint
docs were removed — they described a NestJS/Prisma backend + generic AI chatbot
plan that was never built and is no longer the plan. `youtube-studio` (the app
those docs were building toward) and its unused duplicate `web` app have been
removed from this repo; the real video pipeline lives at `~/workspace/video-studio`.

---

## 📖 Guides

**Setup instructions, contribution guidelines, and how-to guides**

- [**Setup Guide**](./guides/SETUP.md)  
  Development environment setup and installation instructions

- [**Contributing Guide**](../CONTRIBUTING.md)  
  How to contribute to the project, code standards, and workflow

- [**Storybook Setup**](./guides/STORYBOOK_SETUP.md)  
  Component documentation and Storybook configuration

- [**Deployment Guide**](./guides/DEPLOYMENT.md)  
  Production deployment instructions for Vercel and other platforms

---

## 🏗️ Architecture

**System design, architectural decisions, and design system documentation**

- [**Design System Analysis**](./architecture/DESIGN_SYSTEM_ANALYSIS.md)  
  Comprehensive analysis of the component library architecture

- [**Design System Implementation**](./architecture/DESIGN_SYSTEM_IMPLEMENTATION_SUMMARY.md)  
  Implementation details and patterns used in @ccl/ui

- [**Design Inspiration**](./architecture/DESIGN_INSPIRATION_ANALYSIS.md)  
  Research and inspiration for design system decisions

- [**Portfolio Refactor Strategy**](./architecture/PORTFOLIO_REFACTOR_STRATEGY.md)  
  Strategy and planning for portfolio architecture refactor

- [**Portfolio Refactoring Complete**](./architecture/PORTFOLIO_REFACTORING_COMPLETE.md)  
  Post-refactor summary and lessons learned

---

## 🚀 Quick Links

### For New Contributors
1. Start with [Setup Guide](./guides/SETUP.md)
2. Read [Contributing Guide](../CONTRIBUTING.md)
3. Review [Design System Analysis](./architecture/DESIGN_SYSTEM_ANALYSIS.md)

### For Understanding the Project
1. Read the [root README](../README.md)
2. Review [Design System Analysis](./architecture/DESIGN_SYSTEM_ANALYSIS.md)

### For Technical Details
1. See [Design System Implementation](./architecture/DESIGN_SYSTEM_IMPLEMENTATION_SUMMARY.md)
2. Review [Storybook Setup](./guides/STORYBOOK_SETUP.md)

---

## 📝 Root-Level Documentation

Some documentation remains in the root directory for visibility and convention:

- [**README.md**](../README.md) - Main project README
- [**CHANGELOG.md**](../CHANGELOG.md) - Version history and release notes
- [**SECURITY.md**](../SECURITY.md) - Security policies and vulnerability reporting
- [**LICENSE**](../LICENSE) - Project license (MIT)

---

## 🔄 Documentation Updates

This documentation is actively maintained and updated as the project evolves. Last major reorganization: July 3, 2026 (removed stale youtube-studio/web apps and their planning docs).

**Contributing to Docs:**
- Keep documentation up-to-date with code changes
- Follow the organizational structure above
- Use clear headings and examples
- Include links between related docs

---

## 📚 External Resources

### Design System
- [Storybook Deployment](https://ccl-ui.vercel.app)
- [Component Library Source](../packages/ui/src/components)

### Blog & Content
- [Blog Posts](../blog-posts/) - Technical articles and tutorials
- Dev.to: Coming soon
- Medium: Coming soon

### Apps
- [Portfolio App](../apps/portfolio/) - Personal portfolio
- [Portfolio Monitoring Guide](../apps/portfolio/MONITORING.md)

---

**Need help?** Open an issue or reach out via [LinkedIn](https://linkedin.com/in/saswatapal)

**Last Updated:** July 3, 2026
