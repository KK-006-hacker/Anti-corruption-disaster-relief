document.querySelector("#donationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = document.querySelector("#donationAmount").value;
    const blockchain = document.querySelector("#blockchainSelect").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (blockchain === "Ethereum") {
        donateEthereum(amount);
    } else if (blockchain === "Solana") {
        donateSolana(amount);
    } else {
        alert("Invalid blockchain selected.");
    }
});
