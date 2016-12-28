import {ACTION_TYPES, SENDERS} from '../Constants';
import {addMessage} from '../Actions';
import EngagementDialog from './EngagementDialog';

const EchoDialog = context => {
  const {startDialog, sendMessage} = context;
  return {
    onMessage: message => {
      if (message.content.includes('engagement')) {
        startDialog(EngagementDialog);
      } else {
        sendMessage(message.content, SENDERS.BOT);
      }
    }
  }
};

export default EchoDialog;
