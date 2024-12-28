// Ethereum interaction
async function interactWithEthereum(method, ...args) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);
    return await contract.methods[method](...args).call({ from: accounts[0] });
}

// Solana interaction
async function interactWithSolana(transaction) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
    const signature = await connection.sendTransaction(transaction, [userKeypair]);
    return signature;
}
