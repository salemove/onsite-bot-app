import {ACTION_TYPES} from './Constants';

export const addVisitorMessage = message => dispatch => {
  const newMessage = {
    text: message,
    sender: 'visitor'
  };
  dispatch({type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
};
