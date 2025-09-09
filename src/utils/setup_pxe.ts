import { PXE, createPXEClient } from "@aztec/aztec.js";

export async function setupPXE(): Promise<PXE> {
    const pxe = createPXEClient(process.env.PXE_URL || "http://localhost:8080");

    // Wait for PXE to be ready
    await pxe.getNodeInfo();

    return pxe;
}
