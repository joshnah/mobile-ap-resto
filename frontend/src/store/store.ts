import { configureStore, createSlice } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;

const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    user: null,
    restaurants: [],
    products: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setUser, setRestaurants, setProducts } = appStateSlice.actions;

export const store = configureStore({
  reducer: appStateSlice.reducer,
});
