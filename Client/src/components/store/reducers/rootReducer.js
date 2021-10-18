import authReduce from "./authReducer";
import articleReducer from "../reducers/artilceReducer";
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  auth: authReduce,
  blog: articleReducer,
  category: categoryReducer,
});

export default rootReducer;
