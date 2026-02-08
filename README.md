# Natural Voice MCP

**Make AI-generated text sound like a real person wrote it.**

This VS Code extension provides an MCP server that teaches Claude/Antigravity how humans actually write and speak online. It includes detection tools for AI-generated patterns and guides for authentic voice across platforms.

## Features

### 🔧 Tools
- **detect_ai_patterns** — Analyze text and get a human-likeness score
- **suggest_improvements** — Get specific fixes for unnatural phrasing

### 📚 Resources  
- **AI Tells** — Common patterns that reveal AI-generated text
- **Cognitive Posture** — Systems for motivation, energy, and persona
- **Conversational Patterns** — How humans actually write
- **Twitter Voice** — Platform-specific authenticity
- **LinkedIn Voice** — Professional but real

## Usage

Once installed, the MCP server auto-starts. Use these in your AI prompts:

```
"Read the ai-tells resource and help me fix this text"
"Use detect_ai_patterns on: [your text]"
"Read the cognitive-posture guide"
```

## Commands

- `Natural Voice: Detect AI Patterns in Selection` — Analyze selected text

## What It Detects

| Pattern | Impact |
|---------|--------|
| "Thrilled to announce" | -10 points |
| "Furthermore/Moreover" | -5 points |
| No contractions | -10 points |
| Em dash overuse (3+) | -10 points |
| Perfect paragraph uniformity | -5 points |

**Score 80+:** Sounds human ✓  
**Score 50-80:** Some AI tells present  
**Score <50:** Strong AI indicators

## License

MIT
