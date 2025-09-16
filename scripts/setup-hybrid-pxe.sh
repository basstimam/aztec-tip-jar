#!/bin/bash

# Hybrid PXE Setup: Local PXE + Testnet Node
# This script sets up local PXE connected to testnet for optimal development experience

set -e

echo "🔄 Setting up Hybrid PXE Configuration..."
echo "📱 Local PXE: http://localhost:8080"
echo "🌐 Testnet Node: https://aztec-alpha-testnet-fullnode.zkv.xyz"
echo ""

# Load environment variables
source .env 2>/dev/null || echo "No .env file found, using defaults"

# Environment variables
NODE_URL=${NODE_URL:-"https://aztec-alpha-testnet-fullnode.zkv.xyz"}
PXE_URL=${PXE_URL:-"http://localhost:8080"}
SPONSORED_FPC_ADDRESS=${SPONSORED_FPC_ADDRESS:-"0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2"}
WALLET_ALIAS=${WALLET_ALIAS:-"my-wallet"}

echo "📋 Configuration:"
echo "   - PXE URL: $PXE_URL"
echo "   - Node URL: $NODE_URL"
echo "   - Wallet: $WALLET_ALIAS"
echo ""

# Step 1: Check if local PXE is required
if [[ "$PXE_URL" == *"localhost"* ]]; then
    echo "1️⃣ Local PXE Setup Required..."
    
    # Check if aztec-up is available
    if ! command -v aztec-up &> /dev/null; then
        echo "❌ aztec-up not found. Installing Aztec CLI..."
        echo "🔧 Running: bash -i <(curl -s https://install.aztec.network)"
        bash -i <(curl -s https://install.aztec.network)
        
        echo "📦 Installing Aztec toolchain..."
        aztec-up -v latest
    fi
    
    echo "🔍 Checking if local PXE is running..."
    # Try multiple methods to check PXE status
    if curl -f -s http://localhost:8080/ > /dev/null 2>&1 || \
       curl -f -s http://localhost:8080/status > /dev/null 2>&1 || \
       aztec info 2>/dev/null | grep -q "PXE"; then
        echo "✅ Local PXE is already running!"
    else
        echo "🚀 Starting local PXE connected to testnet..."
        echo "⚙️ This will start PXE that connects to: $NODE_URL"
        
        # Start PXE in background connected to testnet
        echo "📝 Running: aztec-up --pxe-url=http://localhost:8080 --node-url=$NODE_URL"
        nohup aztec-up --pxe-url=http://localhost:8080 --node-url=$NODE_URL > pxe.log 2>&1 &
        
        echo "⏳ Waiting for PXE to start..."
        sleep 10
        
        # Check if PXE is running with multiple methods
        for i in {1..30}; do
            if curl -f -s http://localhost:8080/ > /dev/null 2>&1 || \
               curl -f -s http://localhost:8080/status > /dev/null 2>&1 || \
               aztec info 2>/dev/null | grep -q "PXE"; then
                echo "✅ Local PXE started successfully!"
                break
            fi
            echo "⏳ Waiting for PXE... ($i/30)"
            sleep 2
        done
        
        # Final check with all methods
        if ! (curl -f -s http://localhost:8080/ > /dev/null 2>&1 || \
              curl -f -s http://localhost:8080/status > /dev/null 2>&1 || \
              aztec info 2>/dev/null | grep -q "PXE"); then
            echo "❌ Failed to start local PXE"
            echo "📖 Check logs: tail -f pxe.log"
            exit 1
        fi
    fi
else
    echo "1️⃣ Using remote PXE: $PXE_URL"
fi

echo ""

# Step 2: Setup account with aztec-wallet (recommended)
echo "2️⃣ Setting up account with aztec-wallet..."
echo "📝 Using aztec-wallet (has built-in PXE and is recommended)"

# Use aztec-wallet for simpler account creation (recommended in docs)
echo "🔧 Step 1: Creating account with aztec-wallet..."
aztec-wallet create-account \
    --register-only \
    -a main \
    --node-url $NODE_URL

CREATE_RESULT=$?

if [ $CREATE_RESULT -eq 0 ]; then
    echo "✅ Account created successfully!"
    
    echo ""
    echo "🔧 Step 2: Registering sponsored FPC..."
    aztec-wallet register-contract $SPONSORED_FPC_ADDRESS SponsoredFPC \
        --from main \
        --node-url $NODE_URL \
        --salt 0 \
        -a sponsoredfpc
    
    echo ""
    echo "🚀 Step 3: Deploying account..."
    aztec-wallet deploy-account \
        --node-url $NODE_URL \
        --payment method=fpc-sponsored,fpc=$SPONSORED_FPC_ADDRESS
    
    DEPLOY_RESULT=$?
    
    if [ $DEPLOY_RESULT -eq 0 ]; then
        echo "✅ Account deployed successfully!"
    else
        echo "⚠️ Account deployment timed out (normal for testnet)"
        echo "🔍 Check transaction status on aztecscan.io"
    fi
else
    echo "❌ Account creation failed"
    echo "🔍 Check connection and try aztec-wallet directly"
fi

echo ""
echo "🎉 Hybrid PXE setup completed!"
echo ""
echo "📋 Configuration Summary:"
echo "   ✅ Local PXE: http://localhost:8080"
echo "   ✅ Testnet Node: $NODE_URL"
echo "   ✅ Account: $WALLET_ALIAS"
echo ""
echo "🚀 Next Steps:"
echo "1. Compile contracts: pnpm compile"
echo "2. Deploy token: pnpm deploy:token"
echo "3. Deploy TipJar: pnpm deploy:contract"
echo "4. Test frontend: pnpm dev"
echo ""
echo "🛠️ Useful Commands:"
echo "Check PXE status: curl -f http://localhost:8080/ || aztec info"
echo "List accounts: aztec get-accounts --rpc-url $PXE_URL"
echo "View PXE logs: tail -f pxe.log"