"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.authActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var authSlice = (0, _toolkit.createSlice)({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    login: function login(state) {
      state.isLoggedIn = true;
    },
    logout: function logout(state) {
      state.isLoggedIn = false;
    }
  }
});
var authActions = authSlice.actions;
exports.authActions = authActions;
var store = (0, _toolkit.configureStore)({
  reducer: authSlice.reducer
});
exports.store = store;