
// A workaround to be able to programmatically send messages to SaleMove operator
// as this is not avaiable in public API.
const SmChat = chat => {
  // This is to make sure that engagement is started and Engagement#Chat instance exists.
  if (!chat) throw new Error('SaleMove Engagement Chat instance must be provided');

  const createSmChat = () => {
    const smChat = document.createElement('sm-chat');
    smChat.style.display = 'none';
    document.body.appendChild(smChat);
    return smChat;
  };

  const sendMessage = message => {
    const smChatInput = document.querySelector('.sm-user-message');
    const smSendButton = document.querySelector('.sm-send-message');
    smChatInput.value = message;
    smSendButton.click();
  };
  createSmChat();
  return {
    sendMessage
  };
};

export default SmChat;
