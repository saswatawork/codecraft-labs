# Master Blog Creation Prompt - CodeCraft Labs Tech Decision Series

> **Write blogs people actually want to read**  
> Version: 5.0 - "Story First" Edition  
> Last Updated: December 2025

---

## 🎯 Core Philosophy

**Mission:** Tell the story of a real technical decision—why it mattered, what you tried, what worked, what didn't.

**Principles:**
1. **Story > Structure** - Let the narrative flow naturally, don't force sections
2. **Specific > Generic** - "Button.tsx broke at 2am" beats "encountered deployment challenges"
3. **Honest > Polished** - Show the messy parts, the failures, the 3am debugging
4. **Useful > Complete** - Teach one thing well, not everything poorly
5. **Your Voice > Template Voice** - Write like you'd explain it to a friend at coffee

**Target:** ~4,000 words, but let the story breathe. Cut boring parts, expand interesting ones.

---

## ✍️ Writing Style - CRITICAL for Human Voice

### **Anti-AI Patterns to Avoid**

❌ **Emoji overload** - NOT every heading needs emojis  
✅ Use 3-4 emojis total in strategic places (hook, key stat, final verdict)

❌ **Corporate jargon** - "Reduced cognitive load," "significant quality-of-life improvement"  
✅ Developer language - "less crap to think about," "made life way easier"

❌ **Perfect structure** - Every section follows identical pattern  
✅ Break rhythm occasionally - skip a table, put code before explanation, add tangents

❌ **Zero personality** - No opinions, no frustration, no excitement  
✅ Take stands - "If you're copy-pasting in 2025, you're doing it wrong"

❌ **Hypothetical "real examples"** - "Imagine you have 5 projects..."  
✅ Actual specifics - "I hit this bug at 2am, Stack Overflow was useless, here's what worked"

❌ **Too-perfect migration** - "Migration was smooth, only minor issues"  
✅ Show friction - "Cleared node_modules 5 times, almost gave up, finally found the issue"

❌ **Consultant-level ROI** - 8 tables, 3-year NPV, 3,330% ROI  
✅ Rough numbers - "Saves ~2 hours daily, maybe $20K/year if you value time at $50/hr"

❌ **Narrative code comments** - `// 😱 The same Button existed in 3 places:`  
✅ Show raw code first, explain after

❌ **Neutral tone** - "While X transformed my workflow, here's when..."  
✅ Get passionate - "Look, X isn't perfect, but if you're doing Y in 2025, you're making life harder than it needs to be"

❌ **Template transitions** - "Let me show you," "Here's what really transformed"  
✅ Direct jumps - Just start the section, no fluff

### **Human Voice Techniques**

**1. Use Casual Language:**
- "pain in the ass" > "challenging experience"
- "this sucked" > "suboptimal situation"
- "debugging hell" > "troubleshooting phase"
- "almost gave up" > "considered alternative approaches"

**2. Include Failure Stories:**
```markdown
**What Actually Happened:**
Spent 3 hours trying to figure out why pnpm kept throwing peer dependency errors. 
Googled. Stack Overflow had the same question but no answer. 
Turborepo Discord was quiet. 
At midnight I realized: old UI library used React 18, new monorepo had React 19. 
One version update. Fixed in 5 minutes. Classic.
```

**3. Add Personal Context (Without Revealing Origin):**
- ✅ "Solo dev, bootstrapped, every hour counts"
- ✅ "Learning in public, mistakes and all"
- ✅ "Building in [city] while balancing day job"
- ❌ Avoid explicit ethnic/national identity unless relevant

**4. Show Messy Reality:**
- "Cleared cache 5 times before it worked"
- "Build failed 8 times. Turns out I had a typo in turbo.json"
- "Documentation said X, reality was Y"
- "This workaround is ugly but it works"

**5. Have Opinions (And Own Them):**
- "Hot take: If you're using Lerna in 2025, you're stuck in 2018"
- "Multi-repo defenders are often just scared of change"
- "The tooling is a mess, but monorepo is still worth it"
- "Controversial opinion: You probably don't need Nx unless you have 50+ packages"

**6. Vary Paragraph Length:**
```markdown
Short intro.

Medium paragraph with 2-3 sentences explaining something. Keep it flowing naturally without forcing structure.

Longer paragraph that goes into detail. This one has 4-5 sentences and breaks down a complex idea. The key is that it doesn't follow a template pattern. Sometimes you need more words, sometimes fewer. Let the content dictate the structure, not some rigid format.

One sentence for emphasis.
```

**7. Add Conversational Asides:**
- "(This took me way too long to figure out)"
- "Side note: Turborepo's logo is ugly but the tool is fire"
- "Honestly, I almost skipped this section"
- "Wait, there's a better way to do this—ignore what I just said"

**8. Document Real Debugging:**
```markdown
**The Bug That Ate Saturday:**

Build worked locally. Failed in CI. No useful error message.

Tried:
- Clearing cache (didn't help)
- Different node version (nope)
- Praying to the JavaScript gods (surprisingly ineffective)

Finally ran CI locally with --verbose. Found it: Vercel uses different pnpm version.
Added `packageManager: "pnpm@9.1.0"` to package.json.

Fixed. 4 hours wasted. Lesson learned.
```

### **What TO Include:**

✅ 1-2 swear words (mild ones: "crap," "damn," "hell")  
✅ Contractions ("you're," "it's," "don't")  
✅ Sentence fragments for emphasis. Like this.  
✅ Rhetorical questions (Did I mention this was painful?)  
✅ Self-deprecating humor ("Yeah, I should've RTFM")  
✅ Real timestamps ("At 2am on Saturday...")  
✅ Rough estimates ("probably saves 2 hours daily, maybe more idk")  
✅ Admissions of uncertainty ("Still not sure if this scales to 100 packages")

### **What to MINIMIZE:**

⚠️ Emoji usage (3-4 total, not 20+)  
⚠️ Bullet points with bolded first word (varies sometimes)  
⚠️ Tables (use when truly helpful, not for every comparison)  
⚠️ Check marks (✅❌) - use sparingly  
⚠️ Perfect grammar (occasional fragment/run-on is human)  
⚠️ Transition phrases ("Let's dive in," "Moving on")  
⚠️ ROI calculations (keep to one simple example)

---

---

## ✍️ Writing Guidelines

### **Start with a hook**
Real problem, specific moment. Not "Have you ever wondered about monorepos?" but "I broke production on Friday night by changing a Button prop."

### **Show your work**
- Real code from your project (not hypothetical examples)
- Actual numbers (build times, file sizes, time saved)
- Honest mistakes ("Spent 3 hours debugging, turns out I had a typo")
- What you tried that didn't work

### **Keep it scannable**
- Clear headings
- Short paragraphs (2-4 sentences usually)
- Code blocks under 40 lines
- Tables when they help, not by default
- Bold key phrases

### **Write like you talk**
- Use "I" and "you"
- Contractions (don't, it's, you're)
- Casual language ("this sucked" not "suboptimal experience")
- Sentence fragments for emphasis. Like this.
- Occasional swear words (mild ones: crap, damn, hell)

### **Be opinionated**
- Take a stand ("If you're still using X in 2025, you're making life harder")
- Show your biases ("I'm a solo dev, so I prioritize setup speed")
- Admit uncertainty ("Not sure if this scales to 100 packages")

### **Cut ruthlessly**
First draft will be too long. Kill:
- Repetitive explanations
- Obvious statements
- Setup instructions (link to docs instead)
- Every example except the best one
- Corporate jargon

---

## 📋 Suggested Structure

This is a **guide, not a template**. Skip sections that don't fit. Add sections that do.

### **Hook** (~200 words)
Start with the moment you hit the problem. Specific incident, real frustration.

### **TL;DR** (~100 words)
- What you chose
- 3-4 key results
- Who should/shouldn't use it

### **The Problem** (~500 words)
- What you were building
- What went wrong (with numbers)
- Why it mattered enough to change

### **What You Tried** (~800 words)
Don't list every tool. Focus on 2-3 you seriously considered:
- What it promised
- What you liked
- What made you reject it (or choose it)

### **Your Solution** (~1,000 words)
Show ONE good example:
- Code that matters (~30 lines)
- Key config
- How it works (high-level, not step-by-step)

### **The Results** (~500 words)
Real numbers:
- Before/after metrics
- Time saved (rough estimate fine)
- What improved
- What didn't

### **Migration Notes** (~400 words)
3-5 key gotchas with quick fixes. Not a full tutorial—link to docs for that.

### **When to Use This** (~300 words)
Brief decision guide:
- Use if...
- Don't use if...
- Consider alternatives if...

### **Final Thoughts** (~200 words)
- Would you do it again?
- What surprised you?
- What you'd change?

---

## ❌ What NOT to Do

**Don't:**
- Follow this template rigidly
- Hit exact word counts
- Use emoji in every heading
- Create 5+ comparison tables
- Write step-by-step tutorials (link to docs)
- Include 8 code examples
- Make ROI spreadsheets
- Be neutral and boring

**Do:**
- Let the story flow
- Cut boring parts
- Expand interesting parts
- Show real code
- Be honest about failures
- Have a point of view
- Make it worth reading

---

## ✅ Quality Check

Before publishing, ask:

1. **Would I read this?** If you'd skim it, rewrite it.
2. **Is it specific?** "Button.tsx broke" > "encountered issues"
3. **Is it honest?** Show what didn't work, not just wins.
4. **Is it useful?** Does someone learn something actionable?
5. **Is it YOU?** Does it sound like you wrote it, or a robot?

If you can answer yes to all 5, publish it.

---

## 📚 Examples That Work

**Good hooks:**
- "I broke production on Friday night by changing a Button prop in the wrong repo."
- "Spent 4 hours configuring Nx. Then tried Turborepo—working in 15 minutes."
- "Same Button.tsx existed in 3 repos. All slightly different. All breaking at different times."

**Good specifics:**
- "Build time: 5min 23s → 2.8s (95% cache hit)"
- "Cleared node_modules 5 times before it worked"
- "At 2am I realized: React 18 vs 19 mismatch"

**Good honesty:**
- "This worked, but setup was painful"
- "Documentation promised X, reality was Y"
- "Still not sure if this scales to 100 packages"
- "I'd use X again, but probably wouldn't recommend it to everyone"

---

*End of Master Blog Creation Prompt V5.0 - Story First Edition*
