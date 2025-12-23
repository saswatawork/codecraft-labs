# Voice Customization: Complete User Guide

## 🎙️ Overview

The Voice Customization system gives you full control over ChatterBox TTS (Text-to-Speech) parameters, allowing you to create professional, consistent voice outputs tailored to your content style.

---

## 🚀 Quick Start

### Using Built-in Presets (Easiest)

1. **Create a new video** (Dashboard → Create Video)
2. **Scroll to "Language & Voice" section**
3. **Click the "Voice Preset" dropdown**
4. **Select a built-in preset** (e.g., "Dynamic YouTuber")
5. **Generate your video** ✨

**Built-in Presets:**
- **Dynamic YouTuber** - Energetic tech tutorials & reviews (160 WPM)
- **Natural Conversational** - Friendly casual content (140 WPM)
- **Enthusiastic Tech** - Professional upbeat demos (150 WPM)
- **Expressive & Dramatic** - Storytelling & narratives (145 WPM)
- **Warm & Friendly** - Welcoming introductions (135 WPM)
- **Professional Tutorial** - Clear educational content (130 WPM)
- **Balanced** - General purpose (150 WPM)

---

## 🎨 Creating Custom Presets

### Step 1: Open Preset Manager

- In **Create Video** view, click **"Manage"** next to "Voice Preset" dropdown
- Or use the preset manager from the **Voices** page

### Step 2: Create New Preset

1. Click **"Create New"** tab
2. **Name your preset** (e.g., "My Energetic Style")
3. **Add description** (optional but recommended)
4. **Adjust parameters** using sliders (see below)
5. **Toggle "Make Public"** to share with community (optional)
6. Click **"Create Preset"** 

### Step 3: Use Your Custom Preset

- Select it from the Voice Preset dropdown when creating videos
- It will be under **"My Presets"** section

---

## 🎛️ Understanding TTS Parameters

### Primary Parameters (Most Important)

#### 1. **Exaggeration** (0.0 - 1.0)
- **What it does:** Controls emotional intensity and expressiveness
- **Low (0.2-0.4):** Calm, professional, monotone
- **Medium (0.5-0.7):** Balanced, engaging
- **High (0.8-1.0):** Very expressive, dramatic
- **Use cases:**
  - **0.3** - Formal presentations, news
  - **0.5** - General content
  - **0.8** - Tutorials, exciting reveals

#### 2. **CFG Weight** (0.0 - 1.0)
- **What it does:** Voice matching strength (how closely it matches your reference voice)
- **Low (0.3-0.5):** More variation, creative liberty
- **Medium (0.6-0.7):** Balanced matching
- **High (0.8-1.0):** Very close to reference voice
- **Recommended:** 0.6-0.75 for most cases

#### 3. **Temperature** (0.0 - 1.0)
- **What it does:** Controls variety vs consistency
- **Low (0.2-0.4):** More consistent, predictable
- **Medium (0.5-0.6):** Balanced variation
- **High (0.7-1.0):** More creative, varied
- **Use cases:**
  - **0.3** - Consistent brand voice
  - **0.6** - Natural variation
  - **0.8** - Storytelling with character

#### 4. **Speed** (0.5 - 2.0)
- **What it does:** Speech rate multiplier
- **Slow (0.8-0.95):** Clear enunciation, tutorials
- **Normal (1.0):** Natural pace
- **Fast (1.05-1.2):** Quick, energetic
- **Very Fast (1.3+):** Use sparingly, may sound rushed

### Advanced Parameters

#### 5. **Repetition Penalty** (1.0 - 3.0)
- **What it does:** Controls prosody (pitch/tone) variation
- **Low (1.2-1.3):** Minimal variation
- **Medium (1.4-1.6):** Natural variation
- **High (1.7+):** Maximum variation
- **Recommended:** 1.4 for most content

#### 6. **Target WPM** (0 - 200)
- **What it does:** Target words per minute
- **0:** Automatic (recommended)
- **130-140:** Slow, clear
- **150-160:** Standard YouTube pace
- **170+:** Fast-paced content
- **Note:** Works with Speed parameter

#### 7. **Random Seed** (0+)
- **What it does:** Controls randomness for deterministic generation
- **Same seed =** Same voice output (for consistency)
- **Different seed =** Variation even with same parameters
- **Tip:** Use fixed seed (e.g., 42) for consistent series

#### 8. **Language Code**
- **What it does:** ISO language code for TTS
- **Examples:** `en` (English), `hi` (Hindi), `es` (Spanish), `fr` (French)
- **Note:** Must match your script language

---

## 💡 Preset Recipes

### For Tech Tutorials
```
Exaggeration: 0.6
CFG Weight: 0.7
Temperature: 0.4
Repetition Penalty: 1.4
Speed: 1.0
Target WPM: 150
```

### For Storytelling
```
Exaggeration: 0.9
CFG Weight: 0.6
Temperature: 0.7
Repetition Penalty: 1.6
Speed: 0.95
Target WPM: 145
```

### For Professional Presentations
```
Exaggeration: 0.3
CFG Weight: 0.8
Temperature: 0.2
Repetition Penalty: 1.2
Speed: 0.95
Target WPM: 130
```

### For Energetic Product Reviews
```
Exaggeration: 0.8
CFG Weight: 0.75
Temperature: 0.4
Repetition Penalty: 1.5
Speed: 1.05
Target WPM: 160
```

---

## 🔧 Advanced Features

### Export/Import Presets

**Export Your Presets:**
1. Open Preset Manager
2. Click **"Export All"** to download all your presets as JSON
3. Or click **Download icon** on individual preset cards

**Import Presets:**
1. Open Preset Manager
2. Click **"Import"**
3. Select your `.json` preset file
4. All presets will be imported to your account

**Use cases:**
- Backup your presets
- Share with team members
- Transfer between projects
- Distribute community presets

### Duplicate Presets

**Quick way to create variations:**
1. Find preset you want to modify
2. Click **Copy icon** on preset card
3. Preset is duplicated with " (Copy)" suffix
4. Edit the duplicate to fine-tune

### Search & Filter

- Use search bar in Preset Manager
- Searches preset names and descriptions
- Shows match count for each category

### Usage Analytics

- See how many times each preset has been used
- Displayed as "(X uses)" next to preset name
- Helps identify your most effective presets

---

## 🎯 Best Practices

### 1. **Start with Built-in Presets**
- Try all 7 built-in presets first
- Understand what each parameter does
- Then create custom variations

### 2. **Use Descriptive Names**
- Bad: "Preset 1", "Test"
- Good: "Energetic Tech Demo", "Calm Tutorial Voice"

### 3. **Add Detailed Descriptions**
- Include use case: "For product unboxing videos"
- Note key characteristics: "Fast-paced with high energy"
- Mention WPM: "160 WPM for quick content"

### 4. **Consistency is Key**
- Use same preset for video series
- Use same seed for maximum consistency
- Create brand-specific presets

### 5. **Test Before Publishing**
- Generate test videos with new presets
- Listen to full audio
- Adjust parameters based on results
- Save working presets

### 6. **Organize Your Presets**
- Create presets by content type (tutorials, reviews, stories)
- Create presets by mood (energetic, calm, professional)
- Delete unused presets to reduce clutter

---

## 🐛 Troubleshooting

### Voice Sounds Robotic
- **Increase:** Exaggeration (0.6-0.8)
- **Increase:** Temperature (0.5-0.7)
- **Increase:** Repetition Penalty (1.5-1.7)

### Voice Varies Too Much
- **Decrease:** Temperature (0.3-0.4)
- **Increase:** CFG Weight (0.75-0.85)
- **Use same seed** across videos

### Voice Too Fast/Slow
- **Adjust:** Speed parameter
- **Adjust:** Target WPM
- **Note:** Both work together

### Voice Doesn't Match Reference
- **Increase:** CFG Weight (0.75+)
- **Check:** Reference audio quality
- **Try:** Different voice profile

### Preset Not Showing
- **Check:** You're logged in
- **Refresh:** Reload page
- **Check:** Preset wasn't deleted

---

## 📊 API Integration

### Using Presets Programmatically

```typescript
// Create video with preset
await createVideo({
  title: "My Video",
  scriptContent: "Your script...",
  voicePresetId: "built-in-dynamic-youtuber",
  // ... other params
});

// Get all presets
const presets = await fetchVoicePresets();

// Create custom preset
const preset = await createVoicePreset({
  name: "My Custom Preset",
  exaggeration: 0.7,
  cfgWeight: 0.6,
  // ... other parameters
});
```

---

## 📚 Related Documentation

- **[ChatterBox TTS Research](../docs/VOICE_CUSTOMIZATION_RESEARCH.md)** - Technical deep-dive
- **[Implementation Plan](../docs/VOICE_CUSTOMIZATION_IMPLEMENTATION_PLAN.md)** - Developer guide
- **[API Documentation](../api/README.md)** - Backend API reference
- **[Pipeline Integration](../VOICE_CUSTOMIZATION_PROGRESS.md)** - How it works

---

## ❓ FAQ

**Q: How many presets can I create?**
A: Unlimited! Create as many as you need.

**Q: Can I share my presets?**
A: Yes! Toggle "Make Public" when creating/editing.

**Q: What happens to old videos if I update a preset?**
A: Old videos are unaffected. Presets are applied at generation time.

**Q: Can I delete built-in presets?**
A: No, but you can duplicate and modify them.

**Q: Do presets work with all voice profiles?**
A: Yes! Presets control TTS parameters, voice profiles provide the voice reference.

**Q: What's the difference between voice profile and voice preset?**
A: 
- **Voice Profile** = Your reference voice recording (WHO speaks)
- **Voice Preset** = How the voice speaks (HOW it speaks)

**Q: Can I use presets without a voice profile?**
A: Yes! System will use default voice with your preset parameters.

**Q: How do I get consistent voice across a series?**
A: Use same voice preset + same seed + same voice profile.

---

## 💬 Support

- **Issues:** Check [GitHub Issues](https://github.com/your-repo/issues)
- **Questions:** Post in [Discussions](https://github.com/your-repo/discussions)
- **Feature Requests:** Create enhancement issue

---

**Last Updated:** December 22, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
