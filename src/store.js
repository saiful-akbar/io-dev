import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import globalReducer from "./reducer/globalReducer";
import workReducer from "./reducer/workReducer";

export default createStore(
  combineReducers({
    globalReducer,
    workReducer,
  }),
  applyMiddleware(thunk)
);
