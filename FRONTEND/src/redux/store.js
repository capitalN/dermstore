import {
  legacy_createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { CartReducer } from "./cart/reducer";
import { ProductReducer } from "./products/reducer";
import { UserReducer } from "./user/reducer";

const root_reducer = combineReducers({
  UserReducer,
  ProductReducer,
  CartReducer,
});

//   const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const composeEnhancers = compose;

export const store = legacy_createStore(
  root_reducer,
  composeEnhancers(applyMiddleware(thunk))
);
