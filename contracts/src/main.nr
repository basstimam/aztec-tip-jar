// TipJar - Private Tip Jar (anon tips) for Aztec L2
// - tip_private(amount): kirim tip privat (notes) ke kontrak
// - withdraw_public(amount, to): owner tarik dana ke saldo publik (amount terlihat)
// - withdraw_private(amount, to_private): owner tarik dana tetap privat (buat note baru)

use dep::aztec::protocol_types::address::AztecAddress;
use dep::aztec::state_vars::PublicMutable;
use dep::token::Token;

contract TipJar {
    use dep::aztec::macros::{aztec, storage, public, private, initializer};

    #[aztec(storage)]
    struct Storage<Context> {
        owner: PublicMutable<AztecAddress, Context>,
        accepted_token: PublicMutable<AztecAddress, Context>,
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
        Token::at(token_address).transfer_in_private(context.msg_sender(), context.this_address(), amount, 0).call(&mut context);
    }

    #[aztec(private)]
    fn withdraw_private(to_private: AztecAddress, amount: Field) {
        let owner = storage.owner.read();
        assert(context.msg_sender() == owner, "Unauthorized");

        let token_address = storage.accepted_token.read();

        // Transfer private: dari contract ke owner (tetap privat)
        // Sesuai guide: notes ownership transfer
        Token::at(token_address).transfer_in_private(context.this_address(), to_private, amount, 0).call(&mut context);
    }
}
