export class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsubscribe;
    }
    
    set room(value) {
        this._room = value;
        sessionStorage.setItem('room', value);
    }
    get room() {
        return this._room;
    }

    set username(value) {
        if (value.length >= 2 && value.length <= 10 && !value.includes(' ')) {
            this._username = value;
            sessionStorage.setItem('username', value);
        }
        else {
            alert('Invalid username:\n\n1. Should be between 2 and 10 CHARACTERS long.\n\n2. Should not include whitespaces.');
        }
    }
    get username() {
        return this._username;
    }

    async deleteMessage(messageID) {
        this.chats.doc(messageID).delete()
        .then(() => {
            alert('Message deleted successfully.');
        }).catch(() => {
            alert('There was an error deleting your message from the database.\n\nYou might see your message again once you refresh the page.');
        });
    }

    async addChat(message) {
        let chatDoc = {
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
            message: message,
            room: this.room,
            username: this.username,
        }
        let response = await this.chats.add(chatDoc);
        return response;
    }

    getChats(callback) {
        this.unsubscribe = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at', 'asc')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {
                    callback(change.doc);
                }
                else if (change.type == 'removed') {
                    let listItems = document.querySelectorAll('li');
                    listItems.forEach(listItem => {
                        if (listItem.getAttribute('data-id') == change.doc.id) {
                            listItem.remove();
                        }
                    });
                }
            });
        });
    }

    updateUsername(newUserName) {
        this.username = newUserName;
    }

    updateRoom(newRoom) {
        this.room = newRoom;
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}