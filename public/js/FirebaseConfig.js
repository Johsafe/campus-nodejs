// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import{getStorage,ref,getDownloadURL,uploadBytesResumable,deleteObject} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4o7ovetEMJaWBBLAPpJ2jEdILV7gDTJU",
    authDomain: "campus-blogs.firebaseapp.com",
    projectId: "campus-blogs",
    storageBucket: "campus-blogs.appspot.com",
    messagingSenderId: "349247112863",
    appId: "1:349247112863:web:f0be76a88ac32f37d9c4aa",
    measurementId: "G-7M9BZ8LT3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage=getStorage(app);

export{ projectStorage,ref,getDownloadURL,uploadBytesResumable,deleteObject}
