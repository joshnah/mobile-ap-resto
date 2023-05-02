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
        (response) => {
          // save user token in local storage
          if (response.data.user) {
            localStorage.setItem(
              'userToken',
              JSON.stringify(response.data.user.token)
            );
          }

          dispatch({ type: LOGIN_SUCCESS });

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
        { headers: authHeader() }
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
