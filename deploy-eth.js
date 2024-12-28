const Web3 = require("web3");
const { abi, bytecode } = require("./build/DisasterRelief.json");

const deployEthereumContract = async () => {
    const web3 = new Web3("http://localhost:8545");
    const accounts = await web3.eth.getAccounts();

    const contract = new web3.eth.Contract(abi);
    const deployedContract = await contract
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: "3000000" });

    console.log("Ethereum Contract Deployed at:", deployedContract.options.address);
};

deployEthereumContract();
