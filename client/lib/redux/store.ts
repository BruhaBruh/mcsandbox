import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import UIReducer from "./ui/reducer";
import UserReducer from "./user/reducer";

export const store = configureStore({
  reducer: {
    // This is where we add reducers.
    // Since we don't have any yet, leave this empty
    ui: UIReducer,
    user: UserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
