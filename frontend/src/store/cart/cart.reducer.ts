import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      const itemInCarte = state.cartItems.find(
        (item) => item.productId === action.payload.id
      );
      if (itemInCarte) {
        itemInCarte.quantity = action.payload.quantity;
        itemInCarte.productId = action.payload.id;
      } else {
        state.cartItems.push({
          productId: action.payload.id,
          quantity: action.payload.quantity,
        });
      }
    },
    REMOVE_FROM_CART: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.id
      );
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
    },
    DECREMENT_CART: (state, action) => {
      const itemInCarte = state.cartItems.find(
        (item) => item.productId === action.payload.id
      );
      if (itemInCarte.quantity > 1) {
        itemInCarte.quantity = itemInCarte.quantity - 1;
      }
    },
    INCREMENT_CART: (state, action) => {
      const itemInCarte = state.cartItems.find(
        (item) => item.productId === action.payload.id
      );
      itemInCarte.quantity = itemInCarte.quantity + 1;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  INCREMENT_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  DECREMENT_CART,
} = cartSlice.actions;
