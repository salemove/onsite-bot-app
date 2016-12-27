import React from 'react';
import './chat.css';
import Messages from './Messages';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      messages: []
    };
  }

  handleNewMessage(event) {
    if (event.key === 'Enter') {
      const visitorMessage = {
        text: this.state.newMessage,
        sender: 'visitor'
      };
      const newMessages = [...this.state.messages, visitorMessage];
      this.setState({messages: newMessages, newMessage: ''});
    }
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  render() {
    return (
      <div className="sm-bot-chat">
        <Messages messages={this.state.messages}/>
        <div className="sm-bot-chat-input">
          <input
            type="text"
            value={this.state.newMessage}
            onKeyPress={::this.handleNewMessage}
            onChange={::this.handleChange}
          />
        </div>
      </div>
    );
  }
}


export default Chat;
