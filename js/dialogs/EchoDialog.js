import {SENDERS} from '../Constants';
import OperatorSelectorDialog from './OperatorSelectorDialog';
import EngagementDialog from './EngagementDialog';

const EchoDialog = context => {
  const {startDialogForResult, startDialog, sendMessage} = context;
  return {
    onMessage: message => {
      if (message.content.includes('engagement')) {
        startDialogForResult(OperatorSelectorDialog).then(operator => {
          startDialog(EngagementDialog, {operator});
        }).catch(() => {
          sendMessage('Sorry, no available operators', SENDERS.BOT);
        });
      } else {
        sendMessage(message.content, SENDERS.BOT);
      }
    }
  };
};

export default EchoDialog;
