const userInput    = document.getElementById("userInput");
const searchButton = document.getElementById("searchButton");
const profileBox   = document.getElementById("profileBox");

const params   = new URLSearchParams(window.location.search);
const UserName_param = params.get("user");

searchButton.addEventListener("click", async function () {
    const username = userInput.value.trim();
    if (!username) {
        alert("Please enter a valid username");
        return;
    }

    profileBox.classList.remove("empty");
    profileBox.innerHTML = `<p class="loading-text">Loading…</p>`;

    try {
        
        const res = await fetch(`https://api.github.com/users/${username}`);

        if(!res.ok){
            throw new Error("User not found")
        }

        const data = await res.json();

        profileBox.innerHTML = `
            <div class="profile-header">
                <img src="${data.avatar_url}" class="avatar" alt="${data.login}">
                <div class="profile-info">
                    <h2>${data.name || data.login}</h2>
                    <p class="profile-username">@${data.login}</p>
                    ${data.bio ? `<p class="profile-bio">${data.bio}</p>` : ""}
                </div>
            </div>
            <div class="stats">
                <div>
                    <button class="profile-stats" data-type="followers">
                        <strong>${data.followers}</strong>
                        <p>Followers</p>
                    </button>
                </div>
                <div>
                    <button class="profile-stats" data-type="following">
                        <strong>${data.following}</strong>
                        <p>Following</p>
                    </button>
                </div>
                <div>
                    <button class="profile-stats" data-type="repos">
                        <strong>${data.public_repos}</strong>
                        <p>Repos</p>
                    </button>
                </div>
            </div>
        `;

        document.querySelectorAll(".profile-stats").forEach(btn => {
            btn.addEventListener("click", e => {
                const type = e.currentTarget.dataset.type;
                window.location.href = `repos.html?user=${username}&type=${type}`;
            });
        });

    } catch (err) {
        profileBox.classList.add("empty");
        profileBox.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p style="color:#f85149;">User not found. Try another username.</p>
            </div>`;
    }
});

if (UserName_param) {
    userInput.value = UserName_param;
    searchButton.click();
}

userInput.addEventListener("keypress", e => {
    if (e.key === "Enter") searchButton.click();
});
