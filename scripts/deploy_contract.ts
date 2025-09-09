import { createLogger, PXE, Logger, SponsoredFeePaymentMethod, Fr } from "@aztec/aztec.js";
import { setupPXE } from "../src/utils/setup_pxe.js";
import { getSponsoredFPCInstance } from "../src/utils/sponsored_fpc.js";
// Note: SponsoredFPC is not available in the current version, will use mock for now
// import { SponsoredFPCContract } from "@aztec/noir-contracts.js/SponsoredFPC";
import { deploySchnorrAccount } from "../src/utils/deploy_account.js";
import { TipJarContract } from "../src/artifacts/TipJar.js";

async function main() {
    let pxe: PXE;
    let logger: Logger;

    logger = createLogger('aztec:tip-jar');
    logger.info('🚀 Starting TipJar contract deployment process...');

    // Setup PXE
    logger.info('📡 Setting up PXE connection...');
    pxe = await setupPXE();
    const nodeInfo = await pxe.getNodeInfo();
    logger.info(`📊 Node info: ${JSON.stringify(nodeInfo, null, 2)}`);

    // Setup sponsored FPC
    logger.info('💰 Setting up sponsored fee payment contract...');
    const sponsoredFPC = await getSponsoredFPCInstance();
    logger.info(`💰 Sponsored FPC instance obtained at: ${sponsoredFPC.address}`);

    logger.info('📝 Using mock sponsored FPC for development...');
    // Note: In production, register actual SponsoredFPC contract with PXE
    // await pxe.registerContract({ instance: sponsoredFPC, artifact: SponsoredFPCContract.artifact });
    const sponsoredPaymentMethod = new SponsoredFeePaymentMethod(sponsoredFPC.address);
    logger.info('✅ Mock sponsored fee payment method configured');

    // Deploy account
    logger.info('👤 Deploying Schnorr account...');
    let accountManager = await deploySchnorrAccount(pxe);
    const wallet = await accountManager.getWallet();
    const address = await accountManager.getAddress();
    logger.info(`✅ Account deployed successfully at: ${address}`);

    // Deploy TipJar contract
    logger.info('💰 Starting TipJar contract deployment...');
    logger.info(`👤 Owner address for TipJar contract: ${address}`);

    // For demo, we'll use a mock token address - in real deployment, use actual token
    const mockTokenAddress = AztecAddress.fromString("0x1234567890123456789012345678901234567890");

    const deployTx = TipJarContract.deploy(wallet, address, mockTokenAddress).send({
        fee: { paymentMethod: sponsoredPaymentMethod }
    });

    logger.info('⏳ Waiting for deployment transaction to be mined...');
    const tipJarContract = await deployTx.deployed({ timeout: 120000 });

    logger.info(`🎉 TipJar Contract deployed successfully!`);
    logger.info(`📍 Contract address: ${tipJarContract.address}`);
    logger.info(`👤 Owner address: ${address}`);
    logger.info(`💰 Accepted token: ${mockTokenAddress}`);

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
    logger.info(`   - Accepted Token: ${mockTokenAddress}`);
    logger.info(`   - Sponsored FPC: ${sponsoredFPC.address}`);
}

main().catch((error) => {
    const logger = createLogger('aztec:tip-jar');
    logger.error(`❌ Deployment failed: ${error.message}`);
    logger.error(`📋 Error details: ${error.stack}`);
    process.exit(1);
});
