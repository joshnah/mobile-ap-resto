import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fetchOrders,
  fetchProducts,
  fetchRestaurants,
} from '../../services/data.service';
import { SET_ORDERS, SET_PRODUCTS, SET_RESTAURANTS } from './appData.reducer';
const calculerTotals = (orders, products) => {
  return orders.map((order) => {
    let total = 0;
    order.products.forEach((product) => {
      const foundProduct = products.find((p) => p.id === product.productId);
      if (foundProduct) total += foundProduct.price * product.quantity;
    });
    return { ...order, total };
  });
};
export const fetchData = createAsyncThunk(
  'auth/login',
  async (_, { dispatch, rejectWithValue, getState }) => {
    const state: any = getState();
    axios
      .all([
        fetchProducts(),
        fetchRestaurants(),
        fetchOrders(state.auth.user.id),
      ])
      .then(
        axios.spread((products, restaurants, orders) => {
          dispatch({ type: SET_RESTAURANTS, payload: restaurants.data.data });
          dispatch({ type: SET_PRODUCTS, payload: products.data.data });
          dispatch({
            type: SET_ORDERS,
            payload: calculerTotals(orders.data.data, products.data.data),
          });
        }),
        (error) => {
          return rejectWithValue(error.response.message);
        }
      );
  }
);
