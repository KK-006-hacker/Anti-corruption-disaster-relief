// Contract Address and ABI
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace with your actual contract address
const abi = [
    // ABI of the DisasterRelief smart contract
];

let web3;
let contract;

// Connect to MetaMask when the page loads
window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request access to MetaMask accounts
            await ethereum.request({ method: "eth_requestAccounts" });
            contract = new web3.eth.Contract(abi, contractAddress);
            console.log("Connected to MetaMask");
        } catch (error) {
            alert("MetaMask access denied!");
        }
    } else {
        alert("MetaMask not found! Please install it.");
    }
};

// Donate to the contract
async function donate() {
    const amount = document.getElementById("donationAmount").value;
    if (!amount || amount <= 0) {
        alert('Enter a valid amount!');
        return;
    }

    const accounts = await web3.eth.getAccounts();

    contract.methods
        .donate()
        .send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") })
        .then(() => alert("Donation successful!"))
        .catch((err) => {
            console.error(err);
            alert("Error during donation!");
        });
}

// Get contract balance
async function getBalance() {
    try {
        const balance = await contract.methods.getBalance().call();
        document.getElementById("balance").innerText = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;
    } catch (error) {
        console.error('Error fetching contract balance:', error);
        alert("Error fetching contract balance!");
    }
}

// Connect to MetaMask
async function connectMetaMask() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);
        alert(`Connected account: ${accounts[0]}`);
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert("Error connecting to MetaMask!");
    }
}

// Send Transaction (Donation) via `eth_sendTransaction`
async function sendTransaction() {
    const donationAmount = document.getElementById('donationAmount').value;
    if (!donationAmount || donationAmount <= 0) {
        alert('Enter a valid amount!');
        return;
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const transactionParameters = {
            to: contractAddress, // Use the contract address
            from: accounts[0],
            value: web3.utils.toHex(web3.utils.toWei(donationAmount, 'ether')), // Convert ETH to Wei
        };

        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        console.log('Transaction hash:', txHash);
        alert('Donation successful!');
    } catch (error) {
        console.error('Error during donation transaction:', error);
        alert("Error during donation transaction!");
    }
}

// Check Contract Balance using Web3
async function checkContractBalance() {
    try {
        const balance = await web3.eth.getBalance(contractAddress); // Using web3.eth.getBalance to fetch contract balance
        const etherBalance = web3.utils.fromWei(balance, 'ether');
        document.getElementById('balance').innerText = `Balance: ${etherBalance} ETH`;
    } catch (error) {
        console.error('Error fetching balance:', error);
        alert("Error fetching contract balance!");
    }
}
