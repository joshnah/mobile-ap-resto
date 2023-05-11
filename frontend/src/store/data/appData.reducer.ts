import { createSlice } from '@reduxjs/toolkit';
const appDataSlice = createSlice({
  name: 'appData',
  initialState: {
    restaurants: [],
    products: [],
  },
  reducers: {
    SET_RESTAURANTS: (state, action) => {
      state.restaurants = action.payload.data;
      console.log(state.restaurants);
    },
    SET_PRODUCTS: (state, action) => {
      state.products = action.payload.data;
      console.log(state.products);
    },
  },
});

export const { SET_RESTAURANTS, SET_PRODUCTS } = appDataSlice.actions;
export const appDataReducer = appDataSlice.reducer;
