import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, authHeader } from '../../services/data.service';
import { SET_MESSAGE } from '../message/message.reducer';
import { LOGIN_SUCCESS, MODIFY, REGISTER_SUCCESS } from './auth.reducer';

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
          axios.defaults.headers.common['x-access-token'] = response.data.user.token;
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

export const modifyInfosAction = createAsyncThunk(
  'auth/modify',
  async (
    data: { name: string; phone: string; address: string },
    { dispatch, rejectWithValue }
  ) => {
    const { name, phone, address } = data;
    console.log(data);
    axios
      .put(API_BASE_URL + 'api/users', {
        name,
        phone,
        address
      })
      .then(
        async (response) => {

          dispatch({ type: MODIFY });

          return response.data.user;
        },
        (error) => {
          return rejectWithValue(error.response.message);
        }
      );
  }
);

export const modifyPasswordAction = createAsyncThunk(
  'auth/modify',
  async (
    data: { password: string },
    { dispatch, rejectWithValue }
  ) => {
    const { password } = data;
    console.log(data);
    axios
      .put(API_BASE_URL + 'api/users', {
        password
      })
      .then(
        async (response) => {

          dispatch({ type: MODIFY });

          dispatch(
            SET_MESSAGE({
              message: 'Mot de passe mis à jour',
              closable: true,
              status: 'success',
              autoClose: true,
            })
          )

          return response.data.user;
        },
        (error) => {
          dispatch(
            SET_MESSAGE({
              message: 'Le mot de passe doit contenir au minimum 6 caractères avec une lettre et un chiffre',
              closable: true,
              status: 'error',
              autoClose: true,
            })
          )
          return rejectWithValue(error.response.message);
        }
      );
  }
);
