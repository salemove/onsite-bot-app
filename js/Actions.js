import {ACTION_TYPES, SENDERS} from './Constants';

export const addVisitorMessage = message => dispatch => {
  const newMessage = {
    content: message,
    sender: SENDERS.VISITOR
  };
  dispatch({type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
};

export const addBotMessage = message => dispatch => {
  const newMessage = {
    content: message,
    sender: SENDERS.BOT
  };
  dispatch({type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
};

export const addOperatorMessage = message => dispatch => {
  const newMessage = {
    content: message,
    sender: SENDERS.OPERATOR
  };
  dispatch({type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
};
