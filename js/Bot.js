import {ACTION_TYPES, SENDERS} from './Constants';
import {addBotMessage} from './Actions';

const lastOrNull = items => items.length > 0 ? items[items.length - 1] : null;

const Bot = store => {
  let prevMessage = null;

  const echoMessage = message => {
    store.dispatch(addBotMessage(message.text));
  };

  const isNewMessageFromVisitor = newMessage =>
    newMessage && prevMessage != newMessage && newMessage.sender === SENDERS.VISITOR

  store.subscribe(() => {
    const messages = store.getState().messages;
    const newMessage = lastOrNull(messages);
    if (isNewMessageFromVisitor(newMessage)) {
      prevMessage = newMessage;
      echoMessage(newMessage);
    }
  });
};

export default Bot;
