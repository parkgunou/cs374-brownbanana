import firebase from 'firebase';

let database;
let config = {
    apiKey: "AIzaSyCRZFMkrCZuWnBKnMQ5liOe2iHZB_a5WpI",
    authDomain: "bb-hairshop.firebaseapp.com",
    databaseURL: "https://bb-hairshop-default-rtdb.firebaseio.com",
    projectId: "bb-hairshop",
    storageBucket: "bb-hairshop.appspot.com",
    messagingSenderId: "633835954813",
    appId: "1:633835954813:web:86efdcc5a4157b97dd8714",
    measurementId: "G-35M5T5ZLHH"
  };

export const initFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    database = firebase.database()
}

export const getFirebaseDB = () => {
    return database.ref('/')
}