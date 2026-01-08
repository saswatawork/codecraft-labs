# Intelligent Prompts UI Toggle

## Overview

You can now control the **Intelligent Prompt System** directly from the YouTube Studio UI without needing to set environment variables!

## What It Does

The Intelligent Prompt System uses a 5-layer AI analysis to generate context-aware, narrative-aligned images for your videos:

**Standard Mode** (Basic):
- Keyword-based image generation
- Simple prompts like "professional photo of education"
- Fast but less contextual

**Intelligent Mode** (Advanced):
- Visual theme integration
- Story context analysis
- Segment understanding
- 5-layer prompt enhancement
- Generates prompts like: "Close-up macro photograph of vibrant green leaf with visible veins and water droplets, shallow depth of field, natural lighting, educational documentary style"

## How to Use It

### From the UI (Recommended)

1. **Create a new video** in YouTube Studio
2. **Enable Cinematic Mode** (required for images)
3. **Enable AI Story Images** toggle
4. **Select your Visual Theme** (e.g., Education, Technology, Sports)
5. **Toggle "Intelligent Prompts"** - ON by default ✅

![Intelligent Prompts Toggle Location]
The toggle appears right after the Visual Theme selector with a 🧠 brain icon.

### Per-Video Control

Each video can have different settings:
- **Video A**: Intelligent Prompts ON → Context-aware images
- **Video B**: Intelligent Prompts OFF → Standard images
- No need to restart the server between videos!

### Default Behavior

- **Default**: Intelligent Prompts are **ON** (enabled by default)
- **Recommendation**: Keep it ON for best results
- **When to turn OFF**: If you want simple keyword-based generation or faster processing

## Technical Details

### Frontend → Backend Flow

```typescript
// UI Component (CreateVideoView)
const [useIntelligentPrompts, setUseIntelligentPrompts] = useState(true);

// Sent to API
onGenerate({
  visualTheme: 'education',
  useIntelligentPrompts: true, // ← User's choice
});
```

### Backend Processing

```python
# Pipeline Orchestrator checks user preference first
use_intelligent_prompts = getattr(video_metadata, 'use_intelligent_prompts', None)
if use_intelligent_prompts is None:
    # Fallback to environment variable
    use_intelligent_prompts = os.getenv('USE_INTELLIGENT_PROMPTS', 'false').lower() == 'true'

if use_intelligent_prompts:
    return await self._generate_images_intelligent(video_metadata)
else:
    return await self._generate_images_standard(video_metadata)
```

### Priority Order

1. **User's UI toggle** (highest priority)
2. **Environment variable** `USE_INTELLIGENT_PROMPTS` (fallback)
3. **Default**: `false` if nothing is set

## Environment Variable (Legacy Method)

You can still use the environment variable for global control:

```bash
# Enable for all videos (unless overridden by UI)
export USE_INTELLIGENT_PROMPTS=true
./start-api.sh
```

But the **UI toggle is more flexible** since it allows per-video control!

## Visual Theme Integration

When Intelligent Prompts is ON, the system considers your selected Visual Theme:

| Visual Theme | AI Behavior |
|--------------|-------------|
| 🌅 General/Nature | Calm, artistic, nature imagery |
| 🏏 Sports | Athletic, dynamic, stadium scenes |
| 🏥 Medical | Clinical, healthcare, scientific |
| 💼 Business | Corporate, office, professional |
| 🔬 Technology | Computers, AI, innovation |
| 📚 Education | Classroom, learning, instructional |
| 🎨 Creative | Artistic, design, music |
| 🌿 Nature | Landscapes, outdoor, environmental |
| 💰 Finance | Money, banking, investment |
| 🧠 Psychology | Mental health, emotions |
| 🕉️ Spirituality | Meditation, mindfulness |

## Cost Impact

- **Standard Mode**: $0.000 (no AI prompts)
- **Intelligent Mode**: ~$0.008 per video (5 segments × ~$0.0016/call)
- **Caching**: 20-30% cost reduction with intelligent cache

Total: **< 1 cent** per video for significantly better image quality!

## Testing

### Test Intelligent Mode ON

1. Create video with topic: "Photosynthesis in plants"
2. Select Visual Theme: "Education"
3. **Ensure "Intelligent Prompts" toggle is ON** ✅
4. Generate video
5. Check logs for: `🧠 Using INTELLIGENT PROMPT SYSTEM (multi-layer intelligence)`

### Test Intelligent Mode OFF

1. Create video with same topic
2. **Turn OFF "Intelligent Prompts" toggle** ❌
3. Generate video
4. Check logs for: `📖 Using STANDARD prompt generation (existing flow)`

### Compare Results

**Intelligent Mode** will generate prompts like:
```
Close-up macro photograph of vibrant green leaf with visible veins 
and water droplets, shallow depth of field, natural lighting, 
educational documentary style, professional photography
```

**Standard Mode** will generate:
```
professional photo of education
```

## Troubleshooting

### Toggle Not Visible?

- ✅ Make sure **Cinematic Mode** is enabled
- ✅ Make sure **AI Story Images** toggle is ON
- ✅ Check that you're in the "Create Video" form

### Not Using Intelligent Prompts?

Check backend logs:
```bash
tail -f /Users/saswatapal/workspace/yt-studio/logs/app.log | grep "INTELLIGENT\|STANDARD"
```

You should see:
```
🧠 Using INTELLIGENT PROMPT SYSTEM (multi-layer intelligence)
```

If you see:
```
📖 Using STANDARD prompt generation (existing flow)
```

Then the toggle might be OFF or there's an issue with passing the setting.

### Environment Variable Override

If you have `USE_INTELLIGENT_PROMPTS=false` in your environment, the UI toggle will still work - **UI preference takes priority!**

## Best Practices

1. **Keep Intelligent Prompts ON** for most videos - it's worth the tiny cost
2. **Choose an appropriate Visual Theme** - it guides the AI
3. **Test both modes** to see the quality difference
4. **Use Standard Mode** only if you need simple, fast generation

## Files Modified

### Frontend
- `apps/youtube-studio/src/components/dashboard/create-video-view.tsx` - Added UI toggle
- `apps/youtube-studio/src/app/dashboard/page.tsx` - Pass setting to API
- `apps/youtube-studio/src/lib/types.ts` - Added type definition
- `packages/yt-api-client/src/types.ts` - Added schema validation

### Backend
- `api/models/__init__.py` - Added `use_intelligent_prompts` field to VideoCreateRequest
- `src/infrastructure/pipeline_orchestrator.py` - Check user preference first

## Related Documentation

- [INTELLIGENT_PROMPTS_UI_INTEGRATION.md](INTELLIGENT_PROMPTS_UI_INTEGRATION.md) - Complete integration guide
- [ALL_PHASES_COMPLETE.md](../yt-studio/ALL_PHASES_COMPLETE.md) - Full intelligent prompt system docs
- [PHASE_4_COMPLETE.md](../yt-studio/PHASE_4_COMPLETE.md) - Intelligent caching implementation

## Summary

🎉 **You can now toggle Intelligent Prompts per video from the UI!**

- ✅ No environment variables needed
- ✅ Per-video control
- ✅ Default: ON (recommended)
- ✅ Works with Visual Themes
- ✅ < 1 cent per video
- ✅ Significantly better image quality

Just look for the **🧠 Intelligent Prompts** toggle in the Cinematic Mode section!
