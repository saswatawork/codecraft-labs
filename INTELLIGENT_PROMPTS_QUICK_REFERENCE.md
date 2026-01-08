# Quick Reference: Intelligent Prompts Toggle

## 🎯 Where to Find It

```
Create Video Form
├── Cinematic Mode Toggle ← Enable this first
├── Cinematic Settings
│   ├── AI Story Images ← Enable this second
│   ├── Image Generator Selection
│   ├── Visual Theme Selection
│   │   └── 🌅 General / 🏏 Sports / 🏥 Medical / etc.
│   │
│   └── 🧠 Intelligent Prompts Toggle ← NEW! Right here!
│       ├── [Switch] ON/OFF
│       └── "5-layer AI analysis for context-aware images"
│
└── Voice Selection
```

## ⚡ Quick Start

### 3 Steps to Use Intelligent Prompts

1. **Enable Cinematic Mode** → Turn ON the main toggle
2. **Enable AI Story Images** → Keep images enabled
3. **Check Intelligent Prompts** → Should be ON by default ✅

### That's it! 🎉

## 🧠 What the Toggle Does

### When ON (Default) ✅
```
Your Input: "Photosynthesis in plants"
Visual Theme: Education

AI Generates:
"Close-up macro photograph of vibrant green leaf with 
visible veins and water droplets, shallow depth of field, 
natural lighting, educational documentary style, 
professional photography"
```

### When OFF ❌
```
Your Input: "Photosynthesis in plants"

AI Generates:
"professional photo of education"
```

## 📊 Comparison Table

| Feature | Standard Mode | Intelligent Mode |
|---------|--------------|------------------|
| Prompt Quality | Basic keywords | Context-aware narratives |
| Visual Theme Integration | ❌ No | ✅ Yes |
| Story Context | ❌ No | ✅ Yes |
| Segment Analysis | ❌ No | ✅ Yes |
| Cost per Video | $0.000 | ~$0.008 |
| Recommended | For speed | **For quality** ⭐ |

## 🎨 Visual Theme Examples

When Intelligent Prompts is ON, themes make a huge difference:

### Education Theme + Intelligent Prompts
```
"Close-up of textbook pages with highlighted text,
classroom environment, educational materials, 
bright natural lighting, instructional style"
```

### Sports Theme + Intelligent Prompts
```
"Wide-angle shot of cricket stadium at golden hour,
athletes in action, dynamic composition,
professional sports photography"
```

### Technology Theme + Intelligent Prompts
```
"Macro shot of circuit board with LED indicators,
modern tech aesthetic, shallow depth of field,
tech documentary style"
```

## 💡 UI Component Details

```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    <Brain className="h-4 w-4 text-blue-500" />
    <div>
      <Label>Intelligent Prompts</Label>
      <p className="text-xs">
        5-layer AI analysis for context-aware images
      </p>
    </div>
  </div>
  <Switch 
    checked={useIntelligentPrompts} 
    onCheckedChange={setUseIntelligentPrompts}
  />
</div>
```

## 🔍 How to Verify It's Working

### Check the UI
- Look for 🧠 icon in Cinematic Mode section
- Switch should be blue when ON

### Check the Logs
```bash
tail -f ~/workspace/yt-studio/logs/app.log | grep "INTELLIGENT\|STANDARD"
```

Expected output when ON:
```
🧠 Using INTELLIGENT PROMPT SYSTEM (multi-layer intelligence)
```

Expected output when OFF:
```
📖 Using STANDARD prompt generation (existing flow)
```

## 🎯 Default Settings

```typescript
// Frontend default
const [useIntelligentPrompts, setUseIntelligentPrompts] = useState(true);

// API schema default
useIntelligentPrompts: z.boolean().optional().default(true)

// Backend model default
use_intelligent_prompts: Optional[bool] = Field(default=True)
```

**Everything defaults to ON** ✅ - You have to manually turn it OFF if you want standard mode.

## 🚀 Benefits

1. **No Environment Variables** - Control from UI
2. **Per-Video Settings** - Mix intelligent and standard in same session
3. **Smart Defaults** - ON by default, recommended for quality
4. **Visual Feedback** - Clear toggle with description
5. **Theme Integration** - Works seamlessly with Visual Themes
6. **Cost Effective** - < 1 cent per video for massive quality boost

## 📝 Code Flow

```
User toggles switch in UI
         ↓
State updates: setUseIntelligentPrompts(true/false)
         ↓
Passed to onGenerate({ useIntelligentPrompts: true })
         ↓
Sent to API: POST /api/videos/generate
         ↓
Backend model: VideoCreateRequest.use_intelligent_prompts
         ↓
Pipeline checks: video_metadata.use_intelligent_prompts
         ↓
Routes to: _generate_images_intelligent() or _generate_images_standard()
```

## 🎓 When to Use Each Mode

### Use Intelligent Mode (ON) When:
- ✅ You want high-quality, relevant images
- ✅ You have a specific visual theme
- ✅ Story context matters
- ✅ Professional/educational content
- ✅ Willing to pay < 1 cent for better quality

### Use Standard Mode (OFF) When:
- ✅ You need fast generation
- ✅ Simple generic images are fine
- ✅ Testing/debugging
- ✅ Absolute minimal cost (though it's already cheap!)

## 💰 Cost Breakdown

### Intelligent Mode
```
Base cost: $0.000 (Pexels images are free)
AI Prompts: 5 segments × $0.0016 = $0.008
Cache Savings: ~20-30% on repeat themes
---
Total: < $0.01 per video
```

### Standard Mode
```
Base cost: $0.000 (Pexels images are free)
AI Prompts: $0.000 (no AI enhancement)
---
Total: $0.00 per video
```

**The quality difference is worth $0.008!** 🎯

## 🎉 Summary

**Location**: Cinematic Mode section, after Visual Theme selector  
**Icon**: 🧠 Brain icon  
**Default**: ON (enabled)  
**Recommendation**: Keep it ON!  
**Cost**: < 1 cent per video  
**Benefit**: Massively better image quality  

Just look for the blue brain icon! 🧠
