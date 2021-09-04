export class ChatUI {
    constructor(list) {
        this.list = list;
    }

    set list(value) {
        this._list = value;
    }

    get list() {
        return this._list;
    }

    clear() {
        this.list.innerHTML = '';
    }

    formatDate(inputDate) {
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        let year = inputDate.getFullYear();
        let month = inputDate.getMonth();
        let day = inputDate.getDay();

        let date = String(inputDate.getDate());
        let hour = String(inputDate.getHours());
        let minute = String(inputDate.getMinutes());

        let tempArray = [hour, minute, date];
        
        for (let i=0; i<tempArray.length; i++) {
            if (tempArray[i].length == 1) {
                tempArray[i] = `0${tempArray[i]}`;
            }
        }

        if (inputDate.getDate() == new Date().getDate()) {
            return `Today at ${tempArray[0]}:${tempArray[1]}`;
        }
        else {
            return `${weekdays[day]} at ${tempArray[0]}:${tempArray[1]}, on ${months[month].slice(0, 3)} ${tempArray[2]}, ${year}`;
        }
    }

    checkCurrentUser() {
        let listItems = document.querySelectorAll('li');
        listItems.forEach(item => {
            switch(item.firstChild.firstChild.textContent) {
                case `${sessionStorage.getItem('username')}: `:
                    item.setAttribute('class', 'current_user');
                    break;
                default:
                    item.setAttribute('class', 'other_user');
            }
        });
    }

    templateLI(data) {
        let messageDate = data.data().created_at.toDate();
        let formatedDate = this.formatDate(messageDate);
        
        let listItem = this.list.appendChild(document.createElement('li'));
        listItem.setAttribute('data-id', data.id);
        let listItemDiv = listItem.appendChild(document.createElement('div'));
        listItemDiv.setAttribute('class', 'list_item_div');
        let listItemUsername = listItemDiv.appendChild(document.createElement('p'));
        listItemUsername.setAttribute('class', 'chatAreaUsername');
        listItemUsername.appendChild(document.createTextNode(`${data.data().username}: `));
        let listItemMessage = listItemDiv.appendChild(document.createElement('pre'));
        listItemMessage.setAttribute('class', 'chatAreaMessage');
        listItemMessage.appendChild(document.createTextNode(data.data().message));
        let listItemDate = listItemDiv.appendChild(document.createElement('p'));
        listItemDate.setAttribute('class', 'chatAreaDate');
        listItemDate.appendChild(document.createTextNode(`${formatedDate}`));
        let listItemTrash = listItemDiv.appendChild(document.createElement('img'));
        listItemTrash.setAttribute('class', 'remove_button');
        listItemTrash.setAttribute('src', './feather-icons/trash-2.svg');
        listItemTrash.setAttribute('alt', 'Icon missing.');

        this.checkCurrentUser();

        document.getElementById('chat_area').scrollTop = document.getElementById('chat_area').scrollHeight;
    }
}