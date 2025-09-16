import 'dotenv/config';
import { execSync } from 'child_process';

async function main() {
    console.log('🪙 Starting Token deployment to Aztec testnet...');
    
    // Environment variables
    const NODE_URL = process.env.NODE_URL || 'https://aztec-alpha-testnet-fullnode.zkv.xyz';
    const SPONSORED_FPC_ADDRESS = process.env.SPONSORED_FPC_ADDRESS || '0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2';
    const WALLET_ALIAS = process.env.WALLET_ALIAS || 'my-wallet';
    
    console.log(`📡 Deploying to: ${NODE_URL}`);
    console.log(`👛 Using wallet: ${WALLET_ALIAS}`);
    
    try {
        // Convert token name and symbol to Field values (hexadecimal)
        const tokenNameHex = Buffer.from('TipToken', 'utf8').toString('hex');
        const tokenSymbolHex = Buffer.from('TIP', 'utf8').toString('hex');
        
        // Deploy token contract using aztec-wallet CLI
        console.log('🚀 Deploying Token contract to testnet...');
        const deployCommand = `aztec-wallet deploy \\
            --node-url ${NODE_URL} \\
            --from accounts:${WALLET_ALIAS} \\
            --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc \\
            --alias token \\
            TokenContract \\
            --args accounts:${WALLET_ALIAS} 0x${tokenNameHex} 0x${tokenSymbolHex} 18 \\
            --no-wait`;
        
        console.log('⏳ Executing deployment command...');
        console.log(`Command: ${deployCommand}`);
        
        const deployResult = execSync(deployCommand, { 
            encoding: 'utf8',
            stdio: 'inherit'
        });
        
        console.log('✅ Token contract deployment initiated!');
        console.log('📋 Token Configuration:');
        console.log('   - Name: TipToken');
        console.log('   - Symbol: TIP');
        console.log('   - Decimals: 18');
        console.log('   - Admin: Current wallet account');
        
        console.log('');
        console.log('⚠️  IMPORTANT NEXT STEPS:');
        console.log('1. Wait for the transaction to be mined on testnet');
        console.log('2. Check transaction status on aztecscan.io or aztecexplorer.xyz');
        console.log('3. Get the contract address and update .env file:');
        console.log('   ACCEPTED_TOKEN=<contract_address>');
        console.log('');
        console.log('4. Then you can mint some tokens for testing:');
        console.log(`   aztec-wallet send mint_public \\`);
        console.log(`     --node-url ${NODE_URL} \\`);
        console.log(`     --from accounts:${WALLET_ALIAS} \\`);
        console.log(`     --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc \\`);
        console.log(`     --contract-address token \\`);
        console.log(`     --args accounts:${WALLET_ALIAS} 1000000`);
        
        console.log('');
        console.log('🎉 Token deployment process completed!');
        
    } catch (error) {
        console.error('❌ Token deployment failed:', error);
        console.error('');
        console.error('🔍 Troubleshooting tips:');
        console.error('1. Make sure Aztec CLI is installed: bash -i <(curl -s https://install.aztec.network)');
        console.error('2. Ensure you have created and deployed an account:');
        console.error(`   aztec-wallet create-account --register-only --node-url ${NODE_URL} --alias ${WALLET_ALIAS}`);
        console.error('3. Register with sponsored FPC:');
        console.error(`   aztec-wallet register-contract --node-url ${NODE_URL} --from ${WALLET_ALIAS} --alias sponsoredfpc ${SPONSORED_FPC_ADDRESS} SponsoredFPC --salt 0`);
        console.error('4. Deploy your account:');
        console.error(`   aztec-wallet deploy-account --node-url ${NODE_URL} --from ${WALLET_ALIAS} --payment method=fpc-sponsored,fpc=contracts:sponsoredfpc --register-class`);
        
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('❌ Deployment script failed:', error.message);
    process.exit(1);
});
main().catch((error) => {
    console.error('❌ Deployment script failed:', error.message);
    process.exit(1);
});
