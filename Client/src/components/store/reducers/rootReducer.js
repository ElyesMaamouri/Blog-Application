import authReduce from "./authReducer";
import articleReducer from "../reducers/artilceReducer";
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import commentReducer from "./commentReducer";
const rootReducer = combineReducers({
  auth: authReduce,
  blog: articleReducer,
  category: categoryReducer,
  comment: commentReducer,
});

export default rootReducer;
