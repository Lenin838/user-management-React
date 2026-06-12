import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: userFromStorage,
    token: localStorage.getItem("token") || null,
    count: 0
  },

  reducers: {

    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    changeName:(state,action)=>{
      state.user.name = action.payload;
    }
  }
});

export const { loginSuccess, logout,changeName } = authSlice.actions;

export default authSlice.reducer;