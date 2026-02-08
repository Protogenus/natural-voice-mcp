# Example Usage Guide

Real-world examples of using the Natural Voice MCP Server.

## Example 1: Fixing a LinkedIn Post

### Original (AI-sounding):
```
I'm thrilled to announce that I've joined TechCorp as a Senior Engineer! 

I'm excited to leverage my skills in software development to drive innovation and create impactful solutions. Furthermore, I look forward to collaborating with the talented team and contributing to the company's mission.

Grateful for this opportunity and excited for the journey ahead! 🚀
```

### What Claude Would Identify:
Using the `analyze-voice` prompt or `detect_ai_patterns` tool:
- AI tells: "thrilled to announce", "leverage", "drive innovation"
- Overly formal transitions: "Furthermore"
- Generic enthusiasm: "excited for the journey ahead"
- Corporate buzzwords: "impactful solutions"
- Emoji overuse for corporate post

### After Using `rewrite-natural` for LinkedIn:
```
Started at TechCorp this week as a Senior Engineer.

Honestly just excited to build things with this team. They're working on some genuinely interesting problems in [specific area], and I've been wanting to dig into this space for a while.

Looking forward to learning from people way smarter than me and hopefully shipping some cool stuff.
```

**Why it's better:**
- Sounds like an actual person
- Specific rather than generic
- Humble without false modesty
- Still professional but authentic

## Example 2: Making a Twitter Thread Natural

### Original (AI-sounding):
```
I'd like to share some insights about productivity that I've learned over the years. 

1. It's important to establish a consistent morning routine
2. Furthermore, one should prioritize tasks effectively
3. Additionally, taking breaks is essential for maintaining focus
4. In conclusion, these practices will enhance your productivity

What are your thoughts on this? 🤔
```

### After Reading Twitter Voice Guide + Using `platform-optimize`:
```
productivity things that actually helped me:

- morning routine (boring but works)
- writing out top 3 things night before
- breaks when I'm stuck, not on a schedule
- accepting that some days just suck

still figuring it out tbh but these are repeatable
```

**Why it's better:**
- Twitter-appropriate length and structure
- Casual tone ("tbh", "some days just suck")
- Honest uncertainty ("still figuring it out")
- No engagement bait question
- Feels like actual Twitter

## Example 3: Detecting AI Patterns in a Tweet

### Input to `detect_ai_patterns`:
```
I'm delighted to share that our product launch was incredibly successful! Moreover, the feedback has been overwhelmingly positive. 🎉🚀💡
```

### Output:
```json
{
  "ai_tells": [
    "Corporate enthusiasm: \"delighted to share\"",
    "Formal transition: \"moreover\""
  ],
  "score": 70,
  "issues": [
    "Emoji overload",
    "No contractions found (sounds stiff)"
  ],
  "verdict": "Some AI tells present"
}
```

### After Fixing:
```
product launch went way better than expected. people seem to actually like it? wild
```

## Example 4: Platform Context Switching

### Same Message, Different Platforms

**For Twitter:**
```
just shipped a new feature that cuts load time by 60%

yeah I'm annoying about performance, sorry not sorry
```

**For LinkedIn:**
```
Spent the last month optimizing our app's performance. Got load time down from 5s to 2s—60% improvement.

The process was messier than I expected (lots of dead ends), but we finally found the bottleneck in [specific technical detail].

Shoutout to [teammate] for the caching idea that made this possible.
```

**For Internal Slack:**
```
perf improvements shipped 🎉
load time: 5s → 2s
mostly [technical detail] + new caching layer
lmk if you see any issues
```

**Same core achievement, completely different voices—all authentic to their platform.**

## Example 5: Improving Social Media Engagement

### Generic Engagement Bait (Bad):
```
What's the best productivity tool you've ever used?

Drop your answers below! 👇
```

### Authentic Question (Good):
```
what's the one tool/app you swear by that nobody talks about?

(I'll start: [specific tool] for [specific use case])
```

**Why it works:**
- Adds personal example (gives more than it asks)
- Specific angle ("nobody talks about")
- Natural language ("I'll start")
- No emoji spam

## Example 6: De-Corporate-Izing Business Content

### Original:
```
Our innovative solution leverages cutting-edge AI technology to transform your workflow and maximize productivity. We're excited to announce that we're currently offering a limited-time opportunity for early adopters.
```

### After Using Anti-Patterns Guide:
```
We built a tool that does [specific thing] using AI.

If you spend a lot of time on [specific task], it might save you a few hours a week. 

Testing it with early users right now—if you're interested, DM me.
```

**Changes:**
- "Innovative solution leverages cutting-edge AI" → "built a tool that does X using AI"
- "Transform your workflow and maximize productivity" → "save you a few hours"
- "Limited-time opportunity for early adopters" → "testing with early users, DM if interested"

Much more human, much more credible.

## Example 7: Personal Voice Development

### Before Understanding Voice Guides:
All posts sound the same:
```
Excited to share my thoughts on [topic]...
Here are some key insights I've learned...
In conclusion, I believe that...
```

### After Developing Personal Voice:
Posts have personality and variation:

**Observational:**
```
weird how everyone suddenly became an expert on [topic]
```

**Storytelling:**
```
made a $5k mistake yesterday

here's what happened [story]

anyway, learned my lesson
```

**Technical:**
```
PSA: if you're using [tool], check your config for [thing]

just cost me 3 hours of debugging
```

**Each post sounds like the same person, but responding naturally to different contexts.**

## Example 8: Using Multiple Resources Together

### Workflow for Writing a LinkedIn Post About Career Change:

1. **Read LinkedIn Voice Guide**
   - Learn about narrative structure
   - Understand professional authenticity
   - See examples of vulnerability done right

2. **Read Conversational Patterns**
   - Remember how humans show uncertainty
   - Note natural emotional markers
   - Review honest vulnerability patterns

3. **Read AI Tells**
   - Avoid "humbled and honored"
   - Skip the corporate transitions
   - Don't oversell the decision

4. **Write Draft + Get Feedback**
   - Use `analyze-voice` on draft
   - Use `suggest_improvements` for LinkedIn
   - Iterate based on specific feedback

5. **Final Result:**
```
Left my job at BigTech three months ago to build [thing].

Everyone said I was crazy. They might've been right—definitely had some "wtf did I do" moments.

But here's what I'm learning: [specific lessons, not platitudes]

Still figuring it out. Some days are great, some days I question everything. That's the deal.

If you're thinking about taking a leap: [specific advice based on your experience, not generic wisdom]
```

## Key Patterns Across Examples

**What makes text sound human:**
1. ✅ Specific details over generic statements
2. ✅ Honest uncertainty ("still figuring it out")
3. ✅ Conversational tone (contractions, casual phrases)
4. ✅ Varied sentence structure
5. ✅ Platform-appropriate voice
6. ✅ Personality showing through
7. ✅ Natural imperfections

**What makes text sound like AI:**
1. ❌ Corporate enthusiasm ("thrilled to announce")
2. ❌ Formal transitions ("furthermore", "moreover")
3. ❌ Perfect grammar always
4. ❌ No distinct voice
5. ❌ Generic everything
6. ❌ Same tone across platforms
7. ❌ Engagement bait

## Tips for Best Results

1. **Read the guides first** - Don't just use the tools, understand the principles
2. **Platform matters** - Twitter ≠ LinkedIn ≠ Reddit ≠ Email
3. **Iterate** - First draft + analysis + rewrite = better results
4. **Develop voice** - Use the guides to find YOUR authentic voice, not just "sound human"
5. **Context is king** - What works for a hot take doesn't work for a job application

## Remember

The goal is **authentic communication**, not just passing an AI detector. These tools and guides help you write like yourself—just more effectively for each platform and context.
