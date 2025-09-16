# 🚀 Aztec Testnet Setup Options

Ada **DUA pilihan setup** yang valid untuk deploy ke Aztec testnet, masing-masing dengan keunggulan tersendiri:

## 🌟 **Option 1: Hybrid Setup (RECOMMENDED)**

### 📋 **Configuration:**
- **PXE**: Local (http://localhost:8080)
- **Node**: Testnet (https://aztec-alpha-testnet-fullnode.zkv.xyz)
- **Script**: `pnpm setup:hybrid`

### ✅ **Advantages:**
- 🔒 **Privacy**: Private keys dikelola lokal
- ⚡ **Performance**: PXE lokal lebih cepat
- 🛠️ **Development**: Full debugging capabilities
- 📊 **Real Data**: Connect ke testnet blockchain

### 🎯 **Best For:**
- Development dan testing
- Privacy-conscious users
- Users yang butuh debugging tools

---

## 🚀 **Option 2: Remote Setup (SIMPLE)**

### 📋 **Configuration:**
- **PXE**: Remote (https://aztec-alpha-testnet-fullnode.zkv.xyz)
- **Node**: Testnet (https://aztec-alpha-testnet-fullnode.zkv.xyz)
- **Script**: `pnpm setup:remote`

### ✅ **Advantages:**
- 🎯 **Simple**: No local setup required
- 🚀 **Quick**: Langsung deploy tanpa install
- 🌐 **Universal**: Works di environment apapun
- 📱 **Light**: Tidak butuh resource lokal

### 🎯 **Best For:**
- Quick deployment
- CI/CD pipelines
- Users tanpa local setup capability
- Getting started cepat

---

## 📊 **Comparison Table**

| Feature | Hybrid Setup | Remote Setup |
|---------|-------------|--------------|
| **Setup Time** | ~5 min | ~2 min |
| **Privacy** | ✅ High | ⚠️ Medium |
| **Performance** | ✅ Fast | 🔄 Network dependent |
| **Debugging** | ✅ Full access | ❌ Limited |
| **Requirements** | Local PXE | None |
| **Complexity** | 🔄 Medium | ✅ Simple |

---

## 🎯 **Which One to Choose?**

### **Choose Hybrid (`pnpm setup:hybrid`) if:**
- ✅ You want optimal development experience
- ✅ Privacy is important
- ✅ You'll be doing multiple deployments/testing
- ✅ You want to debug private transactions

### **Choose Remote (`pnpm setup:remote`) if:**
- ✅ You want quick one-time deployment
- ✅ You prefer simple setup
- ✅ You're deploying from CI/CD
- ✅ You don't need local debugging

---

## 🚀 **Quick Start Commands**

### **Hybrid Setup (Recommended):**
```bash
pnpm setup:hybrid     # Setup local PXE + testnet
pnpm compile          # Compile contracts
pnpm deploy:token     # Deploy token to testnet
pnpm deploy:contract  # Deploy TipJar to testnet
pnpm dev             # Start frontend
```

### **Remote Setup (Simple):**
```bash
pnpm setup:remote     # Setup remote PXE
pnpm compile          # Compile contracts  
pnpm deploy:token     # Deploy token to testnet
pnpm deploy:contract  # Deploy TipJar to testnet
pnpm dev             # Start frontend
```

---

## 🔄 **Switching Between Setups**

Anda bisa switch configuration kapan saja dengan mengubah [.env](file://c:\Users\Imam\dyad-apps\tip-jar-aztec\.env):

### **To Hybrid:**
```bash
PXE_URL=http://localhost:8080
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NEXT_PUBLIC_PXE_URL=http://localhost:8080
```

### **To Remote:**
```bash
PXE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NODE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
NEXT_PUBLIC_PXE_URL=https://aztec-alpha-testnet-fullnode.zkv.xyz
```

**Both approaches are valid and supported! Choose based on your needs. 🎯**