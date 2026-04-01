const params   = new URLSearchParams(window.location.search);
const username = params.get("user");
const type     = params.get("type");
const reposList = document.getElementById("reposList");
const listTitle = document.querySelector(".list-title");

// Set page title
const titleMap = { followers: "Followers", following: "Following", repos: "Repositories" };
if (type && titleMap[type]) {
    listTitle.innerText = `${username} — ${titleMap[type]}`;
    document.title = `${username} ${titleMap[type]}`;
}

if (!username) {
    reposList.innerHTML = `<p class="error-msg">No user specified.</p>`;
} else {
    loadData();
}

async function loadData() {
    try {
        reposList.innerHTML = `<p class="loading-text">Loading…</p>`;
        const res = await fetch(`https://api.github.com/users/${username}/${type}`);
        if (!res.ok) throw new Error("Failed to load data.");

        const items = await res.json();

        if (items.length === 0) {
            reposList.innerHTML = `<p class="empty-msg">No ${type} found.</p>`;
            return;
        }

        let html = "";

        if (type === "followers" || type === "following") {
            items.forEach(user => {
                html += `
                <div class="profile-follow-list" data-login="${user.login}">
                    <img src="${user.avatar_url}" alt="${user.login}">
                    <div class="follow-info">
                        <span class="follow-login">${user.login}</span>
                        <span class="follow-label">View profile →</span>
                    </div>
                </div>`;
            });
            reposList.innerHTML = html;

            document.querySelectorAll(".profile-follow-list").forEach(card => {
                card.addEventListener("click", () => {
                    window.location.href = `index.html?user=${card.dataset.login}`;
                });
            });

        } else {
            items.forEach(repo => {
                html += `
                <div class="repo">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    ${repo.description ? `<p style="font-size:13px;color:var(--muted);margin-top:4px;">${repo.description}</p>` : ""}
                    <div class="repo-meta">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                        ${repo.language ? `<span>● ${repo.language}</span>` : ""}
                    </div>
                </div>`;
            });
            reposList.innerHTML = html;
        }

    } catch (err) {
        reposList.innerHTML = `<p class="error-msg">Error loading data. Please try again.</p>`;
    }
}
