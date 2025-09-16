# 🚀 Aztec Private Tip Jar - Deployment Guide

Deployment process yang tepat untuk Tip Jar di Aztec Network.

## 📋 Urutan Deployment

### 1. **Deploy Token Contract Dulu** 🪙
```bash
pnpm deploy:token
```

**Output yang akan didapat:**
```
📍 Token Contract Address: 0x1234...abcd
👤 Admin Address: 0x5678...efgh
💡 Next step: Add to .env: ACCEPTED_TOKEN=0x1234...abcd
```

### 2. **Update .env dengan Token Address** ⚙️
```bash
# Tambahkan ke .env
ACCEPTED_TOKEN=0x1234...abcd  # dari output step 1
```

### 3. **Deploy TipJar Contract** 💰
```bash
pnpm deploy:contract
```

**Output yang akan didapat:**
```
📍 Contract Address: 0x9abc...def0
👤 Owner Address: 0x5678...efgh
💰 Accepted Token: 0x1234...abcd
💡 Next step: Add to .env: TIPJAR_ADDRESS=0x9abc...def0
```

### 4. **Update .env dengan TipJar Address** ⚙️
```bash
# Tambahkan ke .env
TIPJAR_ADDRESS=0x9abc...def0  # dari output step 3
```

### 5. **Regenerate TypeScript Artifacts** 🔄
```bash
pnpm codegen
```

---

## 🔧 Environment Variables (.env)

Setelah deployment, .env kamu harus berisi:

```bash
# PXE Connection
PXE_URL=http://localhost:8080

# Contract Addresses (diisi setelah deployment)
ACCEPTED_TOKEN=0x1234...abcd      # Token contract address
TIPJAR_ADDRESS=0x9abc...def0      # TipJar contract address

# Frontend
NEXT_PUBLIC_PXE_URL=http://localhost:8080
NEXT_PUBLIC_TIPJAR_ADDRESS=0x9abc...def0
NEXT_PUBLIC_ACCEPTED_TOKEN=0x1234...abcd
```

---

## ⚠️ Troubleshooting

### Error: "ACCEPTED_TOKEN environment variable is required"
- **Penyebab**: Belum deploy token atau belum update .env
- **Solusi**: Jalankan `pnpm deploy:token` dulu, lalu update .env

### Error: "No test accounts found"
- **Penyebab**: Aztec Sandbox tidak running
- **Solusi**: Jalankan `aztec-up` untuk start sandbox

### Error: "Cannot find module"
- **Penyebab**: Missing TypeScript artifacts
- **Solusi**: Jalankan `pnpm codegen` setelah deployment

---

## 🎯 Mengapa Token Dulu?

1. **TipJar Contract** membutuhkan `accepted_token` address di constructor
2. **Token Contract** harus sudah ada sebelum TipJar bisa di-deploy
3. **Address validation** - Aztec memvalidasi bahwa token address benar-benar ada

---

## 🔄 Full Deployment Flow

```bash
# 1. Build contracts
pnpm build:contracts

# 2. Generate artifacts
pnpm codegen

# 3. Deploy token first
pnpm deploy:token

# 4. Update .env dengan ACCEPTED_TOKEN

# 5. Deploy TipJar
pnpm deploy:contract

# 6. Update .env dengan TIPJAR_ADDRESS

# 7. Regenerate artifacts dengan alamat yang benar
pnpm codegen

# 8. Test frontend
pnpm dev
```

---

**🎉 Setelah deployment berhasil, frontend siap digunakan!**
