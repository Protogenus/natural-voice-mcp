# Natural Voice MCP

**Make AI-generated text sound like a real person wrote it.**

An MCP server that teaches Claude and other AI assistants how humans actually write online. Detects AI patterns MOST and provides platform-specific voice guides.

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/RedRiverDesign.natural-voice-mcp)](https://marketplace.visualstudio.com/items?itemName=RedRiverDesign.natural-voice-mcp)
[![GitHub](https://img.shields.io/github/license/Protogenus/natural-voice-mcp)](https://github.com/Protogenus/natural-voice-mcp)

## Installation

**VS Code / Cursor:**
```
ext install RedRiverDesign.natural-voice-mcp
```

**Or install from:** [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=RedRiverDesign.natural-voice-mcp)

## Tools

| Tool | Description |
|------|-------------|
| `analyze_voice` | Get a human-likeness score (0-100) for any text |
| `humanize_text` | Get specific suggestions to make text sound natural |

### Examples

```
Use analyze_voice on: "I am thrilled to announce our exciting new product"
```

```
Use humanize_text on: "Furthermore, it is worth noting..." platform: linkedin
```

## Resources

The MCP server provides these knowledge resources that AI can read:

| Resource | Description |
|----------|-------------|
| `ai-tells` | Patterns that reveal AI-generated text |
| `cognitive-posture` | Motivation, energy, and persona systems |
| `conversational-patterns` | How humans actually write |
| `twitter-voice` | Twitter/X authenticity guide |
| `linkedin-voice` | Professional LinkedIn voice |

## What It Detects

| Pattern | Score Impact |
|---------|-------------|
| "Thrilled to announce" | -10 |
| "Furthermore/Moreover" | -5 |
| No contractions | -10 |
| Em dash overuse (3+) | -10 |

**Score 80+:** Sounds human ✓  
**Score 50-80:** Some AI tells  
**Score <50:** Strong AI indicators

## Links

- [GitHub Repository](https://github.com/Protogenus/natural-voice-mcp)
- [Report Issues](https://github.com/Protogenus/natural-voice-mcp/issues)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=RedRiverDesign.natural-voice-mcp)

## License

MIT © [Red River Design](https://github.com/Protogenus)
