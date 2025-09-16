# Account Management Fix untuk Aztec CLI v1.2.0

## Masalah
Error `unknown command 'accounts'` terjadi karena di Aztec v1.2.0, command `aztec accounts` tidak tersedia. Account management menggunakan `aztec-wallet` CLI.

## Solusi

### 1. Script Baru untuk Membuat Account
Script `create-account.sh` telah dibuat yang menggunakan `aztec-wallet` CLI:

```bash
pnpm create:account
```

### 2. Script Hybrid PXE yang Diperbaiki
Script `setup-hybrid-pxe.sh` telah diperbaiki untuk menggunakan `aztec-wallet` CLI:

```bash
pnpm setup:hybrid
```

## Command CLI yang Benar (v1.2.0)

### ❌ Command Lama (Tidak Berfungsi)
```bash
aztec accounts create --alias my-wallet
aztec accounts list
```

### ✅ Command Baru (v1.2.0)
```bash
# Membuat account (local)
aztec-wallet create-account --node-url NODE_URL

# Deploy account (ke testnet)
aztec-wallet deploy-account --node-url NODE_URL --timeout 600000

# Get account info/aliases  
aztec-wallet get-alias account

# Get transaction status
aztec-wallet get-tx [txHash]

# Import test accounts (untuk sandbox)
aztec-wallet import-test-accounts
```

## Perbedaan Utama

1. **CLI Tool**: `aztec accounts` → `aztec-wallet`
2. **Command Structure**: 
   - Lama: `aztec accounts create`
   - Baru: `aztec-wallet create-account`
3. **Node URL**: Wajib menggunakan `--node-url` parameter

## Penggunaan

### Membuat Account Baru
```bash
# Metode sederhana - test basic functionality
pnpm test:wallet

# Membuat dan deploy account
pnpm create:account

# Manual - step by step
# 1. Create account (local)
aztec-wallet create-account --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz

# 2. Deploy account (testnet)
aztec-wallet deploy-account --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz --timeout 600000
```

### Setup Hybrid PXE
```bash
pnpm setup:hybrid
```

Script ini akan:
1. Setup local PXE (jika diperlukan)
2. Membuat account menggunakan aztec-wallet
3. Deploy account ke testnet
4. Konfigurasi environment

## Environment Variables
```bash
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
WALLET_ALIAS=my-wallet
SPONSORED_FPC_ADDRESS=0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2
```

## Troubleshooting

### Jika masih error "unknown command"
1. Update Aztec CLI: `aztec-up -v latest`
2. Check version: `aztec-wallet --version`
3. Pastikan menggunakan `aztec-wallet` bukan `aztec accounts`

### Jika timeout saat deploy
- Normal untuk testnet karena proof generation lama
- Check status di aztecscan.io atau aztecexplorer.xyz
- Timeout diset ke 10 menit (600000ms)