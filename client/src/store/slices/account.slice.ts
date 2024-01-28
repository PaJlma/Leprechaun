import { IAccount } from "@/types/interfaces/account.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAccount = {};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IAccount>) {
      return action.payload;     
    },

    logout(state) {
      return initialState;
    }
  },
});
