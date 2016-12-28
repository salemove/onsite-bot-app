import {ACTION_TYPES, SENDERS} from './Constants';

export const addMessage = (message, sender) => dispatch => {
  const newMessage = {content: message, sender};
  dispatch({type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
};
