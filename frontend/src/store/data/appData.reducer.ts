import { createSlice } from '@reduxjs/toolkit';
const appDataSlice = createSlice({
  name: 'appData',
  initialState: {
    restaurants: [],
    products: [],
    orders: [],
  },
  reducers: {
    SET_RESTAURANTS: (state, action) => {
      state.restaurants = action.payload;
    },
    SET_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
    SET_ORDERS: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { SET_RESTAURANTS, SET_PRODUCTS, SET_ORDERS } =
  appDataSlice.actions;
export const appDataReducer = appDataSlice.reducer;
