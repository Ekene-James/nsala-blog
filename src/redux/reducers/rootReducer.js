import { combineReducers } from "redux";

import blogReducer from "./blogReducers/blogreducer";

const rootReducer = combineReducers({
  blog: blogReducer
});
export default rootReducer;
