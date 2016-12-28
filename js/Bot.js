import {SENDERS} from './Constants';
import EchoDialog from './dialogs/EchoDialog';

const Bot = (salemove, sendMessage, getMessages) => {
  let currentDialog = null;

  const startDialog = Dialog => {
    const finish = () => startDialog(EchoDialog);
    currentDialog = new Dialog({startDialog, salemove, finish, sendMessage, getMessages});
    if (currentDialog.onStart) currentDialog.onStart();
  };

  const isVisitorMessage = message => message.sender === SENDERS.VISITOR;

  const onMessage = message => {
    if (isVisitorMessage(message)) currentDialog.onMessage(message);
  };

  return {
    startDialog,
    onMessage
  };
};

export default Bot;
