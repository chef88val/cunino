// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require('firebase-admin')

// See https://firebase.google.com/docs/web/setup for how to
// auto-generate this config
var firebaseConfig = {
    apiKey: "",
    authDomain: "cunino-1eecc.firebaseapp.com",
    databaseURL: "https://cunino-1eecc.firebaseio.com",
    projectId: "cunino-1eecc",
    storageBucket: "cunino-1eecc.appspot.com",
    messagingSenderId: "930373808585",
    appId: "",
    measurementId: "G-BSKHPEP70B"
  };
  
var defaultProject = firebase.initializeApp(firebaseConfig);

firebaseAdmin.initializeApp({
  serviceAccountId: 'cunino-1eecc@appspot.gserviceaccount.com',
});

console.log(firebaseAdmin);
