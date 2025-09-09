import { AccountManager, Fr, PXE } from "@aztec/aztec.js";
import { getSchnorrAccount } from "@aztec/accounts/schnorr";
import { deriveSigningKey } from "@aztec/stdlib/keys";
import { SponsoredFeePaymentMethod } from "@aztec/aztec.js";

export async function deploySchnorrAccount(pxe: PXE, sponsoredFPC?: SponsoredFeePaymentMethod): Promise<AccountManager> {
    // Generate random keys for demo
    let secretKey = Fr.random();
    let salt = Fr.random();

    const schnorrAccount = await getSchnorrAccount(pxe, secretKey, deriveSigningKey(secretKey), salt);

    // Deploy the account
    await schnorrAccount.deploy({
        fee: sponsoredFPC ? { paymentMethod: sponsoredFPC } : undefined
    }).wait();

    return schnorrAccount;
}
