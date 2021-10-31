import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import globalReducer from "./reducer/globalReducer";
import projectReducer from "./reducer/projectReducer";

export default createStore(
  combineReducers({
    globalReducer,
    projectReducer,
  }),
  applyMiddleware(thunk)
);
