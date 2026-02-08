# Quick Start Guide

Get up and running with Natural Voice MCP in 5 minutes.

## Installation

### macOS/Linux
```bash
cd natural-voice-mcp
./setup.sh
```

### Windows
```bash
cd natural-voice-mcp
npm install
```

## Configuration

1. **Find your Claude Desktop config file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Add this configuration** (replace the path with your actual installation path):
```json
{
  "mcpServers": {
    "natural-voice": {
      "command": "node",
      "args": ["/full/path/to/natural-voice-mcp/index.js"]
    }
  }
}
```

3. **Restart Claude Desktop**

## First Use

Try these in Claude Desktop:

### Read the guides:
```
"Can you read the Twitter voice guide?"
```

### Analyze text:
```
"Use the analyze-voice prompt on this text: I'm thrilled to announce..."
```

### Rewrite something:
```
"Use the rewrite-natural prompt to make this sound more human: [your text]"
```

### Get platform-specific help:
```
"Read the LinkedIn voice guide and help me write a post about my new project"
```

## What You Get

### 📚 Resources
- **conversational-patterns**: How humans actually write
- **twitter-voice**: Twitter-specific authenticity
- **linkedin-voice**: Professional but real
- **ai-tells**: Patterns to avoid

### 🎯 Prompts
- **analyze-voice**: Check for AI tells
- **rewrite-natural**: Make it human
- **platform-optimize**: Adapt for specific platforms

### 🔧 Tools
- **detect_ai_patterns**: JSON analysis of text
- **suggest_improvements**: Specific fixes

## Common Use Cases

**Before posting on Twitter:**
1. Write your draft
2. "Read the Twitter voice guide"
3. "Use analyze-voice on: [your draft]"
4. Fix any AI tells
5. Post with confidence

**Creating LinkedIn content:**
1. "Read the LinkedIn voice guide"
2. Draft your post
3. "Use platform-optimize for LinkedIn: [draft]"
4. Review and adjust
5. Sound professional AND human

**General writing:**
1. Write naturally (don't try to be perfect)
2. "Use detect_ai_patterns on my text"
3. Fix the specific issues identified
4. Much better output

## Tips

✅ **Do:**
- Read the voice guides first
- Use specific prompts for specific tasks
- Iterate based on feedback
- Develop your own authentic voice

❌ **Don't:**
- Just use tools without understanding principles
- Apply same voice to all platforms
- Ignore the AI tells guide
- Expect perfection on first draft

## Need Help?

- Full docs: `README.md`
- Examples: `EXAMPLES.md`
- Can't find the server? Check paths in config
- Not working? Check Node.js version (`node -v` - need 18+)

## Next Steps

1. ✅ Install (you're here!)
2. 📖 Read one voice guide completely
3. ✍️ Try rewriting something you wrote
4. 🎯 Use it for your next social post
5. 🎨 Develop your authentic voice

---

**Remember**: This isn't about writing "worse"—it's about writing like an actual human being. You, specifically. Not Generic AI Person.

Now go sound like yourself.
