import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {addMessage} from '../../js/Actions';
import {SENDERS} from '../../js/Constants';

describe('addMessage', () => {
  let store;
  const message = 'Hello';

  beforeEach(() => {
    store = configureMockStore([thunk])({});
    store.dispatch(addMessage(message, SENDERS.VISITOR));
  });

  it('creates MESSAGE_RECEIVED action with message and sender', () => {
    expect(store.getActions()).to.contain({
      type: 'MESSAGE_RECEIVED',
      payload: {
        content: message,
        sender: SENDERS.VISITOR
      }
    });
  });
});
