const contractAddress = "YOUR_ETH_CONTRACT_ADDRESS";
const abi = [/* ABI from compiled contract */];

let web3, contract;

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("Connected to Ethereum");
    } else {
        alert("MetaMask is required to use this DApp.");
    }
};

async function donateEth() {
    const amount = document.getElementById("ethAmount").value;
    const accounts = await web3.eth.getAccounts();
    contract.methods
        .donate()
        .send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") })
        .then(() => alert("Donation successful!"))
        .catch((err) => console.error(err));
}

async function getEthBalance() {
    const balance = await contract.methods.getBalance().call();
    document.getElementById("ethBalance").innerText = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;
}
