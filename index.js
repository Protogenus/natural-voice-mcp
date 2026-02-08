#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Server instance
const server = new Server(
  {
    name: "natural-voice-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      prompts: {},
      tools: {},
    },
  }
);

// Resource definitions - guides on natural language patterns
const RESOURCES = {
  "conversational-patterns": {
    uri: "natural-voice://patterns/conversational",
    name: "Natural Conversational Patterns",
    description: "Core patterns of how humans actually write and speak",
    mimeType: "text/markdown",
  },
  "twitter-voice": {
    uri: "natural-voice://platforms/twitter",
    name: "Twitter/X Voice Guide",
    description: "How people authentically write on Twitter",
    mimeType: "text/markdown",
  },
  "linkedin-voice": {
    uri: "natural-voice://platforms/linkedin",
    name: "LinkedIn Voice Guide",
    description: "Professional authenticity on LinkedIn",
    mimeType: "text/markdown",
  },
  "ai-tells": {
    uri: "natural-voice://anti-patterns/ai-tells",
    name: "AI Tell Anti-Patterns",
    description: "Common patterns that reveal AI-generated text",
    mimeType: "text/markdown",
  },
  "cognitive-posture": {
    uri: "natural-voice://systems/cognitive-posture",
    name: "Cognitive Posture Engine",
    description: "Systems for cognitive realism: motivation, energy, persona, and belief consistency",
    mimeType: "text/markdown",
  },
};

// Prompt definitions
const PROMPTS = {
  "analyze-voice": {
    name: "Analyze Voice Authenticity",
    description: "Analyze text for natural voice vs AI tells",
  },
  "rewrite-natural": {
    name: "Rewrite for Natural Voice",
    description: "Rewrite text to sound more human and authentic",
  },
  "platform-optimize": {
    name: "Optimize for Platform",
    description: "Adapt text for specific platform voice",
  },
};

// Tool definitions
const TOOLS = {
  "detect-ai-patterns": {
    name: "detect_ai_patterns",
    description: "Detect AI-generated patterns in text",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The text to analyze for AI patterns",
        },
      },
      required: ["text"],
    },
  },
  "suggest-improvements": {
    name: "suggest_improvements",
    description: "Suggest specific improvements to make text sound more natural",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The text to improve",
        },
        platform: {
          type: "string",
          enum: ["twitter", "linkedin", "reddit", "general"],
          description: "Target platform for optimization",
        },
      },
      required: ["text"],
    },
  },
};

// Helper to read resource files
async function readResource(resourceId) {
  const filenames = {
    "conversational-patterns": "conversational-patterns.md",
    "twitter-voice": "twitter-voice.md",
    "linkedin-voice": "linkedin-voice.md",
    "ai-tells": "ai-tells.md",
    "cognitive-posture": "cognitive-posture.md",
  };

  const filename = filenames[resourceId];
  if (!filename) {
    throw new Error(`Unknown resource: ${resourceId}`);
  }

  const filepath = path.join(__dirname, "resources", filename);
  return await fs.readFile(filepath, "utf-8");
}

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: Object.values(RESOURCES),
  };
});

// Read a specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const resourceId = request.params.uri.split("//")[1].split("/").pop();
  const content = await readResource(resourceId);

  return {
    contents: [
      {
        uri: request.params.uri,
        mimeType: "text/markdown",
        text: content,
      },
    ],
  };
});

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: Object.values(PROMPTS),
  };
});

// Get a specific prompt
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const promptName = request.params.name;

  if (promptName === "analyze-voice") {
    const text = request.params.arguments?.text || "";
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Analyze this text for voice authenticity. Identify any AI tells, unnatural patterns, or areas where it doesn't sound like a real human wrote it. Be specific about what feels off and why.

Text to analyze:
${text}

Consider:
- Does it have personality?
- Are there any AI tell phrases?
- Does the structure feel natural?
- Would someone actually say/write this?
- What's the emotion/authenticity level?`,
          },
        },
      ],
    };
  }

  if (promptName === "rewrite-natural") {
    const text = request.params.arguments?.text || "";
    const platform = request.params.arguments?.platform || "general";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Rewrite this text to sound more natural and human. Remove AI tells, add personality, and make it feel authentic${platform !== "general" ? ` for ${platform}` : ""}.

Original text:
${text}

Make it sound like a real person wrote it. Keep the core message but inject humanity.`,
          },
        },
      ],
    };
  }

  if (promptName === "platform-optimize") {
    const text = request.params.arguments?.text || "";
    const platform = request.params.arguments?.platform || "twitter";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Optimize this text for ${platform}. Make it match the authentic voice and conventions of how real people write on this platform.

Original text:
${text}

Adapt it to ${platform}'s specific culture, tone, and format while keeping it genuinely human.`,
          },
        },
      ],
    };
  }

  throw new Error(`Unknown prompt: ${promptName}`);
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;

  if (toolName === "detect_ai_patterns") {
    const text = request.params.arguments.text;
    const patterns = detectAIPatterns(text);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(patterns, null, 2),
        },
      ],
    };
  }

  if (toolName === "suggest_improvements") {
    const text = request.params.arguments.text;
    const platform = request.params.arguments.platform || "general";
    const suggestions = suggestImprovements(text, platform);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(suggestions, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${toolName}`);
});

// AI pattern detection logic
function detectAIPatterns(text) {
  const patterns = {
    ai_tells: [],
    score: 100, // start at 100, subtract for each issue
    issues: [],
  };

  // Corporate enthusiasm
  const enthusiasmPhrases = [
    "thrilled to announce",
    "excited to share",
    "delighted to present",
    "over the moon",
    "humbled and honored",
  ];
  enthusiasmPhrases.forEach((phrase) => {
    if (text.toLowerCase().includes(phrase)) {
      patterns.ai_tells.push(`Corporate enthusiasm: "${phrase}"`);
      patterns.score -= 10;
    }
  });

  // Formal transitions
  const formalTransitions = [
    "furthermore",
    "moreover",
    "additionally",
    "in conclusion",
    "it is worth noting",
  ];
  formalTransitions.forEach((phrase) => {
    if (text.toLowerCase().includes(phrase)) {
      patterns.ai_tells.push(`Formal transition: "${phrase}"`);
      patterns.score -= 5;
    }
  });

  // Hedging
  const hedgePhrases = ["i would argue", "one might consider", "it could be said"];
  hedgePhrases.forEach((phrase) => {
    if (text.toLowerCase().includes(phrase)) {
      patterns.ai_tells.push(`Over-hedging: "${phrase}"`);
      patterns.score -= 5;
    }
  });

  // Perfect grammar checks
  const sentences = text.split(/[.!?]+/);
  const startsWithConjunction = sentences.some((s) =>
    /^\s*(and|but|or|so)\s/i.test(s)
  );
  if (!startsWithConjunction && sentences.length > 3) {
    patterns.issues.push("No sentences start with conjunctions (too formal)");
    patterns.score -= 5;
  }

  // Check for contractions
  const hasContractions = /\b(don't|can't|won't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|wouldn't|shouldn't|couldn't)\b/i.test(text);
  if (!hasContractions && text.length > 100) {
    patterns.issues.push("No contractions found (sounds stiff)");
    patterns.score -= 10;
  }

  // Emoji overload
  const emojiCount = (text.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length;
  if (emojiCount > text.split(/\s+/).length * 0.1) {
    patterns.issues.push("Emoji overload");
    patterns.score -= 5;
  }

  // Em dash overuse (AI loves these)
  const emDashCount = (text.match(/—/g) || []).length;
  const wordCount = text.split(/\s+/).length;
  if (emDashCount > 2 && wordCount < 500) {
    patterns.issues.push(`Em dash overuse (${emDashCount} in ${wordCount} words)`);
    patterns.score -= 10;
  } else if (emDashCount > 4) {
    patterns.issues.push(`Heavy em dash usage (${emDashCount} total) - classic AI tell`);
    patterns.score -= 15;
  }

  // Perfect hyphenation (AI is too consistent)
  const hyphenatedCompounds = text.match(/\b\w+-\w+\b/g) || [];
  const commonCompounds = [
    'high-level', 'real-time', 'long-term', 'well-documented',
    'user-friendly', 'state-of-the-art', 'best-in-class'
  ];
  const perfectHyphens = hyphenatedCompounds.filter(h =>
    commonCompounds.some(c => h.toLowerCase().includes(c.split('-')[0]))
  );
  if (perfectHyphens.length >= 3) {
    patterns.issues.push("Very consistent hyphenation (humans are sloppier)");
    patterns.score -= 5;
  }

  // Parenthetical overload
  const parenCount = (text.match(/\([^)]+\)/g) || []).length;
  if (parenCount > 2 && wordCount < 200) {
    patterns.issues.push("Excessive parentheticals");
    patterns.score -= 5;
  }

  // Perfect punctuation (no comma splices)
  const hasCommaSplice = /,\s+(I|you|he|she|it|we|they|this|that)\s+\w+/i.test(text);
  if (!hasCommaSplice && wordCount > 100) {
    patterns.issues.push("Too grammatically perfect (no comma splices)");
    patterns.score -= 5;
  }

  // List formatting (AI loves perfect parallel structure)
  const bulletPattern = /^[-•*]\s+\w/gm;
  const bullets = text.match(bulletPattern) || [];
  if (bullets.length >= 3 && bullets.length <= 5) {
    const allCapitalized = bullets.every(b => /^[-•*]\s+[A-Z]/.test(b));
    if (allCapitalized) {
      patterns.issues.push("Perfect list formatting (all items capitalized consistently)");
      patterns.score -= 5;
    }
  }

  // No typos in substantial text (suspicious)
  const commonTypos = ['teh', 'recieve', 'occured', 'seperate', 'definately'];
  const hasTypos = commonTypos.some(typo => text.toLowerCase().includes(typo));
  const hasItsIts = /\b(its|it's)\b/gi.test(text);
  const hasYourYoure = /\b(your|you're)\b/gi.test(text);

  if (!hasTypos && wordCount > 200 && text.length > 500) {
    // Check for perfect its/it's usage (humans mess this up)
    if (hasItsIts || hasYourYoure) {
      patterns.issues.push("Suspiciously perfect spelling/grammar for long casual text");
      patterns.score -= 5;
    }
  }

  // Paragraph length uniformity
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  if (paragraphs.length >= 3) {
    const lengths = paragraphs.map(p => p.split(/\s+/).length);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.every(len => Math.abs(len - avgLength) < avgLength * 0.3);
    if (variance) {
      patterns.issues.push("Paragraphs too uniform in length (AI pattern)");
      patterns.score -= 5;
    }
  }

  patterns.score = Math.max(0, patterns.score);

  if (patterns.score > 80) {
    patterns.verdict = "Sounds human ✓";
  } else if (patterns.score > 50) {
    patterns.verdict = "Some AI tells present";
  } else {
    patterns.verdict = "Strong AI indicators";
  }

  return patterns;
}

// Improvement suggestions
function suggestImprovements(text, platform) {
  const suggestions = {
    platform,
    improvements: [],
  };

  // Platform-specific suggestions
  if (platform === "twitter") {
    if (text.length > 280) {
      suggestions.improvements.push({
        issue: "Too long for Twitter",
        fix: "Break into thread or trim to core message",
      });
    }
    if (!text.match(/\b(like|tbh|ngl|idk|lmao)\b/i)) {
      suggestions.improvements.push({
        issue: "Very formal for Twitter",
        fix: "Add casual markers: 'honestly', 'like', 'idk'",
      });
    }
  }

  if (platform === "linkedin") {
    if (text.length < 100) {
      suggestions.improvements.push({
        issue: "Very short for LinkedIn",
        fix: "LinkedIn rewards longer, story-driven content",
      });
    }
    if (text.match(/\b(lmao|lol|omg)\b/i)) {
      suggestions.improvements.push({
        issue: "Too casual for LinkedIn",
        fix: "Keep it professional but authentic",
      });
    }
  }

  // General improvements
  const patterns = detectAIPatterns(text);
  if (patterns.ai_tells.length > 0) {
    suggestions.improvements.push({
      issue: "AI tell phrases detected",
      fix: `Replace: ${patterns.ai_tells.join(", ")}`,
    });
  }

  if (suggestions.improvements.length === 0) {
    suggestions.improvements.push({
      issue: "None",
      fix: "Text looks good! Sounds natural.",
    });
  }

  return suggestions;
}

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Natural Voice MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
