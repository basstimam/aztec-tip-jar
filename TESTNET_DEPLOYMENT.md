# 🌐 Aztec Testnet Deployment Guide

## 📋 Prerequisites

### 1. Install Aztec CLI
```bash
bash -i <(curl -s https://install.aztec.network)
aztec-up -v latest
```

### 2. Verify Installation
```bash
aztec-wallet --version
aztec-nargo --version
```

## 🚀 Deployment Process

### Step 1: Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env file dengan konfigurasi testnet
# NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
# SPONSORED_FPC_ADDRESS=0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2
# WALLET_ALIAS=my-wallet
```

### Step 2: Setup Testnet Account
```bash
# Run setup script
pnpm setup:testnet
```

Script ini akan:
1. ✅ Create account dengan alias `my-wallet`
2. ✅ Register dengan sponsored FPC (gratis fees)
3. ✅ Deploy account ke testnet

### Step 3: Compile Contracts
```bash
# Compile Noir contracts
pnpm compile

# Generate TypeScript artifacts
pnpm codegen
```

### Step 4: Deploy Token Contract
```bash
# Deploy token ke testnet
pnpm deploy:token
```

Output akan menampilkan:
```
✅ Token contract deployment initiated!
📋 Token Configuration:
   - Name: TipToken
   - Symbol: TIP
   - Decimals: 18
   - Admin: Current wallet account
```

### Step 5: Update Environment dengan Token Address

Setelah deployment selesai dan transaction di-mine:

1. Check transaction di [aztecscan.io](https://aztecscan.io) atau [aztecexplorer.xyz](https://aztecexplorer.xyz)
2. Get contract address dari explorer
3. Update `.env` file:
```bash
ACCEPTED_TOKEN=0x<token_contract_address>
```

### Step 6: Mint Test Tokens
```bash
# Mint tokens for testing
aztec-wallet send mint_public \
  --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz \
  --from accounts:my-wallet \
  --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc \
  --contract-address token \
  --args accounts:my-wallet 1000000
```

### Step 7: Deploy TipJar Contract
```bash
# Deploy TipJar contract
pnpm deploy:contract
```

### Step 8: Update Environment dengan TipJar Address
```bash
TIPJAR_ADDRESS=0x<tipjar_contract_address>
```

## 🧪 Testing Deployment

### Check Token Balance
```bash
aztec-wallet simulate balance_of_public \
  --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz \
  --from my-wallet \
  --contract-address token \
  --args accounts:my-wallet
```

### Send Test Tip
```bash
aztec-wallet send tip_private \
  --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz \
  --from accounts:my-wallet \
  --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc \
  --contract-address tipjar \
  --args 100
```

## 🔧 Troubleshooting

### Error: "No accounts found"
```bash
# Create account first
aztec-wallet create-account --register-only --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz --alias my-wallet
```

### Error: "Contract not found"
```bash
# Make sure contract is deployed and transaction is mined
# Check on aztecscan.io
```

### Error: "Insufficient funds"
```bash
# Make sure you've minted tokens first
aztec-wallet send mint_public --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz --from accounts:my-wallet --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc --contract-address token --args accounts:my-wallet 1000000
```

## 📱 Frontend Integration

Setelah contracts deployed, update frontend environment:
```bash
NEXT_PUBLIC_NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NEXT_PUBLIC_TIPJAR_ADDRESS=0x<tipjar_address>
NEXT_PUBLIC_ACCEPTED_TOKEN=0x<token_address>
```

Kemudian jalankan frontend:
```bash
pnpm dev
```

## 🌍 Testnet Resources

- **Explorer**: [aztecscan.io](https://aztecscan.io)
- **Alternative Explorer**: [aztecexplorer.xyz](https://aztecexplorer.xyz)
- **Documentation**: [docs.aztec.network](https://docs.aztec.network)
- **Discord**: [Aztec Discord](https://discord.gg/aztec)

## 🎯 Summary

Setelah mengikuti guide ini, Anda akan memiliki:
- ✅ Account di Aztec testnet
- ✅ Token contract deployed dan functional
- ✅ TipJar contract deployed dan terhubung ke token
- ✅ Frontend yang terhubung ke testnet
- ✅ Kemampuan untuk send/receive tips secara private

**Total waktu deployment: ~10-15 menit**