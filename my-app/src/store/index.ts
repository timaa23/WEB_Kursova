import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { productReducer } from "../pages/product/store/productReducer";
import { userReducer } from "../pages/auth/store/authReducer";

export const rootReducer = combineReducers({
  product: productReducer,
  account: userReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
