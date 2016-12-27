import React from 'react';

const toMessageElement = (message, index) => (
  <div key={index} className={`sm-bot-message sm-bot-${message.sender}-message`}>
    {message.text}
  </div>
);

const Message = props => {
  return (
    <div className="sm-bot-chat-messages">
      { props.messages.map(toMessageElement) }
    </div>
  );
};

export default Message;
