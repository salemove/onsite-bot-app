import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import ChatContainer from './containers/ChatContainer';
import Bot from './Bot';

const store = createStore(reducers, applyMiddleware(thunk));

const createSalemoveBotDiv = () => {
  const div = document.createElement('div');
  div.id = 'salemove-bot';
  div.className = 'salemove-bot';
  document.body.appendChild(div);
  return div;
};

sm.getApi({version: 'v1'}).then(salemove => {
  const bot = new Bot(store, salemove);
  render(
    <Provider store={store}>
      <ChatContainer/>
    </Provider>,
    createSalemoveBotDiv()
  );
});
