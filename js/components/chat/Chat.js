import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './chat.css';

const Chat = props => {
  return (
    <div className="sm-bot-chat">
      <MessageList messages={props.messages}/>
      <MessageInput onMessageSent={props.onMessageSent}/>
    </div>
  );
};

export default Chat;
