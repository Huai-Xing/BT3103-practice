import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA5RLmrbmnZqtw0Fo_Ae9g0ETvDHbGsErA",
    authDomain: "bt3103-week-6-66798.firebaseapp.com",
    projectId: "bt3103-week-6-66798",
    storageBucket: "bt3103-week-6-66798.appspot.com",
    messagingSenderId: "395221974618",
    appId: "1:395221974618:web:3aa5fbaae491e01cec2263",
    measurementId: "G-NYVF3W1P56"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  var database = firebase.firestore();
  export default database;