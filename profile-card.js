function displayProfile(user) {
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";
    profileCard.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Wallet Address: ${user.walletAddress}</p>
        <p>Total Donations: ${user.totalDonations} ETH</p>
    `;
    document.querySelector("#profileSection").append(profileCard);
}
