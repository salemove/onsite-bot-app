import {ACTION_TYPES} from './Constants';
import R from 'ramda';

const initialState = {
  messages: []
};

const reducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_TYPES.MESSAGE_RECEIVED:
      return R.merge(state, {messages: [...state.messages, payload]});
    default:
      return state;
  }
  return state;
};

export default reducers;
