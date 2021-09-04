var firebaseConfig = {
    apiKey: "AIzaSyCgjL2akwLOPhYXGYE36taVd-VnQnVRDaM",
    authDomain: "aitbclex-chat-project.firebaseapp.com",
    databaseURL: "https://aitbclex-chat-project.firebaseio.com",
    projectId: "aitbclex-chat-project",
    storageBucket: "aitbclex-chat-project.appspot.com",
    messagingSenderId: "648973299629",
    appId: "1:648973299629:web:958be9f490c7662021bb24"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();