import { combineReducers } from "redux";
import categoriesReducer from "./categories";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import tokenReducer from "./Token";
export default combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  user: userReducer,
  token: tokenReducer,
});
