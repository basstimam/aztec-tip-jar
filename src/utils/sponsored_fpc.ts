import { ContractInstanceWithAddress, AztecAddress } from "@aztec/aztec.js";

export async function getSponsoredFPCInstance(): Promise<ContractInstanceWithAddress> {
    // Get Sponsored FPC address from environment variable
    // Using local sandbox Sponsored FPC address (from alias "sponsored")
    const sponsoredFPCAddress = process.env.SPONSORED_FPC_ADDRESS ||
        "0x24b26258189f125498cccd26941b593154768fcb7c5cb7bbd503d641c8d05117";

    console.log(`🔧 Using Sponsored FPC Address: ${sponsoredFPCAddress}`);

    const address = AztecAddress.fromString(sponsoredFPCAddress);

    return {
        address,
        // Add other required properties as needed
    } as ContractInstanceWithAddress;
}
