var firebaseConfig = {
    apiKey: "AIzaSyCikuxMkkoW_19ZOqJpd7tdzaAzcHZeQgk",
    authDomain: "htsy-chat.firebaseapp.com",
    databaseURL: "https://htsy-chat.firebaseio.com",
    projectId: "htsy-chat",
    storageBucket: "htsy-chat.appspot.com",
    messagingSenderId: "766123169774",
    appId: "1:766123169774:web:b7b855557d39a7258360ff"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();