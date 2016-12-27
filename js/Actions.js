import {ACTION_TYPES, SENDERS} from './Constants';

export const addVisitorMessage = message => dispatch => {
  const newMessage = {
    text: message,
    sender: SENDERS.VISITOR
  };
  dispatch({type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
};

export const addBotMessage = message => dispatch => {
  const newMessage = {
    text: message,
    sender: SENDERS.BOT
  };
  dispatch({type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
};
