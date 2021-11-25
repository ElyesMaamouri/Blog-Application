import authReduce from "./authReducer";
import articleReducer from "../reducers/artilceReducer";
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import commentReducer from "./commentReducer";
import clientReducer from "./clientReducer";
const rootReducer = combineReducers({
  auth: authReduce,
  blog: articleReducer,
  category: categoryReducer,
  comment: commentReducer,
  client: clientReducer,
});

export default rootReducer;
