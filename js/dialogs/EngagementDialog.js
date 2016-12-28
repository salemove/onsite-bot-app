import {SENDERS} from '../Constants';
import SmChat from '../SmChat';

const EngagementDialog = context => {
  const {salemove, sendMessage, finish} = context;
  const RESPONSES = {
    OPERATOR_NOT_AVAILABLE: 'Operator is not available',
    NO_OPERATORS_AVAILABLE: 'Sorry, currenly there are no available operators',
    ENGAGEMENT_STARTED: 'Engagement started',
    ENGAGEMENT_ENDED: 'Engagement ended',
    WAITING_FOR_OPERATOR: 'Waiting for an operator'
  };
  let smChat;

  const proxyOperatorMessages = chat => {
    const isNewOperatorMessage = messages =>
      messages.length > 0 && messages[0].sender === SENDERS.OPERATOR;

    chat.addEventListener(chat.EVENTS.MESSAGES, messages => {
      if (isNewOperatorMessage(messages)) sendMessage(messages[0].content, SENDERS.OPERATOR);
    });
  };

  const finishDialog = () => {
    sendMessage(RESPONSES.ENGAGEMENT_ENDED, SENDERS.BOT);
    finish();
  };

  const setupEngagement = engagement => {
    sendMessage(RESPONSES.ENGAGEMENT_STARTED, SENDERS.BOT);
    proxyOperatorMessages(engagement.chat);
    engagement.addEventListener(engagement.EVENTS.END, finishDialog);
    smChat = new SmChat(engagement.chat);
  };

  const processError = error => {
    if (error.cause === salemove.ERRORS.OPERATOR_DECLINED) {
      sendMessage(RESPONSES.OPERATOR_NOT_AVAILABLE, SENDERS.BOT);
    } else {
      sendMessage(RESPONSES.NO_OPERATORS_AVAILABLE, SENDERS.BOT);
    }
    finish();
  };

  return {
    RESPONSES,
    onStart: () => {
      const engagementRequest = salemove.requestEngagement('text');
      sendMessage(RESPONSES.WAITING_FOR_OPERATOR, SENDERS.BOT);
      engagementRequest.engagementPromise
        .then(setupEngagement)
        .catch(processError);
    },
    onMessage: message => {
      if (smChat) smChat.sendMessage(message.content);
    }
  };
};

export default EngagementDialog;
