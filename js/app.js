import React from 'react';
import {render} from 'react-dom';
import Chat from './components/chat/Chat';

const createSalemoveBotDiv = () => {
  const div = document.createElement('div');
  div.id = 'salemove-bot';
  div.className = 'salemove-bot';
  document.body.appendChild(div);
  return div;
};

sm.getApi({version: 'v1'}).then(salemove => {
  render(<Chat/>, createSalemoveBotDiv());
});
