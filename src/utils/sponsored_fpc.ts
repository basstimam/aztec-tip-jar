import { ContractInstanceWithAddress, AztecAddress } from "@aztec/aztec.js";

export async function getSponsoredFPCInstance(): Promise<ContractInstanceWithAddress> {
    // Get Sponsored FPC address from environment variable
    // Canonical Aztec testnet Sponsored FPC address
    const sponsoredFPCAddress = process.env.SPONSORED_FPC_ADDRESS ||
        "0x19b5539ca1b104d4c3705de94e4555c9630def411f025e023a13189d0c56f8f2";

    console.log(`🔧 Using Sponsored FPC Address: ${sponsoredFPCAddress}`);

    const address = AztecAddress.fromString(sponsoredFPCAddress);

    return {
        address,
        // Add other required properties as needed
    } as ContractInstanceWithAddress;
}
