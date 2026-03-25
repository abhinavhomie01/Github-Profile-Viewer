const userInput = document.getElementById("userInput");
const searchButton =document.getElementById("searchButton");

searchButton.addEventListener("click",async function (){
    const username=userInput.value.trim();
    if(username===""){
        alert("Please enter a valid username");
        return;
    }
    // console.log(username);

    try{
    const response = await fetch (`https://api.github.com/users/${username}`);
    if(!response.status){
        throw new error("User not found")
    }
    const data =await response.json();
    console.log(data);
}
catch(error){
    console.log(error.message);
}
});

userInput.addEventListener("keypress",function(e){
    if(e.key==="Enter")
        searchButton.click();
});


