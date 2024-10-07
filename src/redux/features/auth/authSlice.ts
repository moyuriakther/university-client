import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TInitialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      console.log(state)
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    userLoggedOut: (state) => {
      
      state.user = null;
      state.token = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
