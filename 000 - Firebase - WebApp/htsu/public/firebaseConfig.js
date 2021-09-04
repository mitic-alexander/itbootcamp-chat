var firebaseConfig = {
    apiKey: "AIzaSyBB9ciKhM2-Zu8jIMdjBZnIFvmRtd9AxwU",
    authDomain: "htsu-chat.firebaseapp.com",
    databaseURL: "https://htsu-chat.firebaseio.com",
    projectId: "htsu-chat",
    storageBucket: "htsu-chat.appspot.com",
    messagingSenderId: "345171931246",
    appId: "1:345171931246:web:f9d34735b2502b0fb8b67f"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();