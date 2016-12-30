import {SENDERS} from '../Constants';

const StopEngagementDialog = context => {
  const {sendMessage, finishWithResult} = context;
  const RESPONSES = {
    STOP_ENGAGEMENT_CONFIRMATION: 'Are you sure you want to end engagement?',
    SPECIALIZED_QUESTION: 'Please, answer "yes" or "no"'
  };
  const ANSWERS = {
    POSITIVE: ['yes'],
    NEGATIVE: ['no']
  };

  const checkAnswer = (message, answers) =>
    answers.find(answer => message.content.toLowerCase().includes(answer));

  return {
    onStart: () => {
      sendMessage(RESPONSES.STOP_ENGAGEMENT_CONFIRMATION, SENDERS.BOT);
    },
    onMessage: message => {
      if (checkAnswer(message, ANSWERS.POSITIVE)) {
        finishWithResult(true);
      } else if (checkAnswer(message, ANSWERS.NEGATIVE)) {
        finishWithResult(false);
      } else {
        sendMessage(RESPONSES.SPECIALIZED_QUESTION, SENDERS.BOT);
      }
    }
  };
};

export default StopEngagementDialog;
