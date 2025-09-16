import 'dotenv/config';
import { execSync } from 'child_process';

async function main() {
    console.log('💰 Starting TipJar contract deployment...');
    console.log('🐧 WSL optimized deployment using aztec-wallet CLI');
    
    // Environment variables
    const NODE_URL = process.env.NODE_URL || 'https://aztec-alpha-testnet-fullnode.zkv.xyz';
    const WALLET_ALIAS = process.env.WALLET_ALIAS || 'main';
    const TOKEN_ADDRESS = process.env.ACCEPTED_TOKEN;
    
    if (!TOKEN_ADDRESS) {
        console.error('❌ ACCEPTED_TOKEN environment variable is required');
        console.error('📝 Deploy token first: pnpm deploy:token');
        console.error('📝 Then add to .env: ACCEPTED_TOKEN=<address>');
        process.exit(1);
    }
    
    console.log(`📡 Deploying to: ${NODE_URL}`);
    console.log(`👛 Using wallet: ${WALLET_ALIAS}`);
    console.log(`🪙 Token address: ${TOKEN_ADDRESS}`);
    console.log('');
    
    // Check if wallet exists
    try {
        console.log('🔍 Checking wallet status...');
        execSync(`aztec-wallet get-alias account --node-url ${NODE_URL}`, { 
            encoding: 'utf8',
            stdio: 'pipe'
        });
        console.log('✅ Wallet found and accessible');
    } catch (error) {
        console.error('❌ Wallet not found or not deployed');
        console.error('📝 Please run: pnpm create:account');
        process.exit(1);
    }
    
    // Check if artifacts exist
    try {
        console.log('🔍 Checking contract artifacts...');
        execSync('ls src/artifacts/TipJar.json', { encoding: 'utf8', stdio: 'pipe' });
        console.log('✅ Contract artifacts found');
    } catch (error) {
        console.error('❌ Contract artifacts not found');
        console.error('📝 Please run: pnpm compile && pnpm codegen');
        process.exit(1);
    }
    
    try {
        console.log('🚀 Deploying TipJar contract...');
        console.log('⚠️  This may take several minutes on testnet for proof generation');
        
        // Deploy TipJar contract using aztec-wallet CLI
        const deployCommand = [
            'aztec-wallet deploy',
            `--node-url ${NODE_URL}`,
            `--from accounts:${WALLET_ALIAS}`,
            '--payment method=fpc-sponsored,fpc=contracts:sponsoredfpc',
            '--alias tipjar',
            'TipJarContract',
            `--args accounts:${WALLET_ALIAS} ${TOKEN_ADDRESS}`,
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
        
        console.log('✅ TipJar contract deployment initiated!');
        console.log('📋 TipJar Configuration:');
        console.log(`   - Owner: ${WALLET_ALIAS} account`);
        console.log(`   - Accepted Token: ${TOKEN_ADDRESS}`);
        console.log('   - Alias: tipjar');
        
        console.log('');
        console.log('⚠️  IMPORTANT NEXT STEPS:');
        console.log('1. ⏰ Wait for the transaction to be mined (5-15 minutes)');
        console.log('2. 🔍 Check status on aztecscan.io or aztecexplorer.xyz');
        console.log('3. 🎯 Get the contract address:');
        console.log(`   aztec-wallet get-alias contracts --node-url ${NODE_URL}`);
        console.log('4. 📝 Update .env file:');
        console.log('   TIPJAR_ADDRESS=<contract_address>');
        console.log('');
        console.log('5. 🧪 Test the contract:');
        console.log('   pnpm tip:test');
        console.log('');
        console.log('6. 🌐 Start frontend:');
        console.log('   pnpm dev');
        
        console.log('');
        console.log('🎉 TipJar deployment process completed!');
        console.log('📋 Next: Test tipping functionality');
        
    } catch (error: any) {
        console.error('❌ TipJar deployment failed:', error.message);
        console.error('');
        console.error('🔍 WSL Troubleshooting:');
        console.error('1. 🪙 Ensure token is deployed and address is in .env');
        console.error('2. 👤 Verify account is deployed:');
        console.error(`   aztec-wallet get-alias account --node-url ${NODE_URL}`);
        console.error('3. 📦 Check contract artifacts:');
        console.error('   pnpm compile && pnpm codegen');
        console.error('4. 🔗 Test network connectivity:');
        console.error(`   curl -X POST ${NODE_URL} -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"node_getInfo","id":1}'`);
        console.error('5. 🔄 Re-register FPC if needed:');
        console.error(`   aztec-wallet register-contract --node-url ${NODE_URL} --from ${WALLET_ALIAS} --alias sponsoredfpc 0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2 SponsoredFPC --salt 0`);
        
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('❌ Deployment script failed:', error.message);
    process.exit(1);
});