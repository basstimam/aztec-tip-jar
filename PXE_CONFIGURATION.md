# 🔧 PXE Configuration Guide

## 🎯 **PXE Options untuk Aztec Testnet**

PXE (Private Execution Environment) dapat dikonfigurasi dalam beberapa cara tergantung kebutuhan development:

## 📋 **Option 1: Hybrid Setup (RECOMMENDED) 🌟**

### ✅ **Local PXE + Testnet Node**
**Configuration:** `PXE_URL=localhost:8080` + `NODE_URL=testnet`

### 🎯 **Advantages:**
- 🔒 **Privacy**: Private keys dan notes dikelola secara lokal
- 🌐 **Real Data**: Connect ke testnet untuk blockchain data aktual
- ⚡ **Performance**: PXE local lebih responsive untuk development
- 🛠️ **Full Control**: Debugging dan monitoring capabilities
- 💾 **Persistent**: Account data tersimpan di local machine

### ⚙️ **Setup:**
```bash
# Automated setup
pnpm setup:hybrid

# Manual setup
aztec-up --pxe-url=http://localhost:8080 --node-url=https://aztec-alpha-testnet-fullnode.zkv.xyz
```

### ⚙️ **Configuration:**
```bash
# .env
PXE_URL=http://localhost:8080
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NEXT_PUBLIC_PXE_URL=http://localhost:8080
```

### 🚀 **Use Cases:**
- ✅ Contract deployment ke testnet dengan local privacy
- ✅ Frontend development dengan real testnet data
- ✅ Private transaction testing
- ✅ Account management yang aman

---

## 📋 **Option 2: Full Remote PXE**

### ✅ **Advantages:**
- ✅ Tidak perlu setup local environment
- ✅ Langsung connect ke testnet
- ✅ Cocok untuk quick deployment
- ✅ Lebih simple untuk getting started

### ⚙️ **Configuration:**
```bash
# .env
PXE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NEXT_PUBLIC_PXE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
```

### 🚀 **Use Cases:**
- Contract deployment ke testnet
- Quick testing tanpa setup
- CI/CD deployment

---

## 📋 **Option 3: Full Local Development**

### ✅ **Advantages:**
- ✅ Complete offline development
- ✅ Fastest iteration cycle
- ✅ No external dependencies

### ⚙️ **Setup Requirements:**
```bash
# Start full local environment
aztec-up
```

### ⚙️ **Configuration:**
```bash
# .env
PXE_URL=http://localhost:8080
NODE_URL=http://localhost:8545  # Local node
```

---

## 🎯 **Current Project Setup (Hybrid Configuration) 🌟**

Proyek ini sekarang dikonfigurasi untuk **Hybrid Setup** - yang memberikan best of both worlds:

```bash
# Hybrid Configuration
PXE_URL=http://localhost:8080          # Local PXE untuk privacy & performance
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz  # Testnet untuk real data
```

### 🔄 **Setup Commands:**

#### **Quick Hybrid Setup:**
```bash
pnpm setup:hybrid
```

#### **Manual Steps:**
```bash
# 1. Start local PXE connected to testnet
aztec-up --pxe-url=http://localhost:8080 --node-url=https://aztec-alpha-testnet-fullnode.zkv.xyz

# 2. Create account
aztec accounts create --alias my-wallet

# 3. Deploy account to testnet
aztec-wallet deploy-account --node-url https://aztec-alpha-testnet-fullnode.zkv.xyz --from my-wallet

# 4. Deploy contracts
pnpm deploy:token
pnpm deploy:contract
```

### 🔗 **Configuration Switching:**

#### **For Hybrid Development (CURRENT):**
```bash
# .env
PXE_URL=http://localhost:8080
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NEXT_PUBLIC_PXE_URL=http://localhost:8080
```

#### **For Full Remote:**
```bash
# .env
PXE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NEXT_PUBLIC_PXE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
```

#### **For Full Local:**
```bash
# .env
PXE_URL=http://localhost:8080
NODE_URL=http://localhost:8545
NEXT_PUBLIC_PXE_URL=http://localhost:8080
```

---

## 🛠️ **Deployment Scripts Compatibility**

### Token Deployment Script:
- ✅ Menggunakan `aztec-wallet` CLI (menggunakan NODE_URL)
- ✅ Deploy langsung ke testnet
- ✅ Compatible dengan semua PXE configurations

### Frontend Integration:
- ✅ Menggunakan PXE_URL untuk contract interaction
- ✅ Support switching antara local dan remote PXE
- ✅ Account management via local PXE (jika hybrid)

---

## 📝 **Recommendations**

### **🌟 Untuk Development (RECOMMENDED):**
1. ✅ **Hybrid Setup**: Local PXE + Testnet Node
2. ✅ Command: `pnpm setup:hybrid`
3. ✅ Benefits: Privacy + Real testnet data

### **🚀 Untuk Quick Deployment:**
1. 🔄 Full Remote PXE
2. 🔄 Command: `pnpm setup:testnet`
3. 🔄 Benefits: No local setup required

### **💻 Untuk Pure Local Development:**
1. 🔄 Full Local Setup
2. 🔄 Command: `aztec-up`
3. 🔄 Benefits: Complete offline development

---

## 🚨 **Important Notes**

1. **Account Sync**: Accounts created di local PXE tidak otomatis sync ke remote PXE
2. **Transaction Privacy**: Private transactions hanya visible di PXE yang sama where account was created
3. **Performance**: Local PXE significantly faster untuk private operations
4. **Debugging**: Local PXE memberikan access ke logs dan debugging tools

---

## 🎉 **Quick Start dengan Hybrid Setup:**

```bash
# 1. Setup hybrid PXE (local PXE + testnet node)
pnpm setup:hybrid

# 2. Compile contracts
pnpm compile

# 3. Deploy token to testnet
pnpm deploy:token
# Update ACCEPTED_TOKEN di .env

# 4. Deploy TipJar to testnet
pnpm deploy:contract
# Update TIPJAR_ADDRESS di .env

# 5. Test frontend with local PXE
pnpm dev
```

**Hybrid configuration memberikan experience terbaik untuk development! 🚀**