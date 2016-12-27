import {ACTION_TYPES} from './Constants';

const initialState = {
  messages: []
};

const reducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.MESSAGE_RECEIVED:
      return {...state, messages: [...state.messages, payload]};
    default:
      return state;
  }
  return state;
};

export default reducers;
