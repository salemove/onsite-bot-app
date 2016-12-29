import React from 'react';

const toMessageElement = (message, index) => (
  <div key={index} className={`sm-bot-message sm-bot-${message.sender}-message`}>
    <div key={index} className={`sm-bot-message-content sm-bot-${message.sender}-message-content`}>
      {message.content}
    </div>
  </div>
);

class MessageList extends React.Component {
  componentDidUpdate() {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  render() {
    return (
      <div ref="messages" className="sm-bot-chat-messages">
        { this.props.messages.map(toMessageElement) }
      </div>
    );
  }
}

export default MessageList;
