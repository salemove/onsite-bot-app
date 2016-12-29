import {SENDERS} from './Constants';
import R from 'ramda';

const Bot = (salemove, sendMessage, getMessages) => {
  const dialogs = [];
  const goBack = () => {
    dialogs.pop();
  };

  const startDialogForResult = (Dialog, params = {}) => {
    return new Promise((resolve, reject) => {
      const finishWithResult = result => {
        goBack();
        resolve(result);
      };
      const finish = error => {
        goBack();
        reject(error);
      };
      const context = {salemove, finish, finishWithResult, sendMessage, getMessages};
      const dialog = new Dialog(context, params);
      dialogs.push(dialog);
      if (dialog.onStart) dialog.onStart();
    });
  };

  const startDialog = (Dialog, params = {}) => {
    const finish = goBack;
    const context = {startDialog, startDialogForResult, salemove, finish, sendMessage, getMessages};
    const dialog = new Dialog(context, params);
    dialogs.push(dialog);
    if (dialog.onStart) dialog.onStart();
  };

  const isVisitorMessage = message => message.sender === SENDERS.VISITOR;

  const onMessage = message => {
    if (isVisitorMessage(message)) R.last(dialogs).onMessage(message);
  };

  return {
    startDialogForResult,
    startDialog,
    onMessage
  };
};

export default Bot;
