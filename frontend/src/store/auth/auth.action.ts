import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../services/data.service';
import { SET_MESSAGE } from '../message/message.reducer';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  UPDATE_PWD_SUCCESS,
  UPDATE_SUCCESS,
} from './auth.reducer';

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
          axios.defaults.headers.common['x-access-token'] =
            response.data.user.token;
          // save user token in local storage
          if (response.data.user) {
            await AsyncStorage.setItem(
              'user',
              JSON.stringify(response.data.user)
            );
          }

          dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
          dispatch(
            SET_MESSAGE({
              message: 'Bienvenue',
              closable: true,
              status: 'success',
              autoClose: true,
            })
          );
          return response.data.user;
        },
        (error) => {
          dispatch(
            SET_MESSAGE({
              message: error.response.data.message,
              closable: true,
              status: 'error',
              autoClose: true,
            })
          );
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
    const res = axios
      .post(API_BASE_URL + 'api/users', {
        name,
        email,
        password,
      })
      .then(
        (response) => {
          console.log('Inscription Terminée');
          dispatch({ type: REGISTER_SUCCESS });
          dispatch(
            SET_MESSAGE({
              message: 'Compte correctement crée',
              closable: true,
              status: 'success',
              autoClose: true,
            })
          );
        },
        (error) => {
          dispatch(
            SET_MESSAGE({
              message: error.response.data.message,
              closable: true,
              status: 'error',
              autoClose: true,
            })
          );
        }
      );
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem('user');
    dispatch({ type: LOGOUT });
  }
);

// Action pour la modification des infos suivantes : mail, phone, address
export const modifyInfosAction = createAsyncThunk(
  'auth/modify',
  async (
    data: { name: string; phone: string; address: string },
    { dispatch, rejectWithValue }
  ) => {
    const { name, phone, address } = data;

    // Requête put avec les infos modifiées
    axios
      .put(API_BASE_URL + 'api/users', {
        name,
        phone,
        address,
      })
      .then(
        async (response) => {
          // Appel au reducer pour changer le user dans le state
          dispatch({ type: UPDATE_SUCCESS, payload: response.data.user });

          // Affichage d'un message de succès
          dispatch(
            SET_MESSAGE({
              message: 'Informations mises à jour',
              closable: true,
              status: 'success',
              autoClose: true,
            })
          );
        },
        (error) => {
          dispatch(
            SET_MESSAGE({
              message: error.response.data.message,
              closable: true,
              status: 'error',
              autoClose: true,
            })
          );
        }
      );
  }
);

export const modifyPasswordAction = createAsyncThunk(
  'auth/modify',
  async (data: { password: string }, { dispatch, rejectWithValue }) => {
    const { password } = data;
    axios
      .put(API_BASE_URL + 'api/users', {
        password,
      })
      .then(
        async (response) => {
          // Appel au reducer pour changer le user dans le state
          dispatch({ type: UPDATE_PWD_SUCCESS, payload: response.data.user });

          // Affichage d'un message de succès
          dispatch(
            SET_MESSAGE({
              message: 'Mot de passe mis à jour',
              closable: true,
              status: 'success',
              autoClose: true,
            })
          );

          return response.data.user;
        },
        (error) => {
          dispatch(
            SET_MESSAGE({
              message:
                'Le mot de passe doit contenir au minimum 6 caractères avec une lettre et un chiffre',
              closable: true,
              status: 'error',
              autoClose: true,
            })
          );
          return rejectWithValue(error.response.message);
        }
      );
  }
);
