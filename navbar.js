document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.createElement("nav");
    navbar.innerHTML = `
        <div class="navbar">
            <a href="index.html">Home</a>
            <a href="profile.html">Profile</a>
            <a href="donate.html">Donate</a>
            <a href="about.html">About</a>
        </div>
    `;
    document.body.prepend(navbar);
});
