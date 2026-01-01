# GitHub Copilot Instructions for CodeCraft Labs

## 🏗️ Workspace Overview

**CodeCraft Labs** is a TypeScript monorepo containing:
- `apps/portfolio` - Personal portfolio (Next.js)
- `apps/youtube-studio` - YouTube video creation UI (Next.js + React)
- `apps/web` - Main website
- `packages/ui` - Shared UI components
- `packages/yt-api-client` - API client for yt-studio backend

**Tech Stack:**
- Framework: Next.js 15+ with App Router
- Language: TypeScript (strict mode)
- Package Manager: pnpm (workspace mode)
- Styling: Tailwind CSS
- Build Tool: Turbo
- Code Quality: Biome (formatter + linter)

---

## 🎯 CRITICAL RULES

### 1. Always Use TypeScript Best Practices

```typescript
// ✅ GOOD - Proper typing
interface VideoConfig {
  title: string;
  duration: number;
  quality: 'low' | 'medium' | 'high';
}

// ❌ BAD - Using any
const config: any = { ... }
```

### 2. Integration with yt-studio Backend

**Backend API runs at:** `http://localhost:8000`

**Key Endpoints:**
- `POST /api/videos/generate` - Create video
- `GET /api/videos/{id}/progress` - Check progress
- `GET /api/videos` - List videos
- `POST /api/voice-presets` - Manage voice presets

**Always:**
- Use the `yt-api-client` package (don't call API directly)
- Handle loading states and errors
- Show progress updates via WebSocket

### 3. File Structure Convention

```
apps/youtube-studio/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── dashboard/    # Main dashboard views
│   │   ├── ui/          # Reusable UI components
│   │   └── video/       # Video-specific components
│   ├── lib/             # Utilities and constants
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript type definitions
```

### 4. State Management Pattern

```typescript
// ✅ GOOD - Use React hooks for local state
const [isGenerating, setIsGenerating] = useState(false);

// For complex state, use useReducer
const [state, dispatch] = useReducer(videoReducer, initialState);

// For API calls, use React Query or SWR
const { data, error, isLoading } = useQuery(['videos'], fetchVideos);
```

### 5. Before Making Changes

**Ask yourself:**
- Does this affect the API contract with yt-studio backend?
- Do I need to update TypeScript types?
- Should this be a shared component in `packages/ui`?
- Do I need to update environment variables?

---

## 🔄 Common Workflows

### Adding a New Feature to YouTube Studio

1. **Read:** `apps/youtube-studio/README.md` for current architecture
2. **Check:** If backend API changes needed (coordinate with yt-studio)
3. **Create:** Component in appropriate directory
4. **Test:** Locally with backend running
5. **Update:** Types if API contract changed

### Creating a Shared UI Component

1. **Add to:** `packages/ui/src/components/`
2. **Export from:** `packages/ui/src/index.ts`
3. **Document:** Props with TypeScript interfaces
4. **Test:** In Storybook (if available) or consumer app

### Updating API Client

```bash
# From codecraft-labs root
cd packages/yt-api-client
# Edit src/client.ts
pnpm build
# Test in youtube-studio app
cd ../../apps/youtube-studio
pnpm dev
```

---

## 🧪 Testing & Quality

### Running Tests

```bash
# Format code
pnpm biome format --write .

# Lint code
pnpm biome check --write .

# Type check
pnpm tsc --noEmit

# Build all packages
pnpm turbo build

# Run dev server for youtube-studio
pnpm --filter youtube-studio dev
```

### Before Committing

```bash
# Run all checks
pnpm biome check --write .
pnpm turbo build

# Ensure backend integration works
# 1. Start yt-studio backend: cd ../yt-studio && ./start-api.sh
# 2. Test in UI: pnpm --filter youtube-studio dev
```

---

## 🚫 NEVER DO THIS

1. **Don't use `npm` or `yarn`** - Always use `pnpm`
2. **Don't import from `../../`** - Use package aliases
3. **Don't bypass TypeScript** - No `@ts-ignore` without explanation
4. **Don't hardcode API URLs** - Use environment variables
5. **Don't create inline styles** - Use Tailwind classes

---

## 💡 Helpful Commands

```bash
# Install dependencies
pnpm install

# Add dependency to specific app
pnpm --filter youtube-studio add react-query

# Clean and rebuild
pnpm clean && pnpm install && pnpm turbo build

# Run multiple apps
pnpm turbo dev --filter=youtube-studio --filter=web

# Check workspace structure
pnpm list --depth 0
```

---

## 🔗 Related Workspaces

**yt-studio** (`../yt-studio/`):
- Python backend API
- Video generation pipeline
- Runs on `http://localhost:8000`
- See its `.github-copilot-instructions.md` for backend changes

**Coordination Points:**
- API contracts in `apps/youtube-studio/src/types/api.ts`
- Voice presets must match backend schema
- Video quality settings must align with pipeline
- Progress WebSocket events must match backend

---

## 📚 Quick Reference

- **Package Manager:** `pnpm`
- **Node Version:** Check `.nvmrc` or `package.json` engines
- **Backend API:** `http://localhost:8000` (yt-studio)
- **Frontend Dev:** `http://localhost:3000` (youtube-studio)
- **Linter/Formatter:** Biome
- **Build Tool:** Turbo

---

## 🎯 When in Doubt

1. Check TypeScript types first
2. Look at existing similar components
3. Test with real backend API
4. Ask about API contract changes
5. Keep changes focused and atomic
