import reducers from '../../js/Reducers';
import {ACTION_TYPES} from '../../js/Constants';

describe('Reducers', () => {
  context('when MESSAGE_RECEIVED', () => {
    const newMessage = 'message2';
    const initialState = {
      messages: ['message1']
    };
    let newState;

    beforeEach(() => {
      newState = reducers(initialState, {type: ACTION_TYPES.MESSAGE_RECEIVED, payload: newMessage});
    });

    it('appends new message to messages', () => {
      expect(newState).to.eql({
        messages: [...initialState.messages, newMessage]
      });
    });
  });
});
