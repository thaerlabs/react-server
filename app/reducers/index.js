import { combineReducers } from 'redux';
import counter from './counter';
import random from './random';

const rootReducer = combineReducers({
  counter,
  random
});

export default rootReducer;