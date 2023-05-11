import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, authHeader } from '../../services/data.service';
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './auth.reducer';

export const loginAction = createAsyncThunk(
  'auth/login',
  async (
    data: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const { email, password } = data;
    axios
      .post(API_BASE_URL + 'login', {
        email,
        password,
      })
      .then(
        async (response) => {
          // save user token in local storage
          if (response.data.user) {
            await AsyncStorage.setItem('userToken', response.data.user.token);
          }

          dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });

          return response.data.user;
        },
        (error) => {
          return rejectWithValue(error.response.message);
        }
      );
  }
);

export const registerAction = createAsyncThunk(
  'auth/login',
  async (
    data: { name: string; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const { name, email, password } = data;
    axios
      .post(
        API_BASE_URL + 'api/users',
        {
          name,
          email,
          password,
        },
        { headers: await authHeader() }
      )
      .then(
        () => {
          dispatch({ type: REGISTER_SUCCESS });
          return Promise.resolve();
        },
        (error) => {
          return rejectWithValue(error.response.message);
        }
      );
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem('userToken');
    dispatch({ type: 'LOGOUT' });
  }
);
