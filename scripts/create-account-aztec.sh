#!/bin/bash

# Create Account using Aztec CLI (requires PXE running)
# Based on official documentation at .qoder/rules/account-management.md

set -e

echo "🔄 Creating Aztec Account using aztec CLI..."
echo "📋 Note: This requires a PXE to be running already"
echo ""

# Load environment variables
source .env 2>/dev/null || echo "No .env file found, using defaults"

# Environment variables
NODE_URL=${NODE_URL:-"https://aztec-alpha-testnet-fullnode.zkv.xyz"}
PXE_URL=${PXE_URL:-"http://localhost:8080"}

echo "📋 Configuration:"
echo "   - PXE URL: $PXE_URL"
echo "   - Node URL: $NODE_URL"
echo ""

# Check if PXE is running
echo "1️⃣ Checking PXE availability..."
if curl -f -s $PXE_URL > /dev/null 2>&1; then
    echo "✅ PXE is running at $PXE_URL"
else
    echo "❌ PXE not running at $PXE_URL"
    echo "🚀 Starting hybrid PXE setup..."
    
    # Start PXE if not running
    if ! command -v aztec-up &> /dev/null; then
        echo "📦 Installing Aztec CLI..."
        bash -i <(curl -s https://install.aztec.network)
        aztec-up -v latest
    fi
    
    echo "🔧 Starting PXE connected to testnet..."
    nohup aztec start --pxe --pxe.node-url=$NODE_URL --port 8080 > pxe.log 2>&1 &
    
    echo "⏳ Waiting for PXE to start..."
    for i in {1..30}; do
        if curl -f -s $PXE_URL > /dev/null 2>&1; then
            echo "✅ PXE started successfully!"
            break
        fi
        echo "⏳ Waiting for PXE... ($i/30)"
        sleep 2
    done
    
    if ! curl -f -s $PXE_URL > /dev/null 2>&1; then
        echo "❌ Failed to start PXE"
        echo "📖 Check logs: tail -f pxe.log"
        exit 1
    fi
fi

echo ""
echo "2️⃣ Creating account with aztec CLI..."

# Create account using aztec CLI (official documentation)
echo "📝 Creating account with sponsored FPC..."
aztec create-account \
    --rpc-url $PXE_URL \
    --public-deploy \
    --payment method=fpc-sponsored \
    --no-wait

CREATE_RESULT=$?

if [ $CREATE_RESULT -eq 0 ]; then
    echo "✅ Account created and deployed successfully!"
    
    echo ""
    echo "3️⃣ Getting account details..."
    aztec get-accounts --rpc-url $PXE_URL --json
    
    echo ""
    echo "🎉 Account Setup Complete!"
    echo ""
    echo "📋 Configuration Summary:"
    echo "   ✅ PXE: $PXE_URL"
    echo "   ✅ Testnet Node: $NODE_URL"
    echo "   ✅ Account created and deployed"
    
else
    echo "❌ Account creation failed"
    echo ""
    echo "🔄 Alternative: Use aztec-wallet (has built-in PXE)"
    echo "📝 Command: aztec-wallet create-account --node-url $NODE_URL"
    echo "📝 Then: aztec-wallet deploy-account --node-url $NODE_URL"
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
echo "Check accounts: aztec get-accounts --rpc-url $PXE_URL"
echo "Check PXE: curl -f $PXE_URL"
echo "View PXE logs: tail -f pxe.log"