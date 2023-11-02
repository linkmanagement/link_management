// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    aapiKey: "AIzaSyCi7h1VDHmDy-t08c0KzZEoWxx0SB6SGc8",
    authDomain: "link-management-83b1e.firebaseapp.com",
    projectId: "link-management-83b1e",
    storageBucket: "link-management-83b1e.appspot.com",
    messagingSenderId: "903813748574",
    appId: "1:903813748574:web:3de3e0d5de77fcccd7e1cf",
    measurementId: "G-WX5ZE2BJEC"
};

// Initialize Firebase

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export { firebaseConfig, app }