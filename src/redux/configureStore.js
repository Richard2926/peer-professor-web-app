import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import RootReducer from "redux/reducers/RootReducer";
import { verifyAuth } from "redux/actions/auth";

export default function configureStore(persistedState) {
  const store = createStore(
    RootReducer,
    persistedState,
    applyMiddleware(thunkMiddleware)
  );
  store.dispatch(verifyAuth);
  return store;
}
