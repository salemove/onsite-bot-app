import {ACTION_TYPES, SENDERS} from './Constants';
import {addBotMessage, addOperatorMessage} from './Actions';
import EchoDialog from './dialogs/EchoDialog';

const lastOrNull = items => items.length > 0 ? items[items.length - 1] : null;

const Bot = (store, salemove) => {
  let prevMessage = null;
  let isEngagement = false;
  let currentDialog = null;

  const finish = () => {
    startDialog(EchoDialog);
  };

  const startDialog = Dialog => {
    currentDialog = new Dialog({store, startDialog, salemove, finish});
    if (currentDialog.onStart) currentDialog.onStart();
  };

  const isNewMessageFromVisitor = newMessage =>
    newMessage && prevMessage != newMessage && newMessage.sender === SENDERS.VISITOR

  store.subscribe(() => {
    const messages = store.getState().messages;
    const newMessage = lastOrNull(messages);
    if (isNewMessageFromVisitor(newMessage)) {
      currentDialog.onMessage(newMessage);
    }
  });

  startDialog(EchoDialog);
};

export default Bot;
