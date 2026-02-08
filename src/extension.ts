import * as vscode from 'vscode';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';

let mcpServerProcess: ChildProcess | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Natural Voice MCP extension activated');

    // Register start server command
    const startServerCmd = vscode.commands.registerCommand(
        'natural-voice-mcp.startServer',
        () => startMcpServer(context)
    );

    // Register detect AI patterns command
    const detectPatternsCmd = vscode.commands.registerCommand(
        'natural-voice-mcp.detectAIPatterns',
        () => detectAIPatternsInSelection()
    );

    context.subscriptions.push(startServerCmd, detectPatternsCmd);

    // Auto-start if configured
    const config = vscode.workspace.getConfiguration('natural-voice-mcp');
    if (config.get('autoStart')) {
        startMcpServer(context);
    }

    // Register MCP server info for Antigravity/Claude
    registerMcpServer(context);
}

function startMcpServer(context: vscode.ExtensionContext) {
    if (mcpServerProcess) {
        vscode.window.showInformationMessage('Natural Voice MCP server is already running');
        return;
    }

    const serverPath = path.join(context.extensionPath, 'mcp-server', 'index.js');

    mcpServerProcess = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    mcpServerProcess.on('error', (err) => {
        vscode.window.showErrorMessage(`Failed to start MCP server: ${err.message}`);
        mcpServerProcess = null;
    });

    mcpServerProcess.on('exit', (code) => {
        if (code !== 0) {
            vscode.window.showWarningMessage(`MCP server exited with code ${code}`);
        }
        mcpServerProcess = null;
    });

    vscode.window.showInformationMessage('Natural Voice MCP server started');
}

async function detectAIPatternsInSelection() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor');
        return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
        vscode.window.showWarningMessage('No text selected');
        return;
    }

    // Run the detection logic
    const patterns = detectAIPatterns(text);

    // Show results in output channel
    const outputChannel = vscode.window.createOutputChannel('Natural Voice');
    outputChannel.clear();
    outputChannel.appendLine('=== AI Pattern Detection Results ===\n');
    outputChannel.appendLine(`Score: ${patterns.score}/100`);
    outputChannel.appendLine(`Verdict: ${patterns.verdict}\n`);

    if (patterns.ai_tells.length > 0) {
        outputChannel.appendLine('AI Tells Found:');
        patterns.ai_tells.forEach((tell: string) => outputChannel.appendLine(`  • ${tell}`));
        outputChannel.appendLine('');
    }

    if (patterns.issues.length > 0) {
        outputChannel.appendLine('Issues:');
        patterns.issues.forEach((issue: string) => outputChannel.appendLine(`  • ${issue}`));
    }

    outputChannel.show();
}

function detectAIPatterns(text: string): { ai_tells: string[], issues: string[], score: number, verdict: string } {
    const patterns = {
        ai_tells: [] as string[],
        score: 100,
        issues: [] as string[],
        verdict: ''
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

function registerMcpServer(context: vscode.ExtensionContext) {
    // This creates the MCP server configuration for Antigravity
    const mcpConfig = {
        name: "natural-voice",
        command: "node",
        args: [path.join(context.extensionPath, 'mcp-server', 'index.js')],
        resources: [
            { uri: "natural-voice://patterns/conversational", name: "Conversational Patterns" },
            { uri: "natural-voice://anti-patterns/ai-tells", name: "AI Tell Anti-Patterns" },
            { uri: "natural-voice://systems/cognitive-posture", name: "Cognitive Posture Engine" },
            { uri: "natural-voice://platforms/twitter", name: "Twitter Voice Guide" },
            { uri: "natural-voice://platforms/linkedin", name: "LinkedIn Voice Guide" },
        ],
        tools: [
            { name: "detect_ai_patterns", description: "Detect AI-generated patterns in text" },
            { name: "suggest_improvements", description: "Suggest improvements for natural voice" },
        ]
    };

    // Store for extension API access
    (context as any).mcpServerConfig = mcpConfig;
}

export function deactivate() {
    if (mcpServerProcess) {
        mcpServerProcess.kill();
        mcpServerProcess = null;
    }
}
