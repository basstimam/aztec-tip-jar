// Token interface for Aztec v1.2.0 - sesuai contract-guide.mdc
use dep::aztec::prelude::AztecAddress;

#[aztec(interface)]
trait Token {
    // Transfer privat: konsumsi notes dari `from`, buat notes untuk `to`
    fn transfer_in_private(from: AztecAddress, to: AztecAddress, amount: Field) -> ();
    
    // Transfer publik: gerakkan saldo publik dari kontrak ke penerima
    fn transfer_public(from: AztecAddress, to: AztecAddress, amount: Field) -> ();
}

