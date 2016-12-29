import {SENDERS} from '../Constants';
import SmChat from '../SmChat';
import { Subject } from 'rxjs/Subject';

const EngagementDialog = (context, params) => {
  const {salemove, sendMessage, finish} = context;
  const {operator} = params;
  const STOP_MESSAGE = 'stop';
  const RESPONSES = {
    OPERATOR_NOT_AVAILABLE: 'Operator is not available',
    NO_OPERATORS_AVAILABLE: 'Sorry, currenly there are no available operators',
    ENGAGEMENT_STARTED: 'Engagement started',
    ENGAGEMENT_ENDED: 'Engagement ended',
    WAITING_FOR_OPERATOR: 'Waiting for an operator'
  };
  const messages = new Subject();

  const proxyOperatorMessages = chat => {
    const isNewOperatorMessage = messages =>
      messages.length > 0 && messages[0].sender === SENDERS.OPERATOR;

    chat.addEventListener(chat.EVENTS.MESSAGES, messages => {
      if (isNewOperatorMessage(messages)) sendMessage(messages[0].content, SENDERS.OPERATOR);
    });
  };

  const finishDialog = subscription => () => {
    subscription.unsubscribe();
    sendMessage(RESPONSES.ENGAGEMENT_ENDED, SENDERS.BOT);
    finish();
  };

  const processMessage = (engagement, chat) => message => {
    if (message.content === STOP_MESSAGE) {
      engagement.end();
    } else {
      chat.sendMessage(message.content);
    }
  };

  const setupEngagement = engagement => {
    sendMessage(RESPONSES.ENGAGEMENT_STARTED, SENDERS.BOT);
    proxyOperatorMessages(engagement.chat);
    const smChat = new SmChat(engagement.chat);
    const subscription = messages.subscribe(processMessage(engagement, smChat));
    engagement.addEventListener(engagement.EVENTS.END, finishDialog(subscription));
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
      const options = operator ? {operatorId: operator.id} : null;
      const engagementRequest = salemove.requestEngagement('text', options);
      sendMessage(RESPONSES.WAITING_FOR_OPERATOR, SENDERS.BOT);
      engagementRequest.engagementPromise
        .then(setupEngagement)
        .catch(processError);
    },
    onMessage: ::messages.next
  };
};

export default EngagementDialog;
