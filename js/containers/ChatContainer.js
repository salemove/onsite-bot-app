import Chat from '../components/chat/Chat';
import {addMessage} from '../Actions';
import {SENDERS} from '../Constants';
import {connect} from 'react-redux';

const mapStateToProps = state => (
  {
    messages: state.messages
  }
);

const mapDispatchToProps = dispatch => {
  return {
    onMessageSent: message => dispatch(addMessage(message, SENDERS.VISITOR))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
