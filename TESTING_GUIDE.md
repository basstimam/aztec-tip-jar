# Testing Guide - Aztec Wallet CLI

## Quick Test Commands

### 1. Test Basic Wallet Functionality
```bash
pnpm test:wallet
```
Script ini akan:
- ✅ Check if aztec-wallet is installed
- ✅ Test node connection
- ✅ Create account (local)
- ✅ Show next steps

### 2. Create and Deploy Account
```bash
pnpm create:account
```
Script ini akan:
- ✅ Create account locally
- ✅ Deploy account to testnet
- ⏱️ Timeout: 10 minutes

### 3. Setup Hybrid PXE (Diperbaiki)
```bash
pnpm setup:hybrid
```
Script ini akan:
- ✅ Setup local PXE
- ✅ Create and deploy account
- ✅ Configure environment

## Manual Testing

### Step 1: Check Installation
```bash
aztec-wallet --version
aztec-wallet --help
```

### Step 2: Create Account
```bash
aztec-wallet create-account --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz
```

### Step 3: Deploy Account
```bash
aztec-wallet deploy-account --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz --timeout 600000
```

### Step 4: Check Status
```bash
# Check account aliases
aztec-wallet get-alias account

# Check recent transactions
aztec-wallet get-tx
```

## Troubleshooting

### If aztec-wallet not found:
```bash
# Install Aztec CLI
bash -i <(curl -s https://install.aztec.network)

# Install toolchain
aztec-up -v latest
```

### If deployment fails:
1. ⏰ **Timeout normal** - proof generation takes time
2. 🔍 **Check status** - `aztec-wallet get-tx`
3. 🌐 **Check explorer** - aztecscan.io or aztecexplorer.xyz
4. 🔄 **Retry** - `pnpm create:account`

### If connection issues:
```bash
# Test node URL manually
curl -X POST https://aztec-alpha-testnet-fullnode.zkv.xyz \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"node_getInfo","id":1}'
```

## Expected Output

### Successful Account Creation:
```
✅ Account created successfully
📝 Account registered in local wallet
🚀 Ready for deployment
```

### Successful Deployment:
```
✅ Account deployed to testnet
📋 Transaction hash: 0x...
🎉 Account ready for use
```

### Timeout (Normal):
```
⚠️ Account deployment timed out (this is normal)
🔍 Check transaction status on aztecscan.io
📝 Account may still be deploying in background
```

## Next Steps After Account Creation

1. **Compile Contracts**:
   ```bash
   pnpm compile
   ```

2. **Deploy Token**:
   ```bash
   pnpm deploy:token
   ```

3. **Deploy TipJar**:
   ```bash
   pnpm deploy:contract
   ```

4. **Test Frontend**:
   ```bash
   pnpm dev
   ```

## Environment Variables Check

Make sure your `.env` file has:
```bash
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
PXE_URL=http://localhost:8080
SPONSORED_FPC_ADDRESS=0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2
```