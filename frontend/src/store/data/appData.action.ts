import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchProducts, fetchRestaurants } from '../../services/data.service';
import { SET_PRODUCTS, SET_RESTAURANTS } from './appData.reducer';

export const fetchData = createAsyncThunk(
  'auth/login',
  async (_, { dispatch, rejectWithValue }) => {
    axios.all([fetchProducts(), fetchRestaurants()]).then(
      axios.spread((products, restaurants) => {
        dispatch({ type: SET_RESTAURANTS, payload: restaurants.data });
        dispatch({ type: SET_PRODUCTS, payload: products.data });
      }),
      (error) => {
        return rejectWithValue(error.response.message);
      }
    );
  }
);
