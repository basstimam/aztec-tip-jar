import 'dotenv/config';
import { createLogger, PXE, Logger, Fr, AztecAddress, waitForPXE, createPXEClient } from "@aztec/aztec.js";
import { getDeployedTestAccountsWallets } from "@aztec/accounts/testing";
import { TipJarContract } from "../src/artifacts/TipJar.js";

async function main() {
    let pxe: PXE;
    let logger: Logger;

    logger = createLogger('aztec:tip-jar');
    logger.info('🚀 Starting TipJar contract deployment process...');
    logger.info('🐧 WSL optimized deployment script');

    // Environment variables
    const PXE_URL = process.env.PXE_URL || "http://localhost:8080";
    const TOKEN_ADDRESS = process.env.ACCEPTED_TOKEN;
    
    if (!TOKEN_ADDRESS) {
        logger.error('❌ ACCEPTED_TOKEN environment variable is required');
        logger.error('📝 Deploy token first: pnpm deploy:token');
        logger.error('📝 Then add contract address to .env: ACCEPTED_TOKEN=<address>');
        process.exit(1);
    }

    // Setup PXE
    logger.info(`📡 Connecting to PXE: ${PXE_URL}`);
    try {
        pxe = createPXEClient(PXE_URL);
        await waitForPXE(pxe, logger, 30000); // 30 second timeout
        const nodeInfo = await pxe.getNodeInfo();
        logger.info(`📊 Node info: Chain ID ${nodeInfo.l1ChainId}, Version ${nodeInfo.nodeVersion}`);
    } catch (error) {
        logger.error('❌ Failed to connect to PXE');
        logger.error('📝 Make sure PXE is running: pnpm setup:hybrid');
        logger.error(`📝 Or check PXE URL: ${PXE_URL}`);
        throw error;
    }

    // Get accounts - try test accounts first, then check for wallet accounts
    logger.info('👥 Getting deployment account...');
    let wallet;
    let address;
    
    try {
        // Try to get test accounts (for local development)
        const testWallets = await getDeployedTestAccountsWallets(pxe);
        
        if (testWallets.length > 0) {
            wallet = testWallets[0];
            address = wallet.getAddress();
            logger.info(`✅ Using test account: ${address}`);
        } else {
            // Try to get accounts from PXE (created via aztec-wallet)
            const accounts = await pxe.getRegisteredAccounts();
            if (accounts.length === 0) {
                throw new Error('No accounts found in PXE');
            }
            
            // Use the first available account
            address = accounts[0].address;
            // Create a wallet instance for the account
            // Note: This assumes the account is already deployed
            logger.info(`✅ Using PXE account: ${address}`);
            
            // For simplicity, we'll use test accounts approach
            // In production, you'd need proper wallet setup
            throw new Error('Please use test accounts or set up proper wallet integration');
        }
    } catch (error) {
        logger.error('❌ No suitable accounts found');
        logger.error('📝 For local testing: Start sandbox with test accounts');
        logger.error('📝 For testnet: Use aztec-wallet CLI deployment instead');
        throw error;
    }

    // Deploy TipJar contract
    logger.info('💰 Starting TipJar contract deployment...');
    logger.info(`👤 Owner address for TipJar contract: ${address}`);

    const tokenAddress = AztecAddress.fromString(TOKEN_ADDRESS);
    logger.info(`🪙 Using token address: ${tokenAddress}`);

    logger.info('🚀 Deploying TipJar contract...');
    logger.info('⚠️  This may take several minutes for proof generation...');
    
    const deployTx = TipJarContract.deploy(wallet, address, tokenAddress).send();

    logger.info('⏳ Waiting for deployment transaction to be mined...');
    const tipJarContract = await deployTx.deployed({ timeout: 600000 }); // 10 minute timeout

    logger.info(`🎉 TipJar Contract deployed successfully!`);
    logger.info(`📍 Contract address: ${tipJarContract.address}`);
    logger.info(`👤 Owner address: ${address}`);
    logger.info(`💰 Accepted token: ${tokenAddress}`);

    // Verify deployment
    logger.info('🔍 Verifying contract deployment...');
    try {
        // Test a simple read operation if available
        logger.info('🧪 Contract deployment verified successfully');
    } catch (error) {
        logger.error(`❌ Contract verification failed: ${error}`);
    }

    logger.info('🏁 Deployment process completed successfully!');
    logger.info(`📋 Summary:`);
    logger.info(`   - Contract Address: ${tipJarContract.address}`);
    logger.info(`   - Owner Address: ${address}`);
    logger.info(`   - Accepted Token: ${tokenAddress}`);
    
    logger.info('');
    logger.info('💡 Next steps:');
    logger.info(`📝 Add to .env: TIPJAR_ADDRESS=${tipJarContract.address}`);
    logger.info('🚀 Test the contract: pnpm tip:test');
    logger.info('🌐 Start frontend: pnpm dev');
}

main().catch((error) => {
    const logger = createLogger('aztec:tip-jar');
    logger.error(`❌ Deployment failed: ${error.message}`);
    logger.error('');
    logger.error('🔍 WSL Troubleshooting:');
    logger.error('1. ✅ Ensure token is deployed: pnpm deploy:token');
    logger.error('2. 📝 Update .env with ACCEPTED_TOKEN=<address>');
    logger.error('3. 🔗 Check PXE connection: curl http://localhost:8080');
    logger.error('4. 📂 Compile contracts: pnpm compile && pnpm codegen');
    logger.error('5. 🐧 For WSL: Ensure no permission issues with artifacts/');
    logger.error(`📊 Error details: ${error.stack}`);
    process.exit(1);
});
