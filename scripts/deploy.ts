import { PXE_URL, OWNER_ADDRESS, ACCEPTED_TOKEN } from '../src/lib/config.js';
// import { createPXEClient, Contract, AccountWallet } from '@aztec/aztec.js';

// import artifact JSON hasil compile Aztec.nr (ABI + bytecode)
// import TipJarArtifact from '../artifacts/TipJar.json' assert { type: 'json' };

async function connectPXE(pxeUrl: string) {
  // const pxe = await createPXEClient(pxeUrl);
  // const accounts = await pxe.getRegisteredAccounts();
  // if (accounts.length === 0) {
  //   throw new Error('No accounts found in PXE');
  // }
  // const account = accounts[0];
  console.log('Connecting to PXE at:', pxeUrl);
  return { /* pxe, account */ };
}

async function main() {
  console.log('🚀 Deploying TipJar contract...');
  
  const { /* pxe, account */ } = await connectPXE(PXE_URL);

  // 1) Deploy contract
  // const deployer = account;
  // const tipJar = await Contract.deploy(deployer, TipJarArtifact, []).send().deployed();

  // 2) Init
  // await tipJar.methods.init(OWNER_ADDRESS, ACCEPTED_TOKEN).send().wait();

  // 3) Print address
  // console.log('TipJar deployed at:', tipJar.address.toString());
  
  console.log('📝 Scaffold: fill deploy logic using your aztec.js version & artifact');
  console.log('🔧 Configuration:');
  console.log('- PXE URL:', PXE_URL);
  console.log('- Owner Address:', OWNER_ADDRESS);
  console.log('- Accepted Token:', ACCEPTED_TOKEN);
}

main().catch((e) => {
  console.error('❌ Deploy failed:', e);
  process.exit(1);
});

