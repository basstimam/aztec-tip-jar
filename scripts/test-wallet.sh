#!/bin/bash

# Test script untuk aztec-wallet CLI
# Script ini menguji command aztec-wallet secara bertahap

set -e

echo "🧪 Testing Aztec Wallet CLI..."
echo ""

# Load environment variables
source .env 2>/dev/null || echo "No .env file found, using defaults"

NODE_URL=${NODE_URL:-"https://aztec-alpha-testnet-fullnode.zkv.xyz"}

echo "📋 Configuration:"
echo "   - Node URL: $NODE_URL"
echo ""

# Test 1: Check if aztec-wallet is available
echo "1️⃣ Testing aztec-wallet availability..."
if command -v aztec-wallet &> /dev/null; then
    echo "✅ aztec-wallet found"
    aztec-wallet --version
else
    echo "❌ aztec-wallet not found"
    echo "🔧 Install with: bash -i <(curl -s https://install.aztec.network)"
    exit 1
fi

echo ""

# Test 2: Test node connection
echo "2️⃣ Testing node connection..."
echo "🔗 Connecting to: $NODE_URL"

# Note: We can't easily test node connection without creating an account
# So we'll just proceed to account creation

echo ""

# Test 3: Create account (basic test)
echo "3️⃣ Testing account creation..."
echo "📝 Creating account with minimal parameters..."

aztec-wallet create-account --node-url $NODE_URL

echo ""

# Test 4: List any existing accounts/aliases
echo "4️⃣ Checking account status..."

# Try to get account info
echo "📋 Checking created accounts..."
aztec-wallet get-alias account 2>/dev/null || echo "No account alias found (this is normal)"

echo ""
echo "✅ Basic aztec-wallet tests completed!"
echo ""
echo "🚀 Next steps:"
echo "1. Deploy account: aztec-wallet deploy-account --node-url $NODE_URL"
echo "2. Check deployment status: aztec-wallet get-tx"
echo ""
echo "💡 Tips:"
echo "- Account creation is local, deployment requires testnet transaction"
echo "- Deployment may take 2-10 minutes due to proof generation"
echo "- Check status with get-tx command"