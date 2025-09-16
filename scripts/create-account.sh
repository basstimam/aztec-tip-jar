#!/bin/bash

# Create Account Script for Aztec Testnet
# This script creates and deploys an account using aztec-wallet CLI

set -e

echo "🔄 Creating Aztec Account for Testnet..."
echo ""

# Load environment variables
source .env 2>/dev/null || echo "No .env file found, using defaults"

# Environment variables
NODE_URL=${NODE_URL:-"https://aztec-alpha-testnet-fullnode.zkv.xyz"}
SPONSORED_FPC_ADDRESS=${SPONSORED_FPC_ADDRESS:-"0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2"}
WALLET_ALIAS=${WALLET_ALIAS:-"my-wallet"}

echo "📋 Configuration:"
echo "   - Node URL: $NODE_URL"
echo "   - Wallet Alias: $WALLET_ALIAS"
echo "   - FPC Address: $SPONSORED_FPC_ADDRESS"
echo ""

# Check if aztec-wallet is available
if ! command -v aztec-wallet &> /dev/null; then
    echo "❌ aztec-wallet not found. Installing Aztec CLI..."
    echo "🔧 Running: bash -i <(curl -s https://install.aztec.network)"
    bash -i <(curl -s https://install.aztec.network)
    
    echo "📦 Installing Aztec toolchain..."
    aztec-up -v latest
fi

echo "1️⃣ Creating account with aztec CLI..."
echo "📝 Note: Using aztec CLI with sponsored FPC payment"

# Step 1: Create account using aztec CLI (requires PXE)
echo "🔧 Creating new account..."
aztec create-account \
    --rpc-url $NODE_URL \
    --public-deploy \
    --payment method=fpc-sponsored \
    --no-wait

CREATE_RESULT=$?

if [ $CREATE_RESULT -eq 0 ]; then
    echo "✅ Account created successfully!"
    
    echo ""
    echo "📋 Getting account details..."
    aztec get-accounts --rpc-url $NODE_URL
else
    echo "❌ Account creation failed"
    echo "💡 Try using aztec-wallet instead (it has built-in PXE)"
    echo "🔧 Command: aztec-wallet create-account --node-url $NODE_URL"
    exit 1
fi

RESULT=$?

if [ $RESULT -eq 0 ]; then
    echo "✅ Account created and deployed successfully!"
    echo ""
    echo "🎉 Account Setup Complete!"
    echo ""
    echo "📋 Account Details:"
    echo "   - Alias: $WALLET_ALIAS"
    echo "   - Network: Aztec Testnet"
    echo "   - Node: $NODE_URL"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Compile contracts: pnpm compile"
    echo "2. Deploy token: pnpm deploy:token"
    echo "3. Deploy TipJar: pnpm deploy:contract"
    echo ""
    echo "🛠️ Useful Commands:"
    echo "List accounts: aztec-wallet list-accounts --node-url $NODE_URL"
    echo "Get account info: aztec-wallet get-account --alias $WALLET_ALIAS --node-url $NODE_URL"
else
    echo "⚠️ Account creation failed or timed out"
    echo "🔍 This might be normal for testnet - check transaction status"
    echo "📖 Try: aztec-wallet list-accounts --node-url $NODE_URL"
    exit 1
fi