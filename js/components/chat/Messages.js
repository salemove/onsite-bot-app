import React from 'react';

const toMessageElement = (message, index) => (
  <div key={index} className={`sm-bot-message sm-bot-${message.sender}-message`}>
    {message.content}
  </div>
);

const Messages = props => {
  return (
    <div className="sm-bot-chat-messages">
      { props.messages.map(toMessageElement) }
    </div>
  );
};

export default Messages;
