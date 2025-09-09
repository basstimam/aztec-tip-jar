import { PXE_URL, TIPJAR_ADDRESS } from '../src/lib/config.js';
// import { createPXEClient, Contract } from '@aztec/aztec.js';
// import TipJarArtifact from '../artifacts/TipJar.json' assert { type: 'json' };

const AMOUNT = 1_000n; // contoh 1000 units

async function connectPXE(pxeUrl: string) {
  console.log('Connecting to PXE at:', pxeUrl);
  // const pxe = await createPXEClient(pxeUrl);
  // const accounts = await pxe.getRegisteredAccounts();
  // const account = accounts[0];
  return { /* pxe, account */ };
}

async function main() {
  console.log('💰 Sending private tip...');
  
  const { /* pxe, account */ } = await connectPXE(PXE_URL);

  // const tipJar = await Contract.at(TIPJAR_ADDRESS, TipJarArtifact, account);

  // Kirim tip privat
  // console.log('Sending tip of', AMOUNT.toString(), 'units...');
  // const tx = await tipJar.methods.tip_private(AMOUNT).send();
  // await tx.wait();
  // console.log('✅ Tip sent! Transaction:', tx.txHash);

  console.log('📝 Scaffold: call tip_private(AMOUNT) using your aztec.js Contract methods');
  console.log('💵 Amount:', AMOUNT.toString());
  console.log('📍 Contract:', TIPJAR_ADDRESS);
}

main().catch((e) => {
  console.error('❌ Tip failed:', e);
  process.exit(1);
});

