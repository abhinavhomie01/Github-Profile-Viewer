const params=new URLSearchParams(window.location.search);
const username=params.get("user");
const reposList=document.getElementById("reposList");

if(!username){
    reposList.innerHTML=`<p style="color:red;">User not found.</p>`
}
else{
    loadrepos();
}
async function loadrepos(){
    try{
        reposList.innerHTML=`<p>Loading...</p>`
        const response=await fetch(`https://api.github.com/users/${username}/repos`);
        if(!response.ok){
            throw new Error("Failed to load repos.")
        }
        const repos = await response.json();
        let html="";
        repos.forEach(repo=>{
            html+=`
        <div class="repo">
        <a href="${repo.html_url}" target="_blank" >${repo.name}</a>
        <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
        </div>`;
    });
    reposList.innerHTML=html;
    }
    catch(error){
        reposList.innerHTML=`<p style="color:red;">Error loading repositories</p>`
    }
}