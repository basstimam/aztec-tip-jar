#!/bin/bash

# Remote PXE Setup: Full Remote Configuration for Simple Deployment
# This script sets up account using full remote PXE (no local setup required)

set -e

# Load environment variables
source .env 2>/dev/null || echo "No .env file found, using defaults"

# Environment variables
NODE_URL=${NODE_URL:-"https://aztec-alpha-testnet-fullnode.zkv.xyz"}
SPONSORED_FPC_ADDRESS=${SPONSORED_FPC_ADDRESS:-"0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2"}
WALLET_ALIAS=${WALLET_ALIAS:-"my-wallet"}

echo "🌐 Setting up Remote PXE Configuration..."
echo "📡 Remote PXE & Node: https://aztec-alpha-testnet-fullnode.zkv.xyz"
echo "👛 Wallet alias: $WALLET_ALIAS"
echo "✨ Simple setup - no local PXE required!"
echo ""

# Function to check if account exists
check_account_exists() {
    echo "🔍 Checking if account already exists..."
    if aztec-wallet accounts list --node-url $NODE_URL | grep -q $WALLET_ALIAS; then
        echo "✅ Account $WALLET_ALIAS already exists!"
        return 0
    else
        echo "ℹ️ Account $WALLET_ALIAS not found, will create new one"
        return 1
    fi
}

# Step 1: Create account (skip if exists)
if ! check_account_exists; then
    echo "1️⃣ Creating account..."
    aztec-wallet create-account \
        --register-only \
        --node-url $NODE_URL \
        --alias $WALLET_ALIAS

    if [ $? -eq 0 ]; then
        echo "✅ Account created successfully!"
    else
        echo "❌ Failed to create account"
        exit 1
    fi
else
    echo "⏭️ Skipping account creation (already exists)"
fi

echo ""

# Step 2: Register with sponsored FPC (allow failure and continue)
echo "2️⃣ Registering with sponsored FPC..."
aztec-wallet register-contract \
    --node-url $NODE_URL \
    --from $WALLET_ALIAS \
    --alias sponsoredfpc \
    $SPONSORED_FPC_ADDRESS SponsoredFPC \
    --salt 0

if [ $? -eq 0 ]; then
    echo "✅ Successfully registered with sponsored FPC!"
else
    echo "⚠️ FPC registration might have failed, but continuing..."
    echo "📝 This might be because it's already registered"
fi

echo ""

# Step 3: Deploy account with extended timeout (10 minutes = 600 seconds)
echo "3️⃣ Deploying account to testnet..."
echo "⏰ Using extended timeout: 10 minutes (600 seconds)"
echo "📝 Note: This process involves client-side proof generation which can take time"
echo "🔄 Please wait, even if it seems stuck..."
echo ""

# Set timeout to 10 minutes (600000 milliseconds)
aztec-wallet deploy-account \
    --node-url $NODE_URL \
    --from $WALLET_ALIAS \
    --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc \
    --register-class \
    --timeout 600000

DEPLOY_RESULT=$?

if [ $DEPLOY_RESULT -eq 0 ]; then
    echo "✅ Account deployed successfully!"
else
    echo "⚠️ Deploy command timed out or failed"
    echo "📋 This doesn't necessarily mean deployment failed!"
    echo "🔍 Please check transaction status manually:"
    echo "   - aztecscan.io"
    echo "   - aztecexplorer.xyz"
    echo ""
    echo "🧪 Test if account is working:"
    echo "   aztec-wallet accounts list --node-url $NODE_URL"
    echo ""
    echo "📝 If account is listed and shows as deployed, you can proceed with contract deployment"
fi

echo ""
echo "🎉 Account setup process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Verify account status: aztec-wallet accounts list --node-url $NODE_URL"
echo "2. Compile contracts: pnpm compile"
echo "3. Deploy token contract: pnpm deploy:token"
echo "4. Update .env with token address"
echo "5. Deploy TipJar contract: pnpm deploy:contract"
echo ""
echo "🔗 Useful commands:"
echo "Check account info: aztec-wallet account info $WALLET_ALIAS --node-url $NODE_URL"
echo "List contracts: aztec-wallet contracts list --node-url $NODE_URL"