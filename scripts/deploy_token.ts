import 'dotenv/config';
import { execSync } from 'child_process';

async function main() {
    console.log('🪙 Starting Token deployment to Aztec testnet...');
    console.log('🐧 WSL optimized deployment script');
    
    // Environment variables with fallbacks
    const NODE_URL = process.env.NODE_URL || 'https://aztec-alpha-testnet-fullnode.zkv.xyz';
    const SPONSORED_FPC_ADDRESS = process.env.SPONSORED_FPC_ADDRESS || '0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2';
    const WALLET_ALIAS = process.env.WALLET_ALIAS || 'main';
    
    console.log(`📡 Deploying to: ${NODE_URL}`);
    console.log(`👛 Using wallet: ${WALLET_ALIAS}`);
    console.log('');
    
    // Check if wallet exists
    try {
        console.log('🔍 Checking wallet status...');
        const walletCheck = execSync(`aztec-wallet get-alias account --node-url ${NODE_URL}`, { 
            encoding: 'utf8',
            stdio: 'pipe'
        });
        console.log('✅ Wallet found and accessible');
    } catch (error) {
        console.error('❌ Wallet not found or not deployed');
        console.error('📝 Please run: pnpm create:account');
        process.exit(1);
    }
    
    try {
        console.log('🚀 Deploying Token contract to testnet...');
        console.log('⚠️  This may take several minutes on testnet due to proof generation');
        
        // Deploy token contract using aztec-wallet CLI with WSL-friendly command structure
        const deployCommand = [
            'aztec-wallet deploy',
            `--node-url ${NODE_URL}`,
            `--from accounts:${WALLET_ALIAS}`,
            '--payment method=fpc-sponsored,fpc=contracts:sponsoredfpc',
            '--alias token',
            'TokenContract',
            `--args accounts:${WALLET_ALIAS} TipToken TIP 18`,
            '--no-wait'
        ].join(' ');
        
        console.log('⏳ Executing deployment command...');
        console.log(`📝 Command: ${deployCommand}`);
        console.log('');
        
        const deployResult = execSync(deployCommand, { 
            encoding: 'utf8',
            stdio: 'inherit',
            timeout: 300000 // 5 minutes timeout
        });
        
        console.log('✅ Token contract deployment initiated!');
        console.log('📋 Token Configuration:');
        console.log('   - Name: TipToken');
        console.log('   - Symbol: TIP');
        console.log('   - Decimals: 18');
        console.log('   - Admin: Current wallet account');
        console.log('   - Alias: token');
        
        console.log('');
        console.log('⚠️  IMPORTANT NEXT STEPS:');
        console.log('1. ⏰ Wait for the transaction to be mined on testnet (2-10 minutes)');
        console.log('2. 🔍 Check transaction status on aztecscan.io or aztecexplorer.xyz');
        console.log('3. 🎯 Get the contract address:');
        console.log(`   aztec-wallet get-alias contracts --node-url ${NODE_URL}`);
        console.log('4. 📝 Update .env file with contract address:');
        console.log('   ACCEPTED_TOKEN=<contract_address>');
        console.log('');
        console.log('5. 🧪 Test by minting some tokens:');
        console.log(`   aztec-wallet send mint_public \\`);
        console.log(`     --node-url ${NODE_URL} \\`);
        console.log(`     --from accounts:${WALLET_ALIAS} \\`);
        console.log(`     --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc \\`);
        console.log(`     --contract-address token \\`);
        console.log(`     --args accounts:${WALLET_ALIAS} 1000000`);
        
        console.log('');
        console.log('🎉 Token deployment process completed!');
        console.log('📋 Next: Deploy TipJar contract with pnpm deploy:contract');
        
    } catch (error: any) {
        console.error('❌ Token deployment failed:', error.message);
        console.error('');
        console.error('🔍 WSL Troubleshooting tips:');
        console.error('1. 🔧 Ensure Aztec CLI is properly installed:');
        console.error('   bash -i <(curl -s https://install.aztec.network)');
        console.error('   source ~/.bashrc');
        console.error('   aztec-up -v latest');
        console.error('');
        console.error('2. 👤 Verify account is created and deployed:');
        console.error(`   aztec-wallet get-alias account --node-url ${NODE_URL}`);
        console.error('');
        console.error('3. 🔗 Check network connectivity:');
        console.error(`   curl -X POST ${NODE_URL} -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"node_getInfo","id":1}'`);
        console.error('');
        console.error('4. 📦 Ensure contracts are compiled:');
        console.error('   pnpm compile');
        console.error('');
        console.error('5. 🔄 If FPC registration failed, try re-registering:');
        console.error(`   aztec-wallet register-contract --node-url ${NODE_URL} --from ${WALLET_ALIAS} --alias sponsoredfpc ${SPONSORED_FPC_ADDRESS} SponsoredFPC --salt 0`);
        
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('❌ Deployment script failed:', error.message);
    process.exit(1);
});
