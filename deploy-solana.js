const { Connection, Keypair } = require("@solana/web3.js");
const fs = require("fs");

const deploySolanaProgram = async () => {
    const connection = new Connection("https://api.devnet.solana.com");
    const programKeypair = Keypair.generate();

    fs.writeFileSync("program-keypair.json", JSON.stringify(Array.from(programKeypair.secretKey)));
    console.log("Program Keypair saved.");

    console.log("Solana Program Keypair Public Key:", programKeypair.publicKey.toBase58());
    console.log("Deploy program using the Solana CLI with this keypair.");
};

deploySolanaProgram();
