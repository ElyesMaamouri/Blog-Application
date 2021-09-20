import authReduce from "./authReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReduce,
});

export default rootReducer;
