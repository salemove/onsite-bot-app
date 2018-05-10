import {SENDERS} from '../Constants';
import OperatorSelectorDialog from './OperatorSelectorDialog';
import EngagementDialog from './EngagementDialog';

const accessToken = "15c1d57dfe314500abac3deecccc04da";
const baseUrl = "https://api.api.ai/v1/query?v=20150910";

const sendMessageToAiBot = message => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function(event) {
      if (req.readyState === 4) {
        if (req.status === 200) {
          const response = JSON.parse(req.responseText);
          resolve(response);
        } else {
          reject(req.responseText);
        }
      }
    };
    req.open('POST', baseUrl, true);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    const data = {query: message.content, lang: 'en', sessionId: 'sm-bot'};
    req.send(JSON.stringify(data));
  });
};

const ApiAiDialog = context => {
  const {startDialogForResult, startDialog, sendMessage} = context;

  const handleEngagement = () => {
    startDialogForResult(OperatorSelectorDialog).then(operator => {
      startDialog(EngagementDialog, {operator});
    }).catch(() => {
      sendMessage('Sorry, no available operators', SENDERS.BOT);
    });
  };

  return {
    onMessage: message => {
      if (message.content.toLowerCase().includes('engagement')) {
        handleEngagement();
      } else {
        sendMessageToAiBot(message).then(response => {
          sendMessage(response.result.fulfillment.speech, SENDERS.BOT);
        });
      }
    }
  };
};

export default ApiAiDialog;
