
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore ,collection, addDoc,getDocs,doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeLwbNthXq2WVDxS4nkEN43DEL6Xx5HDY",
  authDomain: "myprject-1.firebaseapp.com",
  projectId: "myprject-1",
  storageBucket: "myprject-1.appspot.com",
  messagingSenderId: "965807283273",
  appId: "1:965807283273:web:6e931675bca22e17867398",
  measurementId: "G-J5X22KDJBY"
};

// initialize of things which we are importing
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
///////////////////////////////////////////////////////////////////////

//SignUP

let signuoButton=document.getElementById("Sign-up");

// //SignUp data from html + firebase sign up

let signupUser =()=>{

// Taking user data from html and storing in object
let username=document.getElementById("fullname").value;
let userphone=document.getElementById("phonenumber").value;
let useremail=document.getElementById("email").value;
let userpassword=document.getElementById("password").value;

// user object

let userprofile={
name:username,
phone:userphone,
email:useremail,
password:userpassword
}
console.log("userobject",userprofile)

// sign up through firebase

createUserWithEmailAndPassword(auth,userprofile.email,userprofile.password)
  .then(async(userCredential) => {
    const user = userCredential.user; 
    console.log("user made at sign up",user);

    // storing in database
    // for storing data with auto generated ref id

    try {

      // addDoc auto generate ref id52
      
      const docRef = await addDoc(collection(db, "users"), {
        ...userprofile,
        uid:user.uid,
      });
      console.log("Document written with ID: ", docRef.id);

      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("user made at sign up",user);
  
  })

  // error of creating user

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Sign Up Error",errorMessage);
  });
}
signuoButton&&signuoButton.addEventListener("click",signupUser)
//////////////////////////////////////////////////////////////////////////////////

//Sign In

let signinButton=document.getElementById("signinbtn");

// //SignUp data from html + firebase sign up

let signinUser = async ()=>{

// Taking user data from html and storing in object

let signinUseremail=document.getElementById("signinemail").value;
let signinUserpassword=document.getElementById("signinpassword").value;


// sign in through firebase
await signInWithEmailAndPassword(auth, signinUseremail,signinUserpassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User which is signed in ",user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error of sign in",errorMessage)
  });
}
signinButton&&signinButton.addEventListener("click",signinUser)
/////////////////////////////////////////////////////////////////////////////////

// Adding data after sign up

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
 
// Getting users from database

// let getuserdata=async()=>{
//   const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//     console.log("user data from firestore")
//     console.log(`${doc.id} =>`,doc.data());
//   });

// }
// getuserdata()


