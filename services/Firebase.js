import * as firebase from 'firebase';



const config = {
    apiKey: "AIzaSyAyO1RWPK-u6xvn2gMFyjgrzkraq9L7C7E",
    authDomain: "debe-df850.firebaseapp.com",
    databaseURL: "https://debe-df850.firebaseio.com",
    projectId: "debe-df850",
    storageBucket: "debe-df850.appspot.com",
    messagingSenderId: "237894632140",
    appId: "1:237894632140:web:1b79d4fcc8bdeeae26b869",
    measurementId: "G-9Z6ZQJCTH0"
};

firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;