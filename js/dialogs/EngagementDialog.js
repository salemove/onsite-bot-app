import {ACTION_TYPES, SENDERS} from '../Constants';
import {addMessage} from '../Actions';

const createSmChat = () => {
  const smChat = document.createElement('sm-chat');
  smChat.style.display = 'none';
  document.body.appendChild(smChat);
  return smChat;
};

const sendMessageToOperator = message => {
  const smChatInput = document.querySelector('.sm-user-message');
  const smSendButton = document.querySelector('.sm-send-message');
  smChatInput.value = message;
  smSendButton.click();
};

const EngagementDialog = context => {
  const {salemove, sendMessage, finish} = context;

  return {
    onStart: () => {
      const engagementRequest = salemove.requestEngagement('text');
      engagementRequest.engagementPromise.then(engagement => {
        const chat = engagement.chat;
        createSmChat();
        chat.addEventListener(chat.EVENTS.MESSAGES, messages => {
          if (messages.length > 0 && messages[0].sender === SENDERS.OPERATOR) {
            sendMessage(messages[0].content, SENDERS.OPERATOR);
          }
        });
        engagement.addEventListener(engagement.EVENTS.END, () => {
          finish();
        });
      });
    },
    onMessage: message => {
      sendMessageToOperator(message.content);
    }
  }
};

export default EngagementDialog;
