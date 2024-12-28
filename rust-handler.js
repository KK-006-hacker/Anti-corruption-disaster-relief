const { Connection, Keypair, Transaction, SystemProgram, PublicKey } = require("@solana/web3.js");

const connection = new Connection("https://api.devnet.solana.com");
const programId = new PublicKey("YOUR_RUST_PROGRAM_ID");

async function handleSolanaDonation(fromKeypair, toPublicKey, lamports) {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: fromKeypair.publicKey,
                toPubkey: toPublicKey,
                lamports: lamports,
            })
        );

        const signature = await connection.sendTransaction(transaction, [fromKeypair]);
        console.log(`Donation successful. Transaction Signature: ${signature}`);
        return signature;
    } catch (err) {
        console.error("Solana donation error", err);
        throw err;
    }
}

module.exports = { handleSolanaDonation };
