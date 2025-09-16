// Token Contract for Aztec Network
// Based on Aztec v1.2.0 TokenContract standard

use dep::aztec::macros::aztec;

#[aztec]
pub contract Token {
    use dep::aztec::{
        macros::{functions::{initializer, private, public}, storage::storage},
        prelude::{AztecAddress, PublicMutable, Map, PrivateSet},
        state_vars::{PublicMutable, PrivateSet},
        protocol_types::{abis::function_selector::FunctionSelector, address::AztecAddress}
    };
    
    use dep::aztec::note::{
        note_header::NoteHeader,
        note_interface::NoteInterface,
        utils::compute_note_hash_for_consumption
    };

    // Simple Value Note for token balances
    use dep::aztec::prelude::{ValueNote, NoteGetterOptions, NoteViewerOptions};

    #[storage]
    struct Storage<Context> {
        // Token metadata
        admin: PublicMutable<AztecAddress, Context>,
        name: PublicMutable<Field, Context>,
        symbol: PublicMutable<Field, Context>,
        decimals: PublicMutable<u8, Context>,
        total_supply: PublicMutable<Field, Context>,
        
        // Public balances
        balances: Map<AztecAddress, PublicMutable<Field, Context>, Context>,
        
        // Private balances using ValueNote
        private_balances: Map<AztecAddress, PrivateSet<ValueNote, Context>, Context>,
    }

    #[public]
    #[initializer]
    fn constructor(
        admin: AztecAddress,
        name: Field,
        symbol: Field,
        decimals: u8
    ) {
        storage.admin.write(admin);
        storage.name.write(name);
        storage.symbol.write(symbol);
        storage.decimals.write(decimals);
        storage.total_supply.write(0);
    }

    #[public]
    fn mint_public(to: AztecAddress, amount: Field) {
        // Only admin can mint
        let admin = storage.admin.read();
        assert(context.msg_sender().eq(admin), "Only admin can mint");
        
        // Update public balance
        let current_balance = storage.balances.at(to).read();
        storage.balances.at(to).write(current_balance + amount);
        
        // Update total supply
        let current_supply = storage.total_supply.read();
        storage.total_supply.write(current_supply + amount);
    }

    #[private]
    fn mint_private(amount: Field, owner: AztecAddress) {
        // Verify admin permission via public function
        Token::at(context.this_address())
            .verify_admin(context.msg_sender())
            .enqueue(&mut context);

        // Create private note for the owner
        let mut note = ValueNote::new(amount, owner);
        storage.private_balances.at(owner).insert(&mut note);
    }

    #[public]
    fn verify_admin(caller: AztecAddress) {
        let admin = storage.admin.read();
        assert(caller.eq(admin), "Only admin can mint private tokens");
    }

    #[public]
    fn transfer_public(from: AztecAddress, to: AztecAddress, amount: Field) {
        // Verify caller authorization
        assert(context.msg_sender().eq(from), "Cannot transfer from another address");
        
        // Check balance
        let from_balance = storage.balances.at(from).read();
        assert(from_balance >= amount, "Insufficient balance");
        
        // Update balances
        storage.balances.at(from).write(from_balance - amount);
        let to_balance = storage.balances.at(to).read();
        storage.balances.at(to).write(to_balance + amount);
    }

    #[private]
    fn transfer_private(from: AztecAddress, to: AztecAddress, amount: Field) {
        // Verify caller authorization
        assert(context.msg_sender().eq(from), "Cannot transfer from another address");
        
        // Get notes for the sender
        let options = NoteGetterOptions::new();
        let notes = storage.private_balances.at(from).get_notes(options);
        
        let mut total_consumed = 0;
        
        for note in notes {
            if total_consumed < amount {
                let consume_amount = if (total_consumed + note.value) <= amount {
                    note.value
                } else {
                    amount - total_consumed
                };
                
                // Remove the note
                storage.private_balances.at(from).remove(note);
                total_consumed += consume_amount;
                
                // Create change note if needed
                if consume_amount < note.value {
                    let mut change_note = ValueNote::new(note.value - consume_amount, from);
                    storage.private_balances.at(from).insert(&mut change_note);
                }
                
                if total_consumed >= amount {
                    break;
                }
            }
        }
        
        assert(total_consumed >= amount, "Insufficient private balance");
        
        // Create note for recipient
        let mut recipient_note = ValueNote::new(amount, to);
        storage.private_balances.at(to).insert(&mut recipient_note);
    }

    // View functions (unconstrained)
    unconstrained fn balance_of_public(owner: AztecAddress) -> Field {
        storage.balances.at(owner).read()
    }

    unconstrained fn balance_of_private(owner: AztecAddress) -> Field {
        let options = NoteViewerOptions::new();
        let notes = storage.private_balances.at(owner).view_notes(options);
        
        let mut balance = 0;
        for note in notes {
            balance += note.value;
        }
        
        balance
    }

    unconstrained fn total_supply() -> Field {
        storage.total_supply.read()
    }

    unconstrained fn name() -> Field {
        storage.name.read()
    }

    unconstrained fn symbol() -> Field {
        storage.symbol.read()
    }

    unconstrained fn decimals() -> u8 {
        storage.decimals.read()
    }

    unconstrained fn admin() -> AztecAddress {
        storage.admin.read()
    }
}