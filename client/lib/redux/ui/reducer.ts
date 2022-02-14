import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIDrawer, UIModal, UIState } from "./types";

export const initialState: UIState = {
  modal: null,
  drawer: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<UIModal>) => {
      state.modal = action.payload;
    },
    setDrawer: (state, action: PayloadAction<UIDrawer>) => {
      state.drawer = action.payload;
    },
  },
});

export const { setModal, setDrawer } = uiSlice.actions;

const UIReducer = uiSlice.reducer;

export default UIReducer;
