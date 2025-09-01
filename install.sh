#!/bin/bash
# SSHMan Installation Script

echo "🚀 Installing SSHMan CLI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Make it executable
chmod +x bin/sshman.js

# Create symlink to make sshman command globally available
echo "🔗 Creating global symlink..."
sudo ln -sf "$(pwd)/bin/sshman.js" /usr/local/bin/sshman

echo ""
echo "✅ SSHMan installed successfully!"
echo ""
echo "📋 Usage:"
echo "  sshman add <host>           - Add a new server"
echo "  sshman list                 - List all servers"
echo "  sshman connect <alias>      - Connect to a server"
echo "  sshman remove <alias>       - Remove a server"
echo "  sshman edit <alias>         - Edit a server"
echo ""
echo "💡 Try: sshman --help"
echo ""
echo "📁 Config stored in: ~/.sshman/config.json"