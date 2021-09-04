import {Chatroom} from './chat.js';
import {ChatUI} from './ui.js';

let docBody = document.body;
let pageHeader = document.getElementById('header');
let chatroomButtonHeader = document.getElementById('chat_header');
let chatroomButtonDiv = document.getElementById('chatroom_button_div');
let chatroomButtons = document.querySelectorAll('.chatroom_buttons');
let chatroomArea = document.getElementById('chat_area');
let ulChatList = document.querySelector('ul');
let myTopButton = document.getElementById("toTop_button");
let myBottomButton = document.getElementById("toBottom_button");
let colorPicker = document.getElementById('color_picker');
let colorPalette = document.getElementById('color');
let timeSorting = document.getElementById('time_sorting');
let timeStart = document.getElementById('time_start');
let timeEnd = document.getElementById('time_end');
let messageForm = document.getElementById('message');
let textAreaInput = document.getElementById('message_input');
let usernameForm = document.getElementById('username');

let chatroom = new Chatroom(checkSessionRoom(), checkSessionUsername());
usernameNotify(chatroom.username, chatroom.room);

let chatUI = new ChatUI(ulChatList);
chatroom.getChats(data => {
    chatUI.templateLI(data);
});

chatroomButtons.forEach(button => {
    if (button.id == chatroom.room) {
        button.style.backgroundImage = 'radial-gradient(#cccccc, #9c9c9c, #636363)';
        button.style.color = '#000000';
    }
});

colorPicker.addEventListener('submit', (event) => {
    event.preventDefault();
    let backgroundTimeout = setTimeout(() => {
        docBody.style.backgroundColor = `${colorPalette.value}`;
        docBody.style.transition = '.5s';
        colorPicker.reset();
        clearTimeout(backgroundTimeout);
    }, 500);
});

timeSorting.addEventListener('submit', (event) => {
    event.preventDefault();
    let sortStart = new Date(timeStart.value);
    let sortEnd = new Date(timeEnd.value);
    chatUI.clear();
    chatroom.getChats(data => {
        let messageDate = data.data().created_at.toDate();
        if (messageDate >= sortStart && messageDate <= sortEnd) {
            console.log(data.data());;
            chatUI.templateLI(data);
        }
    });
    timeSorting.reset();
});

chatroomButtonDiv.addEventListener('mousedown', (event) => {
    if (event.target.tagName == 'BUTTON') {
        event.target.style.borderColor = '#ff4400';
    }
});

chatroomButtonDiv.addEventListener('mouseup', (event) => {
    if (event.target.tagName == 'BUTTON') {
        event.target.style.borderColor = '#ffffff';
        event.target.style.borderRightColor = '#464646';
        event.target.style.borderBottomColor = '#464646';
    }
});

chatroomButtonDiv.addEventListener('mouseout', (event) => {
    if (event.target.tagName == 'BUTTON') {
        event.target.style.borderColor = '#ffffff';
        event.target.style.borderRightColor = '#464646';
        event.target.style.borderBottomColor = '#464646';
    }
});

chatroomButtonDiv.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        let button = event.target;
        chatroom.updateRoom(button.id);
        button.style.backgroundImage = 'radial-gradient(#cccccc, #9c9c9c, #636363)';
        button.style.color = '#000000';
        chatroomButtons.forEach(otherButton => {
            if (otherButton != button) {
                otherButton.style.backgroundImage = 'radial-gradient(#7e7e7e, #505050, #272727)';
                otherButton.style.color = '#ffffff';
            }
        });
        chatUI.clear();
        chatroom.getChats(data => {
            chatUI.templateLI(data);
        });
        usernameNotify(chatroom.username, chatroom.room);
        if (chatroomArea.scrollHeight == chatroomArea.clientHeight) {
            myTopButton.style.display = 'none';
            myBottomButton.style.display = 'none';
        }
    }
});

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let message = textAreaInput.value;
    if (message.trim() != null && message.trim() != '') {
        chatroom.addChat(message)
        .then(() => messageForm.reset())
        .catch((error) => {console.log('All is NOT okay.', error);});
    }
    else {
        textAreaInput.value = '';
    }
});

ulChatList.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        let listItem = event.target.parentElement.parentElement;
        let id = listItem.getAttribute('data-id');
        let messageUsername = listItem.firstChild.firstChild.textContent.replace(/:\s/gi,'');
        let currentUser = chatroom.username;
        if (messageUsername == currentUser) {
            let confirmDeletion = confirm('Are you sure you want to delete your message?');
            if (confirmDeletion) {
                chatroom.deleteMessage(id);
            }
        }
        else {
            listItem.remove();
        }
    }
});

usernameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let username = document.getElementById('username_input').value;
    chatroom.updateUsername(username);
    chatUI.checkCurrentUser();
    usernameNotify(chatroom.username, chatroom.room);
    usernameForm.reset();
});

myTopButton.addEventListener('click', () => {
    chatroomArea.scrollTop = 0;
});
myBottomButton.addEventListener('click', () => {
    chatroomArea.scrollTop = chatroomArea.scrollHeight;
});

chatroomArea.addEventListener('scroll', () => {
    if (window.scrollY != 0) {
        myTopButton.style.display = 'none';
        myBottomButton.style.display = 'none';
    }
    else {
        scrollFunction();
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY != 0) {
        myTopButton.style.display = 'none';
        myBottomButton.style.display = 'none';
    }
});

function randomWordGenerator() {
    let capitalLetterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let vowelArray = ['a', 'e', 'i', 'o', 'u'];
    let consonantArray = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    let letterArray = [capitalLetterArray];
    for (let i=0; i<9; i++) {
        if (i % 2 == 0) {
            letterArray.push(vowelArray);
        }
        else {
            letterArray.push(consonantArray);
        }
    }
    let randomWord = '';
    for (let i=0; i<letterArray.length; i++) {
        let randomLetter = letterArray[i][Math.floor(Math.random()*letterArray[i].length)];
        randomWord = randomWord.concat(randomLetter);
    }
    return randomWord;
}

function checkSessionUsername() {
    if (sessionStorage.getItem('username')) {
        return sessionStorage.getItem('username');
    }
    else {
        return randomWordGenerator();
    }
}

function checkSessionRoom() {
    if (sessionStorage.getItem('room')) {
        return sessionStorage.getItem('room');
    }
    else {
        return 'general';
    }
}

function usernameNotify(username, room) {
    let notificationP = document.createElement('p');
    notificationP.appendChild(document.createTextNode(`${username} joined #${room}`));
    notificationP.setAttribute('id', 'notification');
    document.body.lastChild.remove();
    document.body.appendChild(notificationP);
    let timeout = setTimeout(() => {
        notificationP.remove();
        clearTimeout(timeout);
    }, 3000);
}

function scrollFunction() {
    if (chatroomArea.scrollTop > 20) {
        myTopButton.style.display = 'block';
        myBottomButton.style.display = 'none';
    }
    else {
        myTopButton.style.display = 'none';
        myBottomButton.style.display = 'block';
    }
    if (chatroomArea.scrollTop < (chatroomArea.scrollHeight - chatroomArea.clientHeight) / 2) {
        myBottomButton.style.display = 'block';
    }
    if (chatroomArea.scrollHeight == chatroomArea.clientHeight) {
        myTopButton.style.display = 'none';
        myBottomButton.style.display = 'none';
    }
}

function resizeMobile(mobile) {
    let fromTop = pageHeader.offsetHeight + chatroomButtonHeader.offsetHeight + chatroomButtonDiv.offsetHeight;
    if (mobile.matches) {
        myTopButton.style.top = `${fromTop+20}px`;
        myBottomButton.style.top = `${fromTop+chatroomArea.offsetHeight-40}px`;
    }
    else {
        myTopButton.style.top = `${fromTop+20}px`;
        myBottomButton.style.top = `${fromTop+chatroomArea.offsetHeight-40}px`;
    }
}
let mobileSize = window.matchMedia("(max-width: 720px)");
resizeMobile(resizeMobile);
mobileSize.addListener(resizeMobile);