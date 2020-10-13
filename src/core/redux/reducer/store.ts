import { combineReducers } from "redux";
import userManagerReducer from "./userManager.reducer";
import movieManagerReducer from "./movieManager.reducer";

const rootReducer = combineReducers({
  userManagerReducer,
  movieManagerReducer,
});
export default rootReducer;
