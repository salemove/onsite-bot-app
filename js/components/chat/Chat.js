import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './chat.css';

const Chat = props => {
  return (
    <div className="sm-bot-chat">
      <span className="sm-bot-header">Welcome to our virtual assistant</span>
      <span className="sm-bot-description">Type "start engagement" to speak with a human</span>
      <MessageList messages={props.messages}/>
      <MessageInput onMessageSent={props.onMessageSent}/>
    </div>
  );
};

export default Chat;
