// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtZegeG8zzllfXjt-gd69BfxiK_n23GTQ",
  authDomain: "myblog-app-b7163.firebaseapp.com",
  projectId: "myblog-app-b7163",
  storageBucket: "myblog-app-b7163.appspot.com",
  messagingSenderId: "1046420905080",
  appId: "1:1046420905080:web:313bd10504c07499d5e18d",
  measurementId: "G-482P4L5BKD"
};

// Initialize Firebase
const fire_store = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export default fire_store;