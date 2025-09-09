// TipJar - Private Tip Jar for Aztec L2
// Based on Aztec Starter pattern - v1.2.0 compatible

use dep::aztec::macros::aztec;

#[aztec]
pub contract TipJar {
    use dep::aztec::{
        macros::{functions::{initializer, private, public}, storage::storage},
        prelude::{AztecAddress, PublicMutable},
    };

    #[storage]
    struct Storage<Context> {
        owner: PublicMutable<AztecAddress, Context>,
        accepted_token: PublicMutable<AztecAddress, Context>,
    }

    #[public]
    #[initializer]
    fn constructor(owner: AztecAddress, accepted_token: AztecAddress) {
        storage.owner.write(owner);
        storage.accepted_token.write(accepted_token);
    }

    #[private]
    fn tip_private(amount: Field) {
        // For now, just emit a simple transfer
        // Will be enhanced with proper token transfer logic
        TipJar::at(context.this_address()).record_tip_public(amount).enqueue(&mut context);
    }

    #[public]
    fn record_tip_public(_amount: Field) {
        // Record the tip amount - this is a placeholder
        // In real implementation, this would update balances
    }

    #[public]
    fn withdraw_public(_to: AztecAddress, _amount: Field) {
        // In public functions, we can read storage
        let owner = storage.owner.read();
        assert(owner.eq(context.msg_sender()), "Unauthorized");
        // Placeholder for token transfer logic
        // Would call token contract's transfer_public function
    }

    #[private]
    fn withdraw_private(to_private: AztecAddress, amount: Field) {
        // For private functions, we need to use public function for authorization
        // and pass the required data
        TipJar::at(context.this_address())
            .withdraw_private_public(to_private, amount)
            .enqueue(&mut context);
    }

    #[public]
    fn withdraw_private_public(_to_private: AztecAddress, _amount: Field) {
        // This public function handles the authorization check
        let owner = storage.owner.read();
        assert(owner.eq(context.msg_sender()), "Unauthorized");
        // Placeholder for private withdrawal logic
        // Would call token contract's transfer_in_private function
    }
}
