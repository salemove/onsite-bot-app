import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './chat.css';

class Chat extends React.Component {
  constructor() {
    super();
    this.toggleBubble = this.toggleBubble.bind(this);
    this.state = {
      toggled: false
    };
  }

  toggleBubble() {
    this.setState({toggled: !this.state.toggled});
  }

  render() {
    const toggledClass = this.state.toggled ? 'sm-bubble-hidden' : 'sm-bubble-toggle';

    return (
      <div className="sm-bubble-container">
        <div className={`${toggledClass}`} onClick={this.toggleBubble}>
          <svg viewBox="0 0 16 16" className="sm-icon-close">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-1342.000000, -539.000000)">
                <g transform="translate(1342.000000, 539.000000)">
                  <rect transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) " x="7" y="-2" width="2" height="20"></rect>
                  <rect transform="translate(8.000000, 8.000000) scale(-1, 1) rotate(45.000000) translate(-8.000000, -8.000000) " x="7" y="-2" width="2" height="20"></rect>
                </g>
              </g>
            </g>
          </svg>
          <svg viewBox="0 0 20 20" className="sm-icon-chat">
            <path d="M11.6,3.7H8.4c-2.6,0-4.7,1.8-5,4.2c-0.2,1.4,0.2,2.8,1.2,3.8c0.9,1,2.2,1.6,3.6,1.6h1.5l0.1,0.1l2.8,2.8v-2.9 l0.3-0.1c2.4-0.6,4-2.8,3.7-5.2C16.4,5.6,14.2,3.7,11.6,3.7z"/>
          </svg>
        </div>
        <div className="sm-bot-chat">
          <span className="sm-bot-header">Welcome to our virtual assistant</span>
          <span className="sm-bot-description">Type "start engagement" to speak with a human</span>
          <MessageList messages={this.props.messages}/>
          <MessageInput onMessageSent={this.props.onMessageSent}/>
        </div>
      </div>
    );
  }
}

export default Chat;
