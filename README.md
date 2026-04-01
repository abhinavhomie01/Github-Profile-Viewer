# DevLook - GitHub Profile Viewer

DevLook is a sleek, responsive web application that allows users to search for any GitHub profile and seamlessly explore their details, including public repositories, followers, and the accounts they are following. 

## ✨ Features

* **Real-Time Profile Search:** Search for any GitHub user by their username using the GitHub REST API.
* **Detailed Profile Cards:** Displays the user's avatar, name, handle, bio, and key statistics (Follower count, Following count, and Public Repositories).
* **Deep Dive Navigation:** Click on the profile stats to view dedicated, detailed lists of the user's:
  * 📦 Repositories (with links, descriptions, star counts, forks, and primary languages)
  * 👥 Followers
  * 👤 Following
* **Modern Dark UI:** A beautifully designed dark theme using CSS variables, custom SVG icons, and premium typography (`Inter` for UI text and `JetBrains Mono` for code/data).
* **Fully Responsive:** Optimized for both desktop and mobile viewing experiences.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure across multiple pages (`index.html`, `repos.html`).
* **CSS3:** Custom properties (variables) for consistent theming, Flexbox for layout, and media queries for responsiveness.
* **JavaScript (ES6+):** Vanilla JS handling DOM manipulation, event listeners, URL parameter parsing, and asynchronous API calls (`async/await` & `fetch`).
* **API:** [GitHub REST API v3](https://docs.github.com/en/rest)

## 📂 File Structure

```text
├── index.html       # Main landing and search page
├── style.css        # Styles for the main search page
├── script.js        # Search logic and profile fetching
├── repos.html       # Dedicated page for listing repos/followers/following
├── repos.css        # Styles for the list view
└── repos.js         # Logic for fetching and rendering lists based on URL parameters
