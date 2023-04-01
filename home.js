firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
    location.replace("login.html");
    }

})






function play(){
    window.location.replace("dino.html");
}



 
