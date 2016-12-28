import {addMessage} from './Actions';

const ReduxBot = (Bot, store, salemove) => {
  let prevMessage = null;
  const sendMessage = (message, sender) => store.dispatch(addMessage(message, sender))
  const bot = new Bot(salemove, sendMessage);
  const lastOrNull = items => items.length > 0 ? items[items.length - 1] : null;

  store.subscribe(() => {
    const messages = store.getState().messages;
    const newMessage = lastOrNull(messages);
    if (newMessage && prevMessage != newMessage) {
      prevMessage = newMessage;
      bot.onMessage(newMessage);
    }
  });

  return bot;
};

export default ReduxBot;
