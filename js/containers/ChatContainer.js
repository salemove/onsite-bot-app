import Chat from '../components/chat/Chat';
import {addVisitorMessage} from '../Actions';
import {connect} from 'react-redux';

const mapStateToProps = state => (
  {
    messages: state.messages
  }
);

const mapDispatchToProps = dispatch => {
  return {
    onMessageSent: message => dispatch(addVisitorMessage(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
