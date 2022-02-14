import { ReactNode } from "react";

export type UIModal = ReactNode | null;
export type UIDrawer = ReactNode | null;

export interface UIState {
  modal: UIModal;
  drawer: UIDrawer;
}
