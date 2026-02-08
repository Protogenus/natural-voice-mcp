#!/bin/bash

# Natural Voice MCP Server - Quick Setup Script

echo "🎯 Setting up Natural Voice MCP Server..."
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js found: $NODE_VERSION"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Installation complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Note your installation path:"
echo "   $(pwd)"
echo ""
echo "2. Edit your Claude Desktop config:"
echo "   macOS: ~/Library/Application Support/Claude/claude_desktop_config.json"
echo "   Windows: %APPDATA%\\Claude\\claude_desktop_config.json"
echo ""
echo "3. Add this to the mcpServers section:"
echo ""
echo '   {
     "mcpServers": {
       "natural-voice": {
         "command": "node",
         "args": ["'$(pwd)'/index.js"]
       }
     }
   }'
echo ""
echo "4. Restart Claude Desktop"
echo ""
echo "5. Try it out:"
echo "   'Can you read the Twitter voice guide and help me write a tweet?'"
echo ""
echo "📖 Read README.md for full documentation"
echo "💡 Check EXAMPLES.md for usage examples"
