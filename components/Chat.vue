<script>
export default {
data() {
    return {
        isChatOpen: false,
        messages: [],
        message: '',
        ws_host: 'wss://dev.andalex.biz/sklad/api/support/site',
        host: 'https://dev.andalex.biz/sklad/api/support',
        device: 'testAuthDevice3',
        countMessage: 10,
        data: null,
        unreadMessage: 0,

        messageObject: {
            message: null,
            attachments: [],
            supportInfo: null
        },

        attachmentObject: {
            message: "",
            attachments: [{
                name: '',
                type: '',
                data: '',
            }],
            supportInfo: null
        },

        selectedFiles: [],
    };
},
methods: {
toggleChat() {
    this.isChatOpen = !this.isChatOpen; // открытие и закрытие чата

    if (this.isChatOpen && this.unreadMessage.count > 0) {
        this.readMessages(); // откпрвка запроса на прочтение сообщений
    }
    else
    {
        this.unreadMessage.count = 0;
    }

    // скролл вниз сообщения
    this.$nextTick(() => {
        this.scrollToBottom();
    });
},
connectWebSocket() {
    this.ws = new WebSocket(`${this.ws_host}/chat?Device=${this.device}`); // подключение

    this.ws.onopen = () => { // при открытии подключения вывод последних сообщений, непрочитанных сообщений и скролл вниз
        console.log('WebSocket connection established');

        this.getLastMessages();

        this.getUnreadedMessages();

        this.$nextTick(() => {
            this.scrollToBottom();
        });
    },

    this.ws.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);       
        // проверка отправленных сообщений
        if(receivedData.data){
            console.log('CLIENT');
            console.log(receivedData);
            if(receivedData.data.message){
                this.messages.push( {sender: 'CLIENT', time: receivedData.data.time, content: receivedData.data.message} );
            }
            else{
                this.messages.push( {sender: 'CLIENT',  attachments: receivedData.data.attachments, time: receivedData.data.time});
            }
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        }
        else
        {
            console.log('OPERATOR');
            console.log(receivedData);
            this.messages.push({sender: 'OPERATOR', content: receivedData.message, time: receivedData.time, attachments: receivedData.attachments});

            if(this.isChatOpen){ // если чат открылся или открыт, то прочитываем сообщения и берем непрочитанные, чтобы не сломался счетчик
                this.readMessages();
                this.getUnreadedMessages();
            }
            else{
                this.unreadMessage.count++;
            }
        }     

        this.countMessage++;
    };

    this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    this.ws.onclose = (event) => {
        console.log('WebSocket closed', event.reason);
        this.ws = null;
    };
},
async readMessages(){
    try{
        const headerDevice = new Headers({
            'Device-Uid': this.device,
        });

        const response = await fetch(`/sklad/api/`+`/message/read`, {
            method: 'PUT',
            headers: headerDevice
        });

        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        else{
            this.unreadMessage = await response.json();
            console.log(`unreaded messages count: `+this.unreadMessage.count);
        }
    }
    catch(error){
        console.error('Failed to fetch messages:', error);
    }
},
async getUnreadedMessages(){
    try{
        const headerDevice = new Headers({
            'Device-Uid': this.device
        });

        const response = await fetch(`/sklad/api/`+`/message/unreaded`, {
            method: 'GET',
            headers: headerDevice
        });

        if (!response.ok){
            throw new Error('Network response was not ok');
        }
        else{
            this.unreadMessage = await response.json();
            console.log(`unreaded messages count is: `+this.unreadMessage.count);
        }
    }
    catch(error){
        console.error('Failed to fetch messages:', error);
    }
},
async getLastMessages(){
    // заголовок с девайсом
    const headers = new Headers({
        'Device-Uid': this.device
    });
    // запрос на последние сообщения
    try {
        const response = await fetch(`/sklad/api/`+`/message?Page=1&${this.countMessage}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else
        {
            // парс и реверс сообщений
            this.data = await response.json();
            this.messages = this.data.reverse();
            console.log('Messages loaded:', this.messages);

            // пока просто проверка вложений
            this.messages.forEach(message => {
            if (message.attachments) {
            message.attachments.forEach(attachment => {
                console.log('Attachment name:', attachment.name);
            });
            }
            });
        }          
    }
    catch (error){
        console.error('Failed to fetch messages:', error);
    }
},
sendMessage() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        if (this.message.trim()) {
            this.messageObject = {
                message: this.message,
                attachments: [],
                supportInfo: null,
            }
            this.ws.send(JSON.stringify(this.messageObject));
            console.log('Message is sent:', this.messageObject);
            this.message = '';
        }

        // Отправляем вложения отдельно от сообщения
        if (this.selectedFiles.length > 0) {
            this.selectedFiles.forEach(selectedFile => {
                const attachmentObject = { // создаем отдельный объект для каждого файла
                    message: "",
                    attachments: [{
                        name: selectedFile.name,
                        type: selectedFile.type,
                        data: selectedFile.data
                    }],
                    supportInfo: null
                };

                this.ws.send(JSON.stringify(attachmentObject));
                console.log('Attachment is sent:', attachmentObject);
            });

            this.selectedFiles = []; // обнуление
        }

        this.$nextTick(() => {
            this.scrollToBottom(); // Скроллим чат вниз после отправки сообщения
        });
    } 
    else {
        console.error('WebSocket is not connected.');
    }
},
handleFileUpload(event) {
    const files = event.target.files;
    const reader = new FileReader();
    for (let i = 0; i < files.length; i++){
        const file = files[i];
        reader.onload = ((file) => { // Используем замыкание для захвата значения переменной file
            return (event) => {
                const arrayBuffer = event.target.result;
                const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                
                let fileType = 'I'; // стандартное значение типа файла 
                if (file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.txt')) { // тип документ
                    fileType = 'D';

                    const selectedFile = {
                        name: file.name,
                        type: fileType,
                        data: base64String
                    };

                    this.selectedFiles.push(selectedFile); // добавляем файл в массив файлов
                    console.log('Выбран файл:', selectedFile);
                }
                else // изображение
                {
                    const selectedFile = {
                        name: file.name,
                        type: fileType,
                        data: base64String
                    };

                    this.selectedFiles.push(selectedFile); // добавляем файл в массив файлов
                    console.log('Выбран файл:', selectedFile);
                }
            };
        })(file);
        reader.readAsArrayBuffer(file);
    }
},
scrollToBottom() { 
    const chatbox = document.querySelector('.chatbot__main__chatbox');
    chatbox.scrollTop = chatbox.scrollHeight; // скролл вниз диалога
},
},
mounted() {
    this.connectWebSocket(); // подключение к сокету
},
beforeDestroy() {
    if (this.ws) {
        this.ws.close();
    }
}
};
</script>

<template>
    <div class="chatbot__show">

      <button class="chatbot__show__toggler" rel="preload" v-show="!isChatOpen" id="open_btn" @click="toggleChat">
        <span class="material-symbols-outlined"><img src="@/assets/images/chat-icon.svg" alt="Чат"></span>

        <div v-show="unreadMessage.count > 0" class="chatbot__show__toggler__unreaded">
            <span class="chatbot__show__toggler__unreaded-count">{{ unreadMessage.count }}</span>
        </div>
      </button>

      <div class="chatbot__main" id="chat" rel="preload" v-show="isChatOpen">
            <div class="chatbot__main__chat-header">
                <div class="chatbot__main__chat-header__h2-content">
                    <h2>Напишите нам</h2>
                    <div>
                        <span class="chatbot__main__close-chat-btn" id="close"><img @click="toggleChat" src="@/assets/images/cancel-btn-chat.svg" alt="Крест">
                        </span>
                    </div>
                </div>
                <div class="chatbot__main__chat-header__h3-content">
                    <h3>Операторы сейчас онлайн!</h3>
                    <span><img src="@/assets/images/online-factor-chat.svg" alt="Зелень"></span>
                </div>
            </div>
  
            <ul class="chatbot__main__chatbox">
                <li class="chat" v-for="(messageObj, index) in messages" :key="index" 
                    :class="{'incoming': messageObj.sender === 'OPERATOR', 'outgoing': messageObj.sender === 'CLIENT'}">

                    <p v-show="messageObj.content" >
                        {{ messageObj.content}}
                    </p>

                    <div v-show="messageObj.attachments" class="chatbot__main__chatbox__chat__attachments">
                        <ul class="chatbot__main__chatbox__chat__attachments-ul">
                            <li class="chatbot__main__chatbox__chat__attachments-li__item" v-for="(attachment, index) in messageObj.attachments" :key="index">
                                <a class="chatbot__main__chatbox__chat__attachments-item-href" :href="attachment.url" target="_blank">
                                    <img
                                        :class="{
                                            'chatbot__main__chatbox__chat__attachments-item-href__img-image-operator': messageObj.sender === 'OPERATOR',
                                            'chatbot__main__chatbox__chat__attachments-item-href__img-image': messageObj.sender === 'CLIENT'
                                        }" 
                                        v-if="attachment.type === 'I'" 
                                        :src="attachment.url" 
                                        :alt="attachment.name" 
                                        :title="attachment.name" 
                                    />

                                    <img class="chatbot__main__chatbox__chat__attachments-item-href__img-file" v-else src="@/assets/images/file-text-one.svg" 
                                        :alt="attachment.name" 
                                        :title="attachment.name" 
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>

                </li>
            </ul>

            <div class="chatbot__main__textarea">
                <label for="attachments-add" class="chatbot__main__textarea__attachments-btn">
                    <img src="@/assets/images/attachments-btn.svg" alt="">
                </label>
                <input type="file" id="attachments-add" style="display: none;" multiple @change="handleFileUpload">
                <textarea v-model="message" placeholder="Введите сообщение"></textarea>
                <span id="send-btn" class="material-symbols-outlined"><img @click="sendMessage" src="@/assets/images/send-button-chat.svg" alt="Отправить"></span>
            </div>
      </div>
    </div>
  </template> 

<style scoped>

.chatbot__show__toggler__unreaded {
    height: 28px;
    width: 28px;
    display: flex;
    background-color: #9360FF;
    justify-content: center;
    align-items: center;
    border-radius: 70%;
    position: relative; /* Позиционируем относительно родительского блока */
    left: 20px;
    bottom: 26px;
}

.chatbot__show__toggler__unreaded-count {
    color: white;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    position: absolute; /* Позиционируем абсолютно внутри родительского блока */
}
.chatbot__main__chatbox__chat__attachments-item-href__img-image-operator {
    width: 100%;
    max-width: 100%;
    border-radius: 15px;
}
.chatbot__main__chatbox__chat__attachments-item-href__img-image {
    width: 100%;
    max-width: 100%;
    border-radius: 15px;
}
.chatbot__main__chatbox__chat__attachments-item-href__img-file {
    max-width: 100%;
}
.chatbot__main__chatbox__chat__attachments-li__item{
    background-attachment: fixed;
    background-color: #fff;
}
.chatbot__show__toggler{
    position: fixed;
    right: 40px;
    bottom: 35px;
    height: 50px;
    width: 50px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    z-index: 99999;
    border-radius: 15px;
    background: #9360FF;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
}
.chatbot__show__toggler img{
    width: 60%;
}
.chatbot__show__toggler span{
    position: absolute;
}
.chatbot__show{
    max-height: 537px;
}
.chatbot__main__close-chat-btn{
    cursor: pointer;
}
.chatbot__main__chat-header__h2-content h2{
    margin-bottom: 0;
}
.chatbot__main__chat-header__h3-content{
    margin-top: 0;
}
.chatbot__main__chat-header__h3-content{
    display: flex;
    align-items: baseline;
}
.chatbot__main__chat-header__h3-content span{
    padding-left: 5px;
}
.header{
    width: 100%;
}
.chatbot__main__chat-header__h2-content{
    display: flex;
}
.chatbot__main__chat-header__h2-content span{
    padding-left: 110px;
    padding-top: 5px;
}

.chatbot__main{
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 336px;
    z-index: 9999;
    background: #fff;
    border-radius: 15px 15px 0 0;
    border: 1px solid;
    border-color: gray;
    box-shadow: 0 0 120px 0 rgba(0,0,0,0.1),
                0 32px 64px -48px rgba(0,0,0,0.5);
}

.chatbot__main__chat-header{
    background: #9360FF;
    padding: 1px;
    padding-left: 20px;
    border-radius: 15px 15px 0 0;
}

.chatbot__main h2{
    color: #fff;
}

.chatbot__main h3{
    color: #D7D7D7;
}

.chatbot__main .chatbot__main__chatbox {
    max-height: 300px; /* Можете настроить по своему усмотрению */
    overflow-y: auto;
    padding: 16px 5px 70px;
    min-height: 150px;
}   

.chatbot__main .chatbot__main__chatbox {
    padding-bottom: 80px; /* Увеличьте отступ в зависимости от высоты .chatbot__main__textarea */
}

.chatbot__main__chatbox .chat{
    display: flex;
}
.chatbot__main__chatbox .incoming span{
    width: 32px;
    height: 32px;
    align-self: self-end;
    background: #3D00BE;
    text-align: center;
    line-height: 32px;
    border-radius: 4px;
    margin: 0 10px 7px 0;
}
.chatbot__main__chatbox .outgoing{
    margin: 5px 0;
    justify-content: flex-end;
}
.incoming, .outgoing{
    color: #fff;
}
.incoming p, .outgoing p {
    padding: 10px;
    max-width: 200px;
    word-wrap: break-word;
}
.incoming img, .outgoing img{
    width: fit-content;
    max-width: 200px;
}
.incoming p{
    background: #969696;
    border-radius: 10px 10px 10px 0;
    margin-left:  15px;
}
.outgoing p{
    background: #3D00BE;
    border-radius: 10px 10px 0 10px;
    margin-right:  10px;
}

.chatbot__main .chatbot__main__textarea{
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    gap: 5px;
    background: #fff;
    border-top: 1px solid #ccc;
}
.chatbot__main__textarea__attachments-btn{
    width: 30px;
    height: 30px;
    margin: 0;
    padding-top: 15px;
    padding-left: 15px;
    cursor: pointer;
}
.chatbot__main__textarea textarea{
    height: 20px;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    padding: 20px 16px 20px 0;
    align-self: center;
    font-size: 17px;
    padding-left: 15px;
}

.chatbot__main__textarea span{
    align-self: center;
    height: 55px;
    line-height: 55px;
    color: #969696;
    font-size: 1.35rem;
    cursor: pointer;
    padding-right: 15px;
    padding-top: 13px;
}
</style>