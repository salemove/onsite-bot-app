import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import './chat.css';

const Chat = props => {
  return (
    <div className="sm-bot-chat">
      <Messages messages={props.messages}/>
      <MessageInput onMessageSent={props.onMessageSent}/>
    </div>
  );
};

export default Chat;
