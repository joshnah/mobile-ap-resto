import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
const user = AsyncStorage.getItem('user');

const initialState = user
  ? { isLoggedIn: true, user, hasChanged: false, pwdChanged: false }
  : { isLoggedIn: false, user: null, hasChanged: false, pwdChanged: false };
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    REGISTER_SUCCESS: (state) => {
      state.isLoggedIn = false;
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
    UPDATE_FINISHED : (state) => {
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
    }
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
  UPDATE_PWD_SUCCESS
} = authSlice.actions;

export const authReducer = authSlice.reducer;
