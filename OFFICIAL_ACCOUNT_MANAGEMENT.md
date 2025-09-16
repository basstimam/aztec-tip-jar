# Account Management - Official Documentation Summary

Based on the official Aztec CLI documentation at `.qoder/rules/account-management.md`

## 🎯 **Key Insight dari Dokumentasi Resmi**

> **"Consider using the aztec-wallet for account management (or contract interaction) related actions, since it has a PXE internally and manages aliases to get you started quicker."**
> 
> **"aztec cli requires you to have a PXE running already"**

## ⚖️ **Pilihan CLI Tools**

### 1. **`aztec-wallet`** (Recommended untuk Getting Started)
- ✅ **Built-in PXE** - tidak perlu setup PXE terpisah
- ✅ **Alias management** - lebih mudah manage accounts
- ✅ **Simpler workflow** - untuk quick start

### 2. **`aztec` CLI** (Advanced Usage)
- ⚡ **Requires PXE running** - lebih kontrol penuh
- ⚡ **More options** - payment methods, gas controls
- ⚡ **Production ready** - untuk deployment serius

## 📝 **Command Reference**

### `aztec` CLI Commands

#### Create Account
```bash
aztec create-account [options]
```

**Key Options:**
- `--rpc-url <string>`: URL of the PXE (default: "http://host.docker.internal:8080")
- `--public-deploy`: Publicly deploys the account and registers the class
- `--payment <options>`: Fee payment method
  - `method=fpc-sponsored`: Use sponsored FPC
  - `method=fee_juice`: Use fee juice (default)
- `--no-wait`: Skip waiting for deployment
- `--register-only`: Just register, don't deploy

#### Deploy Account  
```bash
aztec deploy-account [options]
```

**Key Options:**
- `--rpc-url <string>`: URL of the PXE
- `--register-class`: Register the contract class
- `--payment method=fpc-sponsored`: Use sponsored payment
- `--no-wait`: Don't wait for completion

#### Get Accounts
```bash
aztec get-accounts [options]
```

#### Get Specific Account
```bash
aztec get-account <address> [options]
```

### `aztec-wallet` CLI Commands

#### Create Account
```bash
aztec-wallet create-account [options]
```

**Key Options:**
- `--node-url <string>`: URL of the Aztec node

#### Deploy Account
```bash
aztec-wallet deploy-account [options]  
```

**Key Options:**
- `--node-url <string>`: URL of the Aztec node
- `--timeout <ms>`: Deployment timeout

## 🚀 **Project Scripts**

### 1. **Hybrid PXE + aztec CLI** (Recommended)
```bash
pnpm setup:hybrid
```
- Starts local PXE connected to testnet
- Uses `aztec create-account` with sponsored FPC
- Full control over PXE configuration

### 2. **aztec CLI with PXE** (Advanced)
```bash
pnpm create:account-aztec
```
- Uses `aztec create-account` directly
- Handles PXE setup automatically
- Sponsored FPC payment

### 3. **aztec-wallet** (Simple)
```bash
pnpm create:account
```
- Uses `aztec-wallet` with built-in PXE
- Simpler workflow
- Good for testing

### 4. **Basic Testing**
```bash
pnpm test:wallet
```
- Tests basic wallet functionality
- Validates CLI availability

## 🎯 **Recommendations**

### For Development:
1. **Use `pnpm setup:hybrid`** - gives full control with local PXE
2. **Fallback to `pnpm create:account-aztec`** if hybrid fails
3. **Use `pnpm create:account`** for quick testing

### For Production:
1. **Use `aztec` CLI** with proper PXE setup
2. **Configure payment methods** properly
3. **Handle gas limits** and fees explicitly

## 🔧 **Payment Methods (aztec CLI)**

### Sponsored FPC (Recommended for Testnet)
```bash
# Dengan FPC address yang spesifik
--payment method=fpc-sponsored,fpc=0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2

# Atau menggunakan contracts reference (jika tersedia)
--payment method=fpc-sponsored,fpc=contracts:sponsoredfpc
```

### Fee Juice
```bash
--payment method=fee_juice
```

### Public FPC
```bash
--payment method=fpc-public,asset=ADDRESS,fpc=ADDRESS
```

### Private FPC
```bash
--payment method=fpc-private,asset=ADDRESS,fpc=ADDRESS
```

## ⚠️ **Important Notes**

1. **PXE Requirement**: `aztec` CLI needs PXE running, `aztec-wallet` has built-in PXE
2. **Network URLs**: Use proper testnet URLs for real deployment
3. **Timeouts**: Account deployment can take 2-10 minutes
4. **Sponsored FPC**: Available for testnet, use for testing
5. **Gas Limits**: Can be estimated automatically or set manually

## 🎉 **Next Steps After Account Creation**

1. **Compile Contracts**: `pnpm compile`
2. **Deploy Token**: `pnpm deploy:token`
3. **Deploy TipJar**: `pnpm deploy:contract`
4. **Test Frontend**: `pnpm dev`

## 🛠️ **Debugging Commands**

```bash
# Check accounts (aztec CLI)
aztec get-accounts --rpc-url http://localhost:8080

# Check specific account
aztec get-account ADDRESS --rpc-url http://localhost:8080

# Check PXE health
curl -f http://localhost:8080/

# View PXE logs
tail -f pxe.log
```