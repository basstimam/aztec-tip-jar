---
trigger: manual
---
Account Management
Consider using the aztec-wallet for account management (or contract interaction) related actions, since it has a PXE internally and manages aliases to get you started quicker.

aztec cli requires you to have a PXE running already (either as part of when you run the sandbox by default or just a separate PXE)

create-account
Creates an Aztec account for sending transactions.

aztec create-account [options]

Options:

--skip-initialization: Skip initializing the account contract. Useful for publicly deploying an existing account.
--public-deploy: Publicly deploys the account and registers the class if needed.
-p, --public-key <string>: Public key that identifies a private signing key stored outside of the wallet. Used for ECDSA SSH accounts over the secp256r1 curve.
-u, --rpc-url <string>: URL of the PXE (default: "http://host.docker.internal:8080", env: PXE_URL)
-sk, --secret-key <string>: Secret key for account. Uses random by default. (env: SECRET_KEY)
-t, --type <string>: Type of account to create (choices: "schnorr", "ecdsasecp256r1", "ecdsasecp256r1ssh", "ecdsasecp256k1", default: "schnorr")
--register-only: Just register the account on the PXE. Do not deploy or initialize the account contract.
--json: Emit output as json
--no-wait: Skip waiting for the contract to be deployed. Print the hash of deployment transaction
--payment <options>: Fee payment method and arguments. Parameters:
method: Valid values: "fee_juice", "fpc-public", "fpc-private", "fpc-sponsored" Default: fee_juice
feePayer: The account paying the fee.
asset: The asset used for fee payment. Required for "fpc-public" and "fpc-private".
fpc: The FPC contract that pays in fee juice. Not required for the "fee_juice" method.
claim: Whether to use a previously stored claim to bridge fee juice.
claimSecret: The secret to claim fee juice on L1.
claimAmount: The amount of fee juice to be claimed.
messageLeafIndex: The index of the claim in the l1toL2Message tree.
feeRecipient: Recipient of the fee.
Format: --payment method=name,feePayer=address,asset=address ...
--gas-limits <da=100,l2=100,teardownDA=10,teardownL2=10>: Gas limits for the tx.
--max-fees-per-gas <da=100,l2=100>: Maximum fees per gas unit for DA and L2 computation.
--max-priority-fees-per-gas <da=0,l2=0>: Maximum priority fees per gas unit for DA and L2 computation.
--no-estimate-gas: Whether to automatically estimate gas limits for the tx.
--estimate-gas-only: Only report gas estimation for the tx, do not send it.
deploy-account
Deploys an already registered aztec account that can be used for sending transactions.

aztec deploy-account [options]

Options:

-u, --rpc-url <string>: URL of the PXE (default: "http://host.docker.internal:8080", env: PXE_URL)
--json: Emit output as json
--no-wait: Skip waiting for the contract to be deployed. Print the hash of deployment transaction
--register-class: Register the contract class (useful for when the contract class has not been deployed yet).
--payment <options>: Fee payment method and arguments. Parameters:
method: Valid values: "fee_juice", "fpc-public", "fpc-private", "fpc-sponsored" Default: fee_juice
feePayer: The account paying the fee.
asset: The asset used for fee payment. Required for "fpc-public" and "fpc-private".
fpc: The FPC contract that pays in fee juice. Not required for the "fee_juice" method.
claim: Whether to use a previously stored claim to bridge fee juice.
claimSecret: The secret to claim fee juice on L1.
claimAmount: The amount of fee juice to be claimed.
messageLeafIndex: The index of the claim in the l1toL2Message tree.
feeRecipient: Recipient of the fee.
Format: --payment method=name,feePayer=address,asset=address ...
--gas-limits <da=100,l2=100,teardownDA=10,teardownL2=10>: Gas limits for the tx.
--max-fees-per-gas <da=100,l2=100>: Maximum fees per gas unit for DA and L2 computation.
--max-priority-fees-per-gas <da=0,l2=0>: Maximum priority fees per gas unit for DA and L2 computation.
--no-estimate-gas: Whether to automatically estimate gas limits for the tx.
--estimate-gas-only: Only report gas estimation for the tx, do not send it.
get-accounts
Retrieves all Aztec accounts stored in the PXE.

aztec get-accounts [options]

Options:

--json: Emit output as JSON.
get-account
Retrieves an account given its Aztec address.

aztec get-account <address> [options]

Arguments:

address: The Aztec address to get account for
Options:

-u, --rpc-url <string>: URL of the PXE (default: "http://host.docker.internal:8080", env: PXE_URL)
register-sender
Registers a sender's address in the wallet, so the note synching process will look for notes sent by them.

aztec register-sender [options] [address]

Arguments:

address: The address of the sender to register
Options:

-u, --rpc-url <string>: URL of the PXE (default: "http://host.docker.internal:8080", env: PXE_URL)
create-authwit
Creates an authorization witness that can be privately sent to a caller so they can perform an action on behalf of the provided account.

aztec create-authwit [options] <functionName> <caller>

Arguments:

functionName: Name of function to authorize
caller: Account to be authorized to perform the action
Options:

-u, --rpc-url <string>: URL of the PXE (default: "http://host.docker.internal:8080", env: PXE_URL)
--args [args...]: Function arguments (default: [])
-ca, --contract-address <address>: Aztec address of the contract.
-c, --contract-artifact <fileLocation>: Path to a compiled Aztec contract's artifact in JSON format. If executed inside a nargo workspace, a package and contract name can be specified as package@contract
-sk, --secret-key <string>: The sender's secret key (env: SECRET_KEY)
authorize-action
Authorizes a public call on the caller, so they can perform an action on behalf of the provided account.

aztec authorize-action [options] <functionName> <caller>

Arguments:

functionName: Name of function to authorize
caller: Account to be authorized to perform the action
Options:

-u, --rpc-url <string>: URL of the PXE (default: "http://host.docker.internal:8080", env: PXE_URL)
--args [args...]: Function arguments (default: [])
-ca, --contract-address <address>: Aztec address of the contract.
-c, --contract-artifact <fileLocation>: Path to a compiled Aztec contract's artifact in JSON format. If executed inside a nargo workspace, a package and contract name can be specified as package@contract
-sk, --secret-key <string>: The sender's secret key (env: SECRET_KEY)