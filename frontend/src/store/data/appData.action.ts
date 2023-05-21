import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API_BASE_URL,
  authHeader,
  fetchOrders,
  fetchProducts,
  fetchRestaurants,
} from '../../services/data.service';
import { CLEAR_CART } from '../cart/cart.reducer';
import { SET_MESSAGE } from '../message/message.reducer';
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

// Action pour l'ajout d'une commande
export const addOrderAction = createAsyncThunk(
  'appData/addOrder',
  async (
    data: { address: string; products: string; restaurantId: string },
    { dispatch }
  ) => {
    const { address, products, restaurantId } = data;

    // Requête put avec les infos modifiées
    axios
      .post(API_BASE_URL + 'api/orders', {
        address,
        products,
        restaurantId
      }, {
        headers: await authHeader()
      })
      .then(
        async () => {
          // Appel au reducer pour vider le panier
          dispatch({ type: CLEAR_CART});

          // Affichage d'un message de succès
          dispatch(
            SET_MESSAGE({
              message: 'Commande enregistrée',
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
