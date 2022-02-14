import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserStatus } from "../../../generated/graphql";
import { UserState } from "./types";

export const initialState: UserState = {
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserFromGraphQLModel: (
      state,
      action: PayloadAction<User | undefined>
    ) => {
      state.isLoggedIn = true;
      state.discordId = action.payload?.discordId ?? undefined;
      state.nickname = action.payload?.nickname ?? undefined;
      state.tag = action.payload?.tag ?? undefined;
      state.avatar = action.payload?.avatar ?? undefined;
      state.rating = action.payload?.rating ?? undefined;
      state.status = action.payload?.status ?? undefined;
      state.money = action.payload?.money ?? undefined;
      state.frozenMoney = action.payload?.frozenMoney ?? undefined;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.discordId = undefined;
      state.nickname = undefined;
      state.tag = undefined;
      state.avatar = undefined;
      state.rating = undefined;
      state.status = undefined;
      state.money = undefined;
      state.frozenMoney = undefined;
    },
    setDiscordId: (state, action: PayloadAction<string | undefined>) => {
      state.discordId = action.payload;
    },
    setNickname: (state, action: PayloadAction<string | undefined>) => {
      state.nickname = action.payload;
    },
    setTag: (state, action: PayloadAction<string | undefined>) => {
      state.tag = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.avatar = action.payload;
    },
    setRating: (state, action: PayloadAction<number | undefined>) => {
      state.rating = action.payload;
    },
    setStatus: (state, action: PayloadAction<UserStatus | undefined>) => {
      state.status = action.payload;
    },
    setMoney: (state, action: PayloadAction<number | undefined>) => {
      state.money = action.payload;
    },
    setFrozenMoney: (state, action: PayloadAction<number | undefined>) => {
      state.frozenMoney = action.payload;
    },
  },
});

export const {
  loadUserFromGraphQLModel,
  clearUser,
  setDiscordId,
  setNickname,
  setTag,
  setAvatar,
  setRating,
  setStatus,
  setMoney,
  setFrozenMoney,
} = userSlice.actions;

const UserReducer = userSlice.reducer;

export default UserReducer;
