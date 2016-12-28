import {SENDERS} from './Constants';
import EchoDialog from './dialogs/EchoDialog';

const Bot = (salemove, sendMessage) => {
  let currentDialog = null;

  const finish = () => {
    startDialog(EchoDialog);
  };

  const startDialog = Dialog => {
    currentDialog = new Dialog({startDialog, salemove, finish, sendMessage});
    if (currentDialog.onStart) currentDialog.onStart();
  };

  const isVisitorMessage = message => message.sender === SENDERS.VISITOR

  const onMessage = message => {
    if (isVisitorMessage(message)) currentDialog.onMessage(message);
  };

  return {
    startDialog,
    onMessage
  }
};

export default Bot;
