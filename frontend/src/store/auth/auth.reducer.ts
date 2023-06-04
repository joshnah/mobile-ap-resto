import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  hasChanged: false,
  pwdChanged: false,
  registered: false,
  newAddress: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    REGISTER_SUCCESS: (state) => {
      state.isLoggedIn = false;
      state.registered = true;
    },
    REGISTER_FAIL: (state) => {
      state.isLoggedIn = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    LOGIN_FAIL: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    LOGOUT: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    UPDATE: (state) => {
      state.hasChanged = true;
    },
    UPDATE_FINISHED: (state) => {
      state.hasChanged = false;
    },
    UPDATE_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.hasChanged = false;
    },
    UPDATE_PWD: (state) => {
      state.pwdChanged = true;
    },
    UPDATE_PWD_FINISHED: (state) => {
      state.pwdChanged = false;
    },
    UPDATE_PWD_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.pwdChanged = false;
    },
    SET_NEW_ADDRESS: (state, action) => {
      state.newAddress = action.payload;
      state.hasChanged = true;
    },
  },
});

export const {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE,
  UPDATE_FINISHED,
  UPDATE_SUCCESS,
  UPDATE_PWD,
  UPDATE_PWD_FINISHED,
  UPDATE_PWD_SUCCESS,
  SET_NEW_ADDRESS,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
