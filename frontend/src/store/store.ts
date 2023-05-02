import {
  AnyAction,
  ThunkDispatch,
  configureStore,
  createSlice,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './auth/auth.reducer';

export type RootState = ReturnType<typeof store.getState>;

const appStateSlice = createSlice({
  name: 'appState',
  initialState: {
    restaurants: [],
    products: [],
  },
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurants, setProducts } = appStateSlice.actions;

export const store = configureStore({
  reducer: { app: appStateSlice.reducer, auth: authReducer },
});

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
