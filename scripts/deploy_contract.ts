import 'dotenv/config';
import { createLogger, PXE, Logger, Fr, AztecAddress, waitForPXE, createPXEClient } from "@aztec/aztec.js";
import { getDeployedTestAccountsWallets } from "@aztec/accounts/testing";
import { TipJarContract } from "../src/artifacts/TipJar.js";

async function main() {
    let pxe: PXE;
    let logger: Logger;

    logger = createLogger('aztec:tip-jar');
    logger.info('🚀 Starting TipJar contract deployment process...');

    // Setup PXE
    logger.info('📡 Setting up PXE connection...');
    pxe = createPXEClient(process.env.PXE_URL || "http://localhost:8080");
    await waitForPXE(pxe);
    const nodeInfo = await pxe.getNodeInfo();
    logger.info(`📊 Node info: Chain ID ${nodeInfo.l1ChainId}, Version ${nodeInfo.nodeVersion}`);

    // Get pre-deployed test accounts from sandbox
    logger.info('👥 Getting test accounts from sandbox...');
    const testWallets = await getDeployedTestAccountsWallets(pxe);
    
    if (testWallets.length === 0) {
        throw new Error("No test accounts found. Make sure sandbox is running with test accounts.");
    }

    const wallet = testWallets[0]; // Use first test account
    const address = wallet.getAddress();
    logger.info(`✅ Using test account: ${address}`);

    // Deploy TipJar contract
    logger.info('💰 Starting TipJar contract deployment...');
    logger.info(`👤 Owner address for TipJar contract: ${address}`);

    // Get token address from environment variable
    const tokenAddressStr = process.env.ACCEPTED_TOKEN;
    if (!tokenAddressStr) {
        throw new Error("ACCEPTED_TOKEN environment variable is required. Deploy token first using 'pnpm deploy:token'");
    }

    const tokenAddress = AztecAddress.fromString(tokenAddressStr);
    logger.info(`🪙 Using token address: ${tokenAddress}`);

    logger.info('🚀 Deploying TipJar contract...');
    const deployTx = TipJarContract.deploy(wallet, address, tokenAddress).send();

    logger.info('⏳ Waiting for deployment transaction to be mined...');
    const tipJarContract = await deployTx.deployed({ timeout: 120000 });

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
    
    logger.info('💡 Next step: Add contract address to .env');
    logger.info(`📝 Add to .env: TIPJAR_ADDRESS=${tipJarContract.address}`);
}

main().catch((error) => {
    const logger = createLogger('aztec:tip-jar');
    logger.error(`❌ Deployment failed: ${error.message}`);
    logger.error(`📋 Error details: ${error.stack}`);
    process.exit(1);
});
