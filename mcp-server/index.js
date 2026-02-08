#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
    ListPromptsRequestSchema,
    GetPromptRequestSchema,
    CallToolRequestSchema,
    ListToolsRequestSchema,
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

// Resource definitions
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
        description: "Systems for cognitive realism: motivation, energy, persona",
        mimeType: "text/markdown",
    },
};

// Tool definitions
const TOOLS = [
    {
        name: "analyze_voice",
        description: "Analyze text for AI patterns and return a human-likeness score (0-100)",
        inputSchema: {
            type: "object",
            properties: {
                text: {
                    type: "string",
                    description: "The text to analyze",
                },
            },
            required: ["text"],
        },
    },
    {
        name: "humanize_text",
        description: "Get suggestions to make text sound more natural and human",
        inputSchema: {
            type: "object",
            properties: {
                text: {
                    type: "string",
                    description: "The text to humanize",
                },
                platform: {
                    type: "string",
                    enum: ["twitter", "linkedin", "reddit", "facebook", "general"],
                    description: "Target platform (optional)",
                },
            },
            required: ["text"],
        },
    },
];

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

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOLS };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;

    if (toolName === "analyze_voice") {
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

    if (toolName === "humanize_text") {
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

// AI pattern detection
function detectAIPatterns(text) {
    const patterns = {
        ai_tells: [],
        score: 100,
        issues: [],
    };

    // Corporate enthusiasm
    const enthusiasmPhrases = [
        "thrilled to announce", "excited to share", "delighted to present",
        "over the moon", "humbled and honored",
    ];
    enthusiasmPhrases.forEach((phrase) => {
        if (text.toLowerCase().includes(phrase)) {
            patterns.ai_tells.push(`Corporate enthusiasm: "${phrase}"`);
            patterns.score -= 10;
        }
    });

    // Formal transitions
    const formalTransitions = [
        "furthermore", "moreover", "additionally", "in conclusion", "it is worth noting",
    ];
    formalTransitions.forEach((phrase) => {
        if (text.toLowerCase().includes(phrase)) {
            patterns.ai_tells.push(`Formal transition: "${phrase}"`);
            patterns.score -= 5;
        }
    });

    // Check for contractions
    const hasContractions = /\b(don't|can't|won't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|wouldn't|shouldn't|couldn't)\b/i.test(text);
    if (!hasContractions && text.length > 100) {
        patterns.issues.push("No contractions found (sounds stiff)");
        patterns.score -= 10;
    }

    // Em dash overuse
    const emDashCount = (text.match(/—/g) || []).length;
    const wordCount = text.split(/\s+/).length;
    if (emDashCount > 2 && wordCount < 500) {
        patterns.issues.push(`Em dash overuse (${emDashCount} in ${wordCount} words)`);
        patterns.score -= 10;
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

    if (platform === "twitter") {
        if (text.length > 280) {
            suggestions.improvements.push({
                issue: "Too long for Twitter",
                fix: "Break into thread or trim to core message",
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
    }

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
