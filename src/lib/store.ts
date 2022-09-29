import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import persistState from "redux-localstorage";

import bookmarkReducer from "./bookmark";
import pageReducer from "./page";

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    page: pageReducer,
  },
  enhancers: [persistState()],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
