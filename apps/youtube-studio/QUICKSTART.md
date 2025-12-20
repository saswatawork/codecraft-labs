# YouTube Studio - Quick Start Guide

## One Command to Rule Them All

Run the master startup script to launch the entire YouTube Studio application:

```bash
cd /Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio
./start-studio.sh
```

This script will:
1. ✅ Check prerequisites (Python, Node.js, pnpm)
2. ✅ Install all dependencies (backend + frontend)
3. ✅ Create environment files if missing
4. ✅ Start FastAPI backend (port 8000)
5. ✅ Start Next.js frontend (port 3000)
6. ✅ Auto-open browser to http://localhost:3000

## What Gets Started

### Backend API (Port 8000)
- FastAPI server with auto-reload
- WebSocket support for real-time progress
- API documentation at http://localhost:8000/docs
- Logs: `/tmp/yt-studio-backend.log`

### Frontend App (Port 3000)
- Next.js 15 with App Router
- React 19 with Server Components
- TanStack Query for data fetching
- NextAuth.js for authentication (optional OAuth)
- Logs: `/tmp/yt-studio-frontend.log`

## End-to-End Testing Flow

Once the application starts, you can test:

### 1. Create Video Flow
- Navigate to http://localhost:3000 (auto-redirects to dashboard)
- Fill out the "Create Video" form:
  - Choose input type (URL or Description)
  - Enter title and description
  - Select language (12 options available)
  - Choose a voice profile (or use default)
  - Configure audio settings (presets or custom)
- Click "Generate Video"
- Should see success toast and redirect to library

### 2. Video Library
- Navigate to `/dashboard/library`
- See all videos in a responsive grid
- Search for videos using the search bar
- Check status badges (draft, processing, ready, etc.)
- Test action buttons (Edit, Captions, Publish, Delete)

### 3. Voice Library
- Navigate to `/dashboard/voices`
- Upload a custom voice profile
- See voice cards with metadata
- Test delete functionality

### 4. Audio Settings
- In Create Video page, explore audio presets:
  - 🎙️ Podcast
  - 📚 Tutorial
  - 🚀 Promo
  - 🎬 Documentary
  - 🧘 Meditation
  - 📹 Vlog
- Switch to "Custom" tab for granular controls

## Stopping the Application

Press `Ctrl+C` in the terminal running the script. This will gracefully shut down both services.

## Troubleshooting

### Backend won't start
```bash
# Check logs
tail -f /tmp/yt-studio-backend.log

# Common issues:
# - Port 8000 already in use: kill the process or change API_PORT in .env
# - Missing dependencies: run pip install -r api/requirements.txt
```

### Frontend won't start
```bash
# Check logs
tail -f /tmp/yt-studio-frontend.log

# Common issues:
# - Port 3000 already in use: kill the process or change PORT
# - Dependencies issue: run pnpm install in workspace root
```

### Environment variables missing
The script auto-creates `.env` files if missing. You can manually edit:

**Frontend** (`apps/youtube-studio/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret
```

**Backend** (`yt-studio/api/.env`):
```env
API_HOST=0.0.0.0
API_PORT=8000
```

## Manual Start (Alternative)

If you prefer to start services separately:

### Backend
```bash
cd /Users/saswatapal/workspace/yt-studio
./start-api.sh
```

### Frontend
```bash
cd /Users/saswatapal/workspace/codecraft-labs
pnpm dev
```

## Features to Test

### ✅ Phase 1 & 2 (Available Now)
- [x] User authentication (NextAuth.js)
- [x] Create video form with all options
- [x] Video library with search
- [x] Voice profile management
- [x] Audio settings (presets + custom)
- [x] Toast notifications
- [x] Loading states
- [x] Responsive design
- [x] API integration via TanStack Query

### ⏳ Coming Next (Phase 4+)
- [ ] Real-time video generation progress
- [ ] Video preview/playback
- [ ] Edit video functionality
- [ ] Captions editor
- [ ] Publish to YouTube
- [ ] Database persistence
- [ ] Background job queue

## API Endpoints

Test the API directly:

- **GET** `/api/videos` - List all videos
- **POST** `/api/videos` - Create a video
- **GET** `/api/videos/{id}` - Get video details
- **PATCH** `/api/videos/{id}` - Update video
- **DELETE** `/api/videos/{id}` - Delete video
- **GET** `/api/voices` - List voice profiles
- **POST** `/api/voices` - Upload voice (multipart)
- **WS** `/api/progress/{id}` - Real-time progress (WebSocket)

Full API documentation: http://localhost:8000/docs

## Development Tips

1. **Hot Reload**: Both services support hot reload - changes reflect automatically
2. **API Docs**: Use Swagger UI at `/docs` to test API endpoints
3. **React DevTools**: Install browser extension for component debugging
4. **TanStack Query DevTools**: Already integrated - check bottom of screen

Enjoy testing YouTube Studio! 🚀
