#!/bin/bash

# Aztec Testnet Account Setup Script
# This script sets up an account for deployment to Aztec testnet

set -e

# Load environment variables
source .env 2>/dev/null || echo "No .env file found, using defaults"

# Environment variables
NODE_URL=${NODE_URL:-"https://aztec-alpha-testnet-fullnode.zkv.xyz"}
SPONSORED_FPC_ADDRESS=${SPONSORED_FPC_ADDRESS:-"0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2"}
WALLET_ALIAS=${WALLET_ALIAS:-"my-wallet"}

echo "🚀 Setting up Aztec testnet account..."
echo "📡 Node URL: $NODE_URL"
echo "👛 Wallet alias: $WALLET_ALIAS"
echo "💰 Sponsored FPC: $SPONSORED_FPC_ADDRESS"
echo ""

# Step 1: Create account
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

echo ""

# Step 2: Register with sponsored FPC
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
    echo "❌ Failed to register with sponsored FPC"
    exit 1
fi

echo ""

# Step 3: Deploy account
echo "3️⃣ Deploying account to testnet..."
aztec-wallet deploy-account \
    --node-url $NODE_URL \
    --from $WALLET_ALIAS \
    --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc \
    --register-class

if [ $? -eq 0 ]; then
    echo "✅ Account deployed successfully!"
else
    echo "❌ Failed to deploy account"
    exit 1
fi

echo ""
echo "🎉 Account setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Compile your contracts: pnpm compile"
echo "2. Deploy token contract: pnpm deploy:token"
echo "3. Update .env with token address"
echo "4. Deploy TipJar contract: pnpm deploy:contract"
echo ""
echo "📖 Check your account info:"
echo "aztec-wallet accounts list --node-url $NODE_URL"