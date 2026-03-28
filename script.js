const userInput = document.getElementById("userInput");
const searchButton =document.getElementById("searchButton");

searchButton.addEventListener("click",async function (){
    const username=userInput.value.trim();
    if(username===""){
        alert("Please enter a valid username");
        return;
    }
    // console.log(username);
    profileBox.innerHTML="<p>Loading...</p>"
    try{
    const response = await fetch (`https://api.github.com/users/${username}`);
    if(!response.status){
        throw new error("User not found")
    }
    const data =await response.json();
    // console.log(data);
    profileBox.innerHTML=`
    <img src="${data.avatar_url}" class="avatar" >
    <h2>${data.name || "No name"}</h2>
    <p>${data.bio || "No bio available"}</p>
    <div class ="stats">
        <div>
            <strong>${data.followers}</strong>
            <p>Followers</p>
        </div>
        <div>
            <strong>${data.following}</strong>
            <p>Following</p>
            </div>
        <div>
        <strong>${data.public_repos}</strong>
        <p>Repositories</p>
        </div>
    </div>`
}
catch(error){
    // console.log(error.message);
    profileBox.innerHTML=`<p>style="color:red">User not found</p>`;
}
});

userInput.addEventListener("keypress",function(e){
    if(e.key==="Enter")
        searchButton.click();
});
const profileBox=document.getElementById("profileBox");


