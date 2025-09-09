import { PXE_URL, TIPJAR_ADDRESS } from '../src/lib/config.js';
// import { createPXEClient } from '@aztec/aztec.js';

async function connectPXE(pxeUrl: string) {
  console.log('Connecting to PXE at:', pxeUrl);
  // const pxe = await createPXEClient(pxeUrl);
  return { /* pxe */ };
}

async function main() {
  console.log('🔍 Scanning private notes...');
  
  const { /* pxe */ } = await connectPXE(PXE_URL);

  // Pola umum:
  // const notes = await pxe.getIncomingNotes({ 
  //   contract: TIPJAR_ADDRESS,
  //   // optionally filter by note type, etc.
  // });
  // 
  // const total = notes.reduce((sum, note) => sum + note.amount, 0);
  // console.log('📊 Found', notes.length, 'notes');
  // console.log('💰 Private total (local view):', total);

  console.log('📝 Scaffold: use PXE to scan & sum private notes for this contract');
  console.log('📍 Contract:', TIPJAR_ADDRESS);
}

main().catch((e) => {
  console.error('❌ Scan failed:', e);
  process.exit(1);
});

