import {ACTION_TYPES, SENDERS} from '../Constants';
import {addMessage} from '../Actions';
import EngagementDialog from './EngagementDialog';

const EchoDialog = context => {
  const {store, startDialog} = context;
  return {
    onMessage: message => {
      if (message.content.includes('engagement')) {
        startDialog(EngagementDialog);
      } else {
        store.dispatch(addMessage(message.content, SENDERS.BOT));
      }
    }
  }
};

export default EchoDialog;
