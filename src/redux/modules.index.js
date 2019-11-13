import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import signalR from './modules/signalr';
import message from './modules/sendMessage';

export default history =>
  combineReducers({
    router: connectRouter(history),
    signalR,
    message
  });
