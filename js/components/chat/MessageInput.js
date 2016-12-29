import React from 'react';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};
  }

  handleKeyPress(event) {
    if (event.key === 'Enter' && this.state.inputValue !== '') {
      this.props.onMessageSent(this.state.inputValue);
      this.setState({inputValue: ''});
    }
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return (
      <div className="sm-bot-chat-input">
        <input
          type="text"
          value={this.state.inputValue}
          onKeyPress={::this.handleKeyPress}
          onChange={::this.handleChange}
          placeholder="Type message"
        />
      </div>
    );
  }
}

export default MessageInput;
