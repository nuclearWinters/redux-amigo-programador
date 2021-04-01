import { combineReducers } from "redux";
import { user } from "./UserDuck";
import { comments } from "./CommentDuck";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { createStore } from "redux";

export const rootReducer = combineReducers({
  user,
  comments,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
