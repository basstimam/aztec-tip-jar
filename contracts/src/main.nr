// TipJar - Private Tip Jar (anon tips) for Aztec L2
// - tip_private(amount): kirim tip privat (notes) ke kontrak
// - withdraw_public(amount, to): owner tarik dana ke saldo publik (amount terlihat)
// - withdraw_private(amount, to_private): owner tarik dana tetap privat (buat note baru)

mod interfaces;

use dep::aztec::prelude::{AztecAddress, PublicMutable};
pub use interfaces::token::Token;

contract TipJar {
    #[aztec(storage)]
    struct Storage {
        owner: PublicMutable<AztecAddress, 1>,
        accepted_token: PublicMutable<AztecAddress, 1>,
    }
    
    #[aztec(public)]
    #[aztec(initializer)]
    fn init(owner: AztecAddress, accepted_token: AztecAddress) {
        storage.owner.write(owner);
        storage.accepted_token.write(accepted_token);
    }

    #[aztec(public)]
    fn withdraw_public(to: AztecAddress, amount: Field) {
        let owner = storage.owner.read();
        assert(context.msg_sender() == owner, "Unauthorized");
        
        let token_address = storage.accepted_token.read();
        Token::at(token_address).transfer_public(context.this_address(), to, amount).call(&mut context);
    }

    #[aztec(private)]
    fn tip_private(amount: Field) {
        let token_address = storage.accepted_token.read();
        
        // Transfer private: dari pengirim ke alamat kontrak
        // Sesuai guide: transfer_in_private dari sender ke contract
        Token::at(token_address).transfer_in_private(context.msg_sender(), context.this_address(), amount).call(&mut context);
    }

    #[aztec(private)]
    fn withdraw_private(to_private: AztecAddress, amount: Field) {
        let owner = storage.owner.read();
        assert(context.msg_sender() == owner, "Unauthorized");
        
        let token_address = storage.accepted_token.read();
        
        // Transfer private: dari contract ke owner (tetap privat)
        // Sesuai guide: notes ownership transfer
        Token::at(token_address).transfer_in_private(context.this_address(), to_private, amount).call(&mut context);
    }
}
