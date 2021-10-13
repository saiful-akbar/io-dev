import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import globalReducer from "./reducer/globalReducer";
import workReducer from "./reducer/workReducer";
import animateReducer from "./reducer/animateReducer";

export default createStore(
  combineReducers({
    globalReducer,
    workReducer,
    animateReducer,
  }),
  applyMiddleware(thunk)
);
