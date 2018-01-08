import { combineReducers } from 'redux';

import wpInfo from './wpInfoReducer';
import message from './messageReducer';

const rootReducer = combineReducers({
  wpInfo,
  message
});

export default rootReducer;
