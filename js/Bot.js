import {SENDERS} from './Constants';
import R from 'ramda';
import createLogger from './Logger';

const logger = createLogger('Bot');

const Bot = (salemove, sendMessage, getMessages) => {
  const dialogs = [];
  const goBack = () => {
    dialogs.pop();
  };

  const startDialogForResult = (Dialog, params = {}) => {
    logger.info(`Starting ${Dialog.name} for result`);
    return new Promise((resolve, reject) => {
      const finishWithResult = result => {
        logger.info(`${Dialog.name} finished with result`, result);
        goBack();
        resolve(result);
      };
      const finish = error => {
        logger.info(`${Dialog.name} finished without result`);
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
    logger.info(`Starting ${Dialog.name}`);
    const finish = () => {
      logger.info(`${Dialog.name} finished`);
      goBack();
    };
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
