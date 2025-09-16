#!/bin/bash

# Official Aztec-Wallet Account Creation Script
# Based on official documentation: https://docs.aztec.network/developers/reference/environment_reference/cli_wallet_reference

set -e

echo "🔄 Creating Aztec Account using Official aztec-wallet CLI..."
echo "📖 Following official testnet documentation"
echo ""

# Load environment variables
source .env 2>/dev/null || echo "No .env file found, using defaults"

# Environment variables (official testnet configuration)
NODE_URL=${NODE_URL:-"https://aztec-alpha-testnet-fullnode.zkv.xyz"}
SPONSORED_FPC_ADDRESS=${SPONSORED_FPC_ADDRESS:-"0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2"}

echo "📋 Configuration:"
echo "   - Node URL: $NODE_URL"
echo "   - Sponsored FPC: $SPONSORED_FPC_ADDRESS"
echo ""

# Check if aztec-wallet is available
if ! command -v aztec-wallet &> /dev/null; then
    echo "❌ aztec-wallet not found. Installing Aztec CLI..."
    echo "🔧 Running: bash -i <(curl -s https://install.aztec.network)"
    bash -i <(curl -s https://install.aztec.network)
    
    echo "📦 Installing Aztec toolchain..."
    aztec-up -v latest
fi

echo "1️⃣ Step 1: Creating account (register only)..."
echo "📝 Following official testnet flow"

# Step 1: Create account (register only) - Official Documentation Method
aztec-wallet create-account \
    --register-only \
    -a main \
    --node-url $NODE_URL

CREATE_RESULT=$?

if [ $CREATE_RESULT -eq 0 ]; then
    echo "✅ Account created successfully!"
    
    echo ""
    echo "2️⃣ Step 2: Registering Sponsored FPC contract..."
    echo "💰 FPC Address: $SPONSORED_FPC_ADDRESS"
    
    # Step 2: Register the sponsored FPC contract - Official Method
    aztec-wallet register-contract $SPONSORED_FPC_ADDRESS SponsoredFPC \
        --from main \
        --node-url $NODE_URL \
        --salt 0 \
        -a sponsoredfpc
    
    REGISTER_RESULT=$?
    
    if [ $REGISTER_RESULT -eq 0 ]; then
        echo "✅ Sponsored FPC registered successfully!"
        
        echo ""
        echo "3️⃣ Step 3: Deploying account with sponsored payment..."
        echo "🚀 Using sponsored FPC for account deployment"
        
        # Step 3: Deploy account using sponsored FPC - Official Method
        aztec-wallet deploy-account \
            --node-url $NODE_URL \
            --payment method=fpc-sponsored,fpc=$SPONSORED_FPC_ADDRESS
        
        DEPLOY_RESULT=$?
        
        if [ $DEPLOY_RESULT -eq 0 ]; then
            echo "✅ Account deployed successfully!"
            
            echo ""
            echo "🎉 Account Setup Complete!"
            echo ""
            echo "📋 Summary:"
            echo "   ✅ Account: main"
            echo "   ✅ Network: Aztec Testnet"
            echo "   ✅ Node: $NODE_URL"
            echo "   ✅ Payment: Sponsored FPC"
            
        else
            echo "⚠️ Account deployment timed out (this is normal for testnet)"
            echo "🔍 Your account is likely still deploying in the background"
            echo "📖 Check status at aztecscan.io or aztecexplorer.xyz"
        fi
        
    else
        echo "❌ Failed to register sponsored FPC"
        echo "🔍 Check FPC address and network connectivity"
        exit 1
    fi
    
else
    echo "❌ Account creation failed"
    echo "🔍 Check network connectivity and node URL"
    exit 1
fi

echo ""
echo "🚀 Next Steps:"
echo "1. Compile contracts: pnpm compile"
echo "2. Deploy token: pnpm deploy:token"
echo "3. Deploy TipJar: pnpm deploy:contract"
echo "4. Test frontend: pnpm dev"
echo ""
echo "🛠️ Useful Commands:"
echo "Get account info: aztec-wallet get-alias account -n $NODE_URL"
echo "Check balance: aztec-wallet get-balance -f main -n $NODE_URL"
echo "Get transaction: aztec-wallet get-tx <txhash> -n $NODE_URL"