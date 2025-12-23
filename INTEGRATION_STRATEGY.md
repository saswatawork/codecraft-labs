# YouTube Studio Integration Strategy

**Date:** December 21, 2025  
**Version:** 1.0  
**Status:** Planning → Implementation

---

## 📋 Executive Summary

This document outlines the integration strategy for connecting three critical components:

1. **youtube-studio UI** (Frontend - Next.js app in `codecraft-labs/apps/youtube-studio`)
2. **yt-api-client** (TypeScript API client in `codecraft-labs/packages/yt-api-client`)
3. **yt-studio** (Python pipeline in workspace root)

**Goal:** Enable the UI to trigger video generation via the API client, which orchestrates the Python pipeline, while supporting reference audio uploads.

---

## 🏗️ Current Architecture Analysis

### Component 1: youtube-studio UI (Frontend)
**Location:** `/Users/saswatapal/workspace/codecraft-labs/apps/youtube-studio`

**Capabilities:**
- ✅ Video Library View (list, filter, play, edit, delete videos)
- ✅ Create Video View (URL/description input, audio settings)
- ✅ Voice Library View (upload custom voices, manage voice profiles)
- ✅ Audio Settings (tempo, emotion, theme, volume controls)
- ✅ React Query hooks for API integration
- ✅ Real-time progress tracking via WebSocket

**Tech Stack:**
- Next.js 15, React 19
- TanStack Query for data fetching
- NextAuth for authentication
- Radix UI components
- TypeScript

**Missing:**
- ❌ Connection to actual backend API
- ❌ Reference audio upload to yt-studio pipeline
- ❌ Integration with yt-api-client package

### Component 2: yt-api-client (API Client Package)
**Location:** `/Users/saswatapal/workspace/codecraft-labs/packages/yt-api-client`

**Capabilities:**
- ✅ Type-safe API client class (`YouTubeStudioAPI`)
- ✅ Zod schema validation
- ✅ Video CRUD operations (create, list, get, update, delete, regenerate, download)
- ✅ Voice profile management (list, get, create, delete)
- ✅ WebSocket progress subscription
- ✅ Authentication token support

**Current State:**
- ✅ Fully implemented TypeScript client
- ✅ Exported from package for consumption
- ✅ Type definitions aligned with backend

**Missing:**
- ❌ Not connected to actual backend yet (expects backend at localhost:8000)
- ❌ No integration tests

### Component 3: yt-studio (Python Pipeline)
**Location:** `/Users/saswatapal/workspace/yt-studio`

**Capabilities:**
- ✅ Complete video generation pipeline (script → audio → slides → video)
- ✅ ChatterBox TTS voice cloning with reference audio
- ✅ AI-powered slide generation (Ollama) or parser-based
- ✅ FFmpeg video assembly
- ✅ FastAPI backend (`api/server.py`)
- ✅ Database models for videos and voices
- ✅ Progress tracking with WebSocket
- ✅ Background task processing

**Tech Stack:**
- Python 3.10+
- FastAPI for REST API
- SQLAlchemy for database
- ChatterBox TTS for voiceover
- FFmpeg for video encoding
- Ollama for AI features

**Current State:**
- ✅ FastAPI routes defined (`/api/videos`, `/api/voices`, `/api/progress`)
- ✅ Service layer for business logic
- ✅ Pipeline orchestration via `yt-pipeline.py`
- ✅ Reference audio support in config

**Missing:**
- ❌ Reference audio upload endpoint not implemented
- ❌ Integration with frontend auth
- ❌ Proper database persistence (currently in-memory)

---

## 🎯 Integration Objectives

### Phase 1: Backend Setup ✅ (Already Done)
- [x] FastAPI server with CORS
- [x] Video routes (`/api/videos/*`)
- [x] Voice routes (`/api/voices/*`)
- [x] Progress WebSocket (`/api/progress/:id`)

### Phase 2: Connect UI to API Client ⚡ (Current Focus)
- [ ] Wire up `useAPIClient` hook to use `@ccl/yt-api-client`
- [ ] Configure API base URL from environment
- [ ] Test video creation flow
- [ ] Test voice upload flow
- [ ] Implement progress tracking UI

### Phase 3: Reference Audio Upload 🎙️
- [ ] Add reference audio upload endpoint to backend
- [ ] Update voice service to handle reference audio
- [ ] Create reference audio UI component
- [ ] Link reference audio to video generation

### Phase 4: Pipeline Integration 🔧
- [ ] Connect backend video service to `yt-pipeline.py`
- [ ] Implement background job queue
- [ ] Add progress broadcasting via WebSocket
- [ ] Handle pipeline errors and retries

### Phase 5: Database & Persistence 💾
- [ ] Replace in-memory storage with SQLite/PostgreSQL
- [ ] Implement Alembic migrations
- [ ] Add file storage for videos/audio
- [ ] User authentication integration

---

## 🔌 Integration Points

### 1. Frontend → API Client
**File:** `codecraft-labs/apps/youtube-studio/src/hooks/use-api.ts`

**Current Implementation:**
```typescript
const apiClient = new YouTubeStudioAPI({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  getAccessToken: async () => session?.accessToken || null,
});
```

**Status:** ✅ Already implemented, needs backend URL configuration

**Action Items:**
- Set `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify auth token flow
- Test API calls

### 2. API Client → Backend API
**Client:** `codecraft-labs/packages/yt-api-client/src/client.ts`  
**Server:** `yt-studio/api/server.py`

**Endpoints Mapping:**
| Client Method | Backend Route | Status |
|--------------|---------------|--------|
| `videos.create()` | `POST /api/videos` | ✅ Implemented |
| `videos.list()` | `GET /api/videos` | ✅ Implemented |
| `videos.get(id)` | `GET /api/videos/:id` | ✅ Implemented |
| `videos.update(id)` | `PATCH /api/videos/:id` | ✅ Implemented |
| `videos.delete(id)` | `DELETE /api/videos/:id` | ✅ Implemented |
| `videos.regenerate(id)` | `POST /api/videos/:id/regenerate` | ✅ Implemented |
| `videos.download(id)` | `GET /api/videos/:id/download` | ✅ Implemented |
| `voices.list()` | `GET /api/voices` | ✅ Implemented |
| `voices.create()` | `POST /api/voices` | ✅ Implemented |
| `voices.delete(id)` | `DELETE /api/voices/:id` | ✅ Implemented |
| `subscribeToProgress()` | `WS /api/progress/:id` | ✅ Implemented |

**Action Items:**
- Test all endpoints
- Add error handling
- Implement retry logic

### 3. Backend API → Python Pipeline
**Service:** `yt-studio/api/services/video_service.py`  
**Pipeline:** `yt-studio/yt-pipeline.py`

**Current Gap:** Backend service needs to invoke pipeline

**Proposed Implementation:**
```python
async def generate_video(self, video_id: str):
    """Background task to generate video using pipeline"""
    video = await self.get_video(video_id)
    if not video:
        return
    
    try:
        # Update status
        video.status = VideoStatus.PROCESSING
        video.current_stage = GenerationStage.EXTRACTING_CONTENT
        await self.emit_progress(video_id, 0, "Starting generation...")
        
        # Write script to file
        script_path = f"outputs/scripts/{video_id}.txt"
        with open(script_path, 'w') as f:
            f.write(video.script_content)
        
        # Run pipeline
        result = subprocess.run(
            ["python3", "yt-pipeline.py", "run", video_id, "--profile", video.profile],
            capture_output=True,
            text=True,
            cwd="/Users/saswatapal/workspace/yt-studio"
        )
        
        if result.returncode == 0:
            video.status = VideoStatus.READY
            video.video_url = f"outputs/videos/{video_id}.mp4"
            await self.emit_progress(video_id, 100, "Video ready!")
        else:
            video.status = VideoStatus.ERROR
            video.error = result.stderr
            await self.emit_progress(video_id, 0, "Generation failed")
            
    except Exception as e:
        video.status = VideoStatus.ERROR
        video.error = str(e)
        logger.error(f"Pipeline error: {e}")
```

**Action Items:**
- Implement pipeline invocation in video service
- Add progress tracking hooks
- Handle voice profile reference audio
- Implement error recovery

### 4. Reference Audio Upload Flow

**Current State:**
- ✅ UI has voice upload component
- ✅ Voice API endpoint exists
- ❌ Backend doesn't connect to pipeline reference audio

**Proposed Flow:**
```
User uploads audio file (Voice Library UI)
    ↓
Frontend sends FormData to API client
    ↓
yt-api-client POSTs to /api/voices
    ↓
Backend saves audio to yt-studio/outputs/audio/references/{voice_id}.wav
    ↓
Updates config.yaml or passes to pipeline as parameter
    ↓
Pipeline uses reference audio for voice cloning
```

**Implementation Plan:**
1. Update voice service to save uploaded audio to correct location
2. Add reference audio parameter to video generation
3. Modify pipeline to accept voice profile ID
4. Use custom reference audio instead of default

---

## 📁 File Structure After Integration

```
codecraft-labs/
├── apps/
│   └── youtube-studio/          # Next.js Frontend
│       ├── .env.local           # API_URL=http://localhost:8000
│       ├── src/
│       │   ├── components/      # UI components ✅
│       │   ├── hooks/
│       │   │   └── use-api.ts   # Uses @ccl/yt-api-client ✅
│       │   └── lib/
│       └── package.json         # Depends on @ccl/yt-api-client ✅
│
└── packages/
    └── yt-api-client/           # TypeScript API Client
        ├── src/
        │   ├── client.ts        # API methods ✅
        │   └── types.ts         # Zod schemas ✅
        └── package.json         # Exports client ✅

workspace/yt-studio/             # Python Pipeline Backend
├── api/
│   ├── server.py               # FastAPI app ✅
│   ├── models/                 # Data models ✅
│   ├── routes/                 # API endpoints ✅
│   │   ├── videos.py          # Video CRUD ✅
│   │   ├── voices.py          # Voice CRUD ✅
│   │   └── progress.py        # WebSocket ✅
│   └── services/              # Business logic
│       ├── video_service.py   # Needs pipeline integration ⚡
│       └── voice_service.py   # Needs file storage ⚡
│
├── yt-pipeline.py             # Pipeline orchestrator ✅
├── config.yaml                # Configuration ✅
├── outputs/
│   ├── scripts/               # Generated scripts
│   ├── audio/                 # Generated audio
│   │   └── references/        # User uploaded voices (NEW)
│   ├── slides/                # Generated slides
│   └── videos/                # Final videos
└── voiceover/                 # Voice cloning engine ✅
```

---

## 🚀 Implementation Roadmap

### Week 1: Core Integration
**Days 1-2:** Backend-Pipeline Connection
- [ ] Implement pipeline invocation in video service
- [ ] Add progress tracking
- [ ] Test video generation end-to-end

**Days 3-4:** Reference Audio Upload
- [ ] Create reference audio storage directory
- [ ] Update voice service to save files
- [ ] Link voice profiles to video generation
- [ ] Test voice cloning with custom audio

**Day 5:** Testing & Bug Fixes
- [ ] Integration testing
- [ ] Error handling
- [ ] Performance optimization

### Week 2: Polish & Deploy
**Days 1-2:** Database Migration
- [ ] Set up PostgreSQL
- [ ] Create migrations
- [ ] Migrate data

**Days 3-4:** Production Setup
- [ ] Docker containers
- [ ] Environment variables
- [ ] Deployment scripts

**Day 5:** Documentation & Handoff
- [ ] API documentation
- [ ] User guide
- [ ] Admin guide

---

## 🔧 Technical Decisions

### 1. API Base URL Configuration
**Decision:** Use environment variables for flexibility
```env
# codecraft-labs/apps/youtube-studio/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# Production
NEXT_PUBLIC_API_URL=https://api.yourstudio.com
```

### 2. Reference Audio Storage
**Decision:** Store in yt-studio pipeline directory
```
yt-studio/outputs/audio/references/
├── {voice_id}_original.wav    # Original upload
└── {voice_id}_optimized.wav   # Processed for TTS
```

### 3. Pipeline Invocation Method
**Decision:** Subprocess call to Python CLI
- **Pros:** Uses existing battle-tested pipeline
- **Cons:** Slower than direct Python import
- **Alternative:** Import pipeline as library (future optimization)

### 4. Progress Tracking
**Decision:** Dual approach
- **Coarse:** Backend emits major stage updates
- **Fine:** Pipeline logs detailed progress
- **Transport:** WebSocket for real-time updates

### 5. Authentication
**Decision:** NextAuth → JWT → FastAPI
```typescript
// Frontend
session.accessToken → API client

// Backend
@app.middleware("http")
async def auth_middleware(request, call_next):
    token = request.headers.get("Authorization")
    # Verify JWT
```

---

## 📊 Success Metrics

### Functional
- [ ] User can create video from UI
- [ ] Video generation completes successfully
- [ ] Progress updates in real-time
- [ ] Custom voices work correctly
- [ ] Videos are downloadable

### Performance
- [ ] Video generation: < 15 minutes (fast mode)
- [ ] API response time: < 200ms
- [ ] WebSocket latency: < 100ms
- [ ] File upload: < 30 seconds

### Quality
- [ ] Error handling covers edge cases
- [ ] Logs are comprehensive
- [ ] TypeScript types are accurate
- [ ] API documentation is complete

---

## 🔒 Security Considerations

1. **File Upload Validation**
   - Limit file size (10MB for audio)
   - Validate MIME types
   - Scan for malware

2. **Authentication**
   - JWT token verification
   - User isolation (can't access others' videos)
   - Rate limiting on API endpoints

3. **File Access**
   - Serve files through API (not direct filesystem access)
   - Validate file paths to prevent traversal
   - Set proper permissions

---

## 📝 Next Steps

### Immediate Actions (Today)
1. ✅ Create this strategy document
2. ⚡ Set up backend API environment
3. ⚡ Configure frontend API URL
4. ⚡ Test first video creation flow

### This Week
1. Implement pipeline integration
2. Add reference audio upload
3. Test end-to-end flow
4. Fix bugs

### Next Week
1. Database migration
2. Production deployment
3. Documentation
4. User testing

---

## 🤝 Team Communication

### Questions to Resolve
1. Database choice: PostgreSQL vs SQLite?
2. File storage: Local vs S3/Cloud?
3. Deployment target: VPS vs Vercel/Railway?
4. Authentication: Email/password vs OAuth?

### Blockers
- None currently

### Risks
1. **Pipeline performance:** ChatterBox TTS is slow (~3-4 min/chunk)
   - **Mitigation:** Use queue system, show accurate time estimates
2. **File storage:** Large video files
   - **Mitigation:** Implement cleanup policy, use cloud storage
3. **Concurrent generations:** Resource contention
   - **Mitigation:** Limit concurrent jobs, add queue

---

**Document Owner:** GitHub Copilot  
**Last Updated:** December 21, 2025  
**Next Review:** After Phase 2 completion
