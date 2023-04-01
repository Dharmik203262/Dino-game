document.getElementById("loginform").addEventListener("submit",(event)=>{
  event.preventDefault();
})

const email = document.querySelector("#email")
const password = document.querySelector("#password");  
const SignUpbutton = document.querySelector("#button2");
const SignInbutton = document.querySelector("#button1");
//fire base //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCbsDPwGbZxGtmR-aDMl5PDGgCLgldzrHo",
  authDomain: "dino-game-f705c.firebaseapp.com",
  projectId: "dino-game-f705c",
  storageBucket: "dino-game-f705c.appspot.com",
  messagingSenderId: "12017533865",
  appId: "1:12017533865:web:7654f30a2957be68e1fab8"
};

const userSignUp = async () => {
  const useremail = email.value;
  const userpassword = password.value;
  
 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, useremail, userpassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user);
      console.log(useremail);
      alert("you have been signed in");
      window.location.replace("home.html");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorCode + errorMessage);
      
      
      
    });
}
SignUpbutton.addEventListener('click',userSignUp);

const userSignIn = async () => {
  const useremail = email.value;
  const userpassword = password.value;
  
 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
    signInWithEmailAndPassword(auth, useremail, userpassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user);
      console.log(useremail);
      alert("you have been logged in");
      window.location.replace("home.html");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorCode + errorMessage);
     
    });
}

SignInbutton.addEventListener('click',userSignIn);