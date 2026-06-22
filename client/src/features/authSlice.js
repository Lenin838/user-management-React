import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null;

const adminFromStorage = sessionStorage.getItem("admin")
  ? JSON.parse(sessionStorage.getItem("admin"))
  : null;

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: userFromStorage,
    token: sessionStorage.getItem("token") || null,
    admin: adminFromStorage,
    adminToken: sessionStorage.getItem("adminToken") || null,
    count: 0
  },

  reducers: {

    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      if (user.role === "admin") {
        state.admin = user;
        state.adminToken = token;

        sessionStorage.setItem("admin", JSON.stringify(user));
        sessionStorage.setItem("adminToken", token);
      } else {
        state.user = user;
        state.token = token;

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
      }
    },

    logout: (state, action) => {
      const role = action.payload;
      if (role === "admin") {
        state.admin = null;
        state.adminToken = null;
        sessionStorage.removeItem("admin");
        sessionStorage.removeItem("adminToken");
      } else if (role === "user") {
        state.user = null;
        state.token = null;
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        state.user = null;
        state.token = null;
        state.admin = null;
        state.adminToken = null;
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("admin");
        sessionStorage.removeItem("adminToken");
      }
    },
  }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;