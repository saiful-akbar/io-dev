import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import globalReducer from './reducer/globalReducer';

export default createStore(
  combineReducers({
    globalReducer,
  }),
  applyMiddleware(thunk),
);
