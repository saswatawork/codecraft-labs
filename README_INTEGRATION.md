# YouTube Studio - Full Stack Integration

Complete integration of YouTube Studio UI, API Client, and Python Pipeline for automated video generation.

## 🎯 Quick Start

### Option 1: Automated Startup (macOS)
```bash
cd /Users/saswatapal/workspace/codecraft-labs
./start-youtube-studio.sh
```

This will automatically open two Terminal windows:
- Terminal 1: Backend API (http://localhost:8000)
- Terminal 2: Frontend UI (http://localhost:3000)

### Option 2: Manual Startup

**Terminal 1 - Backend API:**
```bash
cd /Users/saswatapal/workspace/yt-studio
source .pipeline_venv/bin/activate
cd api
python server.py
```

**Terminal 2 - Frontend UI:**
```bash
cd /Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio
pnpm dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      System Overview                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐                                       │
│  │  Next.js Frontend│  (Port 3000)                          │
│  │  youtube-studio  │                                       │
│  └────────┬─────────┘                                       │
│           │                                                  │
│           │ Uses @ccl/yt-api-client                         │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │  TypeScript      │  (Package)                            │
│  │  API Client      │                                       │
│  └────────┬─────────┘                                       │
│           │                                                  │
│           │ HTTP/WebSocket                                  │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │  FastAPI Backend │  (Port 8000)                          │
│  │  yt-studio/api   │                                       │
│  └────────┬─────────┘                                       │
│           │                                                  │
│           │ Subprocess                                      │
│           ▼                                                  │
│  ┌──────────────────┐                                       │
│  │  Python Pipeline │                                       │
│  │  yt-pipeline.py  │                                       │
│  └──────────────────┘                                       │
│           │                                                  │
│           ├─→ ChatterBox TTS (Voiceover)                    │
│           ├─→ AI/Parser (Slides)                            │
│           └─→ FFmpeg (Video Assembly)                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

```
codecraft-labs/
├── apps/
│   └── youtube-studio/              # Next.js Frontend
│       ├── .env.local               # API_URL configuration
│       ├── src/
│       │   ├── components/          # UI components
│       │   │   └── dashboard/       # Main views
│       │   ├── hooks/
│       │   │   └── use-api.ts      # API client hooks
│       │   └── lib/
│       │       └── types.ts        # TypeScript types
│       └── package.json
│
├── packages/
│   └── yt-api-client/              # TypeScript API Client
│       ├── src/
│       │   ├── client.ts           # API methods
│       │   ├── types.ts            # Zod schemas
│       │   └── index.ts            # Public exports
│       └── package.json
│
├── INTEGRATION_STRATEGY.md         # 📘 Detailed architecture
├── IMPLEMENTATION_SUMMARY.md       # ✅ What we built
├── start-youtube-studio.sh         # 🚀 Quick launch script
└── test-integration.sh             # 🧪 Integration test

workspace/yt-studio/                # Python Pipeline Backend
├── api/
│   ├── server.py                   # FastAPI application
│   ├── routes/
│   │   ├── videos.py              # Video endpoints
│   │   ├── voices.py              # Voice endpoints
│   │   └── progress.py            # WebSocket progress
│   ├── services/
│   │   ├── video_service.py       # Video business logic ⚡ UPDATED
│   │   └── voice_service.py       # Voice business logic ⚡ UPDATED
│   └── models/
│       └── __init__.py            # Pydantic models
│
├── yt-pipeline.py                 # Unified pipeline CLI
├── config.yaml                    # Configuration
├── voiceover/                     # ChatterBox TTS
├── ppt-generator/                 # Slide generation
├── video-studio/                  # Video assembly
└── outputs/
    ├── scripts/                   # Generated scripts
    ├── audio/                     # Generated audio
    │   └── references/            # ⚡ NEW: Uploaded voices
    ├── slides/                    # Generated slides
    └── videos/                    # Final videos
```

---

## 🔧 Components

### 1. Frontend UI (Next.js)
**Location:** `codecraft-labs/apps/youtube-studio`

**Features:**
- ✅ Video Library (list, filter, play, download)
- ✅ Create Video (URL/description input)
- ✅ Voice Library (upload custom voices)
- ✅ Audio Settings (tempo, emotion, theme)
- ✅ Real-time progress tracking
- ✅ Responsive design

**Tech Stack:**
- Next.js 15 + React 19
- TanStack Query for data fetching
- NextAuth for authentication
- Radix UI components
- TypeScript + Tailwind CSS

### 2. API Client Package (TypeScript)
**Location:** `codecraft-labs/packages/yt-api-client`

**Features:**
- ✅ Type-safe API client
- ✅ Zod schema validation
- ✅ Video CRUD operations
- ✅ Voice management
- ✅ WebSocket progress subscription
- ✅ Automatic retries & error handling

**Usage:**
```typescript
import { YouTubeStudioAPI } from '@ccl/yt-api-client';

const client = new YouTubeStudioAPI({
  baseUrl: 'http://localhost:8000',
  getAccessToken: async () => session?.accessToken || null,
});

// Create video
const video = await client.videos.create({
  title: "My Video",
  description: "Test video",
  scriptContent: "Hello world...",
  language: "en",
  audioSettings: { tempo: 1.0, emotion: "neutral", ... }
});

// Upload voice
const formData = new FormData();
formData.append("name", "My Voice");
formData.append("audio", audioFile);
const voice = await client.voices.create(formData);
```

### 3. Backend API (FastAPI)
**Location:** `yt-studio/api`

**Features:**
- ✅ RESTful API endpoints
- ✅ WebSocket for real-time updates
- ✅ Background job processing
- ✅ File upload handling
- ✅ CORS configuration
- ✅ Pipeline orchestration

**Endpoints:**
```
POST   /api/videos              Create video
GET    /api/videos              List videos
GET    /api/videos/:id          Get video details
PATCH  /api/videos/:id          Update video
DELETE /api/videos/:id          Delete video
POST   /api/videos/:id/regenerate  Regenerate video
GET    /api/videos/:id/download    Download video

GET    /api/voices              List voices
POST   /api/voices              Upload voice
GET    /api/voices/:id          Get voice
DELETE /api/voices/:id          Delete voice

WS     /api/progress/:id        Progress updates
```

### 4. Python Pipeline
**Location:** `yt-studio/yt-pipeline.py`

**Features:**
- ✅ Unified CLI for video generation
- ✅ ChatterBox TTS voice cloning
- ✅ AI-powered slide generation
- ✅ FFmpeg video assembly
- ✅ Progress tracking
- ✅ Resume capability
- ✅ Multiple quality profiles

**Profiles:**
- `fast` - Quick generation (10-15 min)
- `quality` - High quality (15-20 min)
- `debug` - Verbose logging

---

## 🚀 Usage Guide

### Creating a Video

1. **Open Frontend**
   ```
   http://localhost:3000
   ```

2. **Navigate to "Create Video"**

3. **Fill in Details:**
   - Title: "My First Video"
   - Description: "Testing the system"
   - Script: 
     ```
     Welcome to my channel!
     
     Today I'll show you something amazing.
     
     Artificial intelligence can now create videos automatically.
     
     Thanks for watching!
     ```

4. **Configure Settings:**
   - Language: English
   - Voice: Default (or upload custom)
   - Tempo: 1.0 (normal speed)
   - Emotion: Neutral
   - Theme: None

5. **Click "Generate Video"**

6. **Monitor Progress:**
   - Redirects to Library page
   - Shows real-time progress
   - Updates every few seconds

7. **Download & Watch:**
   - Click download when ready
   - Video saved as MP4

### Uploading a Custom Voice

1. **Navigate to "Voice Library"**

2. **Click "Upload Voice"**

3. **Prepare Audio:**
   - Format: WAV, MP3, or M4A
   - Duration: 30-60 seconds recommended
   - Quality: Clear speech, minimal background noise
   - Content: Natural speaking voice

4. **Upload:**
   - Enter name (e.g., "Professional Narrator")
   - Select file
   - Click "Upload Voice"

5. **Use in Videos:**
   - Select voice in Create Video form
   - Pipeline will use your voice for cloning

---

## 🧪 Testing

### Run Integration Test
```bash
cd /Users/saswatapal/workspace/codecraft-labs
./test-integration.sh
```

This checks:
- ✅ Dependencies installed
- ✅ Directory structure
- ✅ Services running
- ✅ API endpoints responding
- ✅ Output directories ready

### Manual API Tests
```bash
# Health check
curl http://localhost:8000/health

# List videos
curl http://localhost:8000/api/videos

# Create video
curl -X POST http://localhost:8000/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "description": "Test video",
    "scriptContent": "Hello world",
    "language": "en",
    "audioSettings": {
      "tempo": 1.0,
      "emotion": "neutral",
      "theme": "none",
      "volume": 80
    }
  }'
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python environment
cd /Users/saswatapal/workspace/yt-studio
source .pipeline_venv/bin/activate
pip install -r requirements.txt
cd api
pip install -r requirements.txt

# Check port
lsof -i :8000  # Kill if occupied
```

### Frontend won't start
```bash
# Reinstall dependencies
cd /Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio
pnpm install

# Clear cache
rm -rf .next
pnpm dev
```

### Video generation fails
```bash
# Check logs
tail -f /tmp/yt-studio/*.log

# Check output directories
ls -la /Users/saswatapal/workspace/yt-studio/outputs/

# Test pipeline manually
cd /Users/saswatapal/workspace/yt-studio
python3 yt-pipeline.py validate test-video
```

### Voice upload fails
```bash
# Check directory permissions
ls -la /Users/saswatapal/workspace/yt-studio/outputs/audio/references/

# Check file format
file your-audio.wav

# Convert if needed
ffmpeg -i input.mp3 -ar 22050 -ac 1 output.wav
```

---

## 📚 Documentation

- **[INTEGRATION_STRATEGY.md](./INTEGRATION_STRATEGY.md)** - Complete architecture & integration plan
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What we built & how it works
- **[API Client Docs](./apps/youtube-studio/API_CLIENT.md)** - TypeScript client usage
- **[Pipeline README](../yt-studio/README.md)** - Python pipeline guide
- **[Architecture Deep Dive](../yt-studio/ARCHITECTURE.md)** - Pipeline internals

---

## 🎯 What's Next?

### Critical TODOs
- [ ] **Database Migration** - Replace in-memory storage with PostgreSQL
- [ ] **Authentication** - Implement real user auth with NextAuth
- [ ] **Voice Profile Integration** - Add `--voice-ref` parameter to pipeline
- [ ] **Error Recovery** - Better retry logic and error messages

### Enhancements
- [ ] Video thumbnails
- [ ] Caption generation
- [ ] Multi-language support
- [ ] Batch processing queue
- [ ] File cleanup policies
- [ ] Rate limiting
- [ ] Monitoring & analytics

### Deployment
- [ ] Docker containers
- [ ] CI/CD pipeline
- [ ] Cloud file storage (S3)
- [ ] Production environment
- [ ] SSL certificates
- [ ] Domain setup

---

## 🤝 Contributing

### Development Setup
```bash
# Clone repo
git clone <repo-url>

# Install frontend dependencies
cd codecraft-labs
pnpm install

# Install backend dependencies
cd ../yt-studio
python3 -m venv .pipeline_venv
source .pipeline_venv/bin/activate
pip install -r requirements.txt
cd api
pip install -r requirements.txt
```

### Making Changes
1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request

### Code Style
- **TypeScript:** ESLint + Prettier
- **Python:** Black + isort + flake8
- **Commits:** Conventional commits

---

## 📄 License

MIT License - See LICENSE file for details

---

## 💬 Support

- **Issues:** GitHub Issues
- **Email:** support@example.com
- **Docs:** [Documentation](./docs/)

---

**Built with ❤️ by the YouTube Studio Team**
