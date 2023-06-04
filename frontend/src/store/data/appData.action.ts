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
    return { ...order, total: Number(total.toFixed(2)) };
  });
};

export const fetchData = createAsyncThunk(
  'auth/login',
  async (_, { dispatch, rejectWithValue, getState }) => {
    const state: any = getState();
    axios
      .all([fetchProducts(), fetchRestaurants(), fetchOrders(state.auth.user)])
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
    data: {
      address: string;
      products: string;
      restaurantId: string;
      phone: string;
    },
    { dispatch, getState }
  ) => {
    const { address, products, restaurantId, phone } = data;

    // Requête put avec les infos modifiées
    axios
      .post(
        API_BASE_URL + 'api/orders',
        {
          address,
          products,
          restaurantId,
          phone,
        },
        {
          headers: await authHeader(),
        }
      )
      .then(
        async () => {
          // Affichage d'un message de succès
          dispatch(
            SET_MESSAGE({
              message: 'Commande enregistrée',
              closable: true,
              status: 'success',
              autoClose: true,
            })
          );

          // Vider le panier
          dispatch(CLEAR_CART());
          // On récupère les commandes de l'utilisateur
          const state: any = getState();
          fetchOrders(state.auth.user).then((orders) => {
            const products = state.appData.products;
            dispatch({
              type: SET_ORDERS,
              payload: calculerTotals(orders.data.data, products),
            });
          });
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

export const updateOrderAction = createAsyncThunk(
  'appData/updateOrder',
  async (data: any, { dispatch, getState }) => {
    const { address, products, restaurantId, id, phone, status } = data;

    // Requête put avec les infos modifiées
    axios
      .put(
        API_BASE_URL + 'api/orders/' + id,
        {
          address,
          products,
          restaurantId,
          phone,
          status,
        },
        {
          headers: await authHeader(),
        }
      )
      .then(() => {
        dispatch(
          SET_MESSAGE({
            message: 'Commande mise à jour',
            closable: true,
            status: 'success',
            autoClose: true,
          })
        );
        const state: any = getState();
        fetchOrders(state.auth.user).then((orders) => {
          const products = state.appData.products;
          dispatch({
            type: SET_ORDERS,
            payload: calculerTotals(orders.data.data, products),
          });
        });
      })
      .catch((error) => {
        dispatch(
          SET_MESSAGE({
            message: error.response.data.message,
            closable: true,
            status: 'error',
            autoClose: true,
          })
        );
      });
  }
);

export const addProductAction = createAsyncThunk(
  'appData/addProduct',
  async (data: any, { dispatch }) => {
    const { type, name, price, description, image, navigation } = data;
    axios
      .post(
        API_BASE_URL + 'api/products/',
        {
          type,
          name,
          price,
          description,
          image
        },
        {
          headers: await authHeader(),
        }
      )
      .then(() => {
        dispatch(
          SET_MESSAGE({
            message: 'Produit ajouté',
            closable: true,
            status: 'success',
            autoClose: true,
          })
        );
        fetchProducts().then((products) => {
          dispatch(SET_PRODUCTS(products.data.data));
          navigation.navigate('Home');
        });
      })
      .catch((error) => {
        dispatch(
          SET_MESSAGE({
            message: error.response.data.message,
            closable: true,
            status: 'error',
            autoClose: true,
          })
        );
      });
  }
);

export const updateProductAction = createAsyncThunk(
  'appData/updateProduct',
  async (data: any, { dispatch }) => {
    const { id, name, price, image, description, navigation } = data;
    axios
      .put(
        API_BASE_URL + 'api/products/' + id,
        {
          name,
          price,
          image,
          description,
        },
        {
          headers: await authHeader(),
        }
      )
      .then(() => {
        dispatch(
          SET_MESSAGE({
            message: 'Produit mise à jour',
            closable: true,
            status: 'success',
            autoClose: true,
          })
        );
        fetchProducts().then((products) => {
          dispatch(SET_PRODUCTS(products.data.data));
          navigation.navigate('Home');
        });
      })
      .catch((error) => {
        dispatch(
          SET_MESSAGE({
            message: error.response.data.message,
            closable: true,
            status: 'error',
            autoClose: true,
          })
        );
      });
  }
);

export const deleteProductAction = createAsyncThunk(
  'appData/deleteProduct',
  async (data: any, { dispatch }) => {
    const { id, navigation } = data;
    axios
      .delete(API_BASE_URL + 'api/products/' + id, {
        headers: await authHeader(),
      })
      .then(() => {
        dispatch(
          SET_MESSAGE({
            message: 'Produit supprimé',
            closable: true,
            status: 'success',
            autoClose: true,
          })
        );
        fetchProducts().then((products) => {
          dispatch(SET_PRODUCTS(products.data.data));
          navigation.navigate('Home');
        });
      })
      .catch((error) => {
        dispatch(
          SET_MESSAGE({
            message: error.response.data.message,
            closable: true,
            status: 'error',
            autoClose: true,
          })
        );
      });
  }
);

export const deteleOrderAction = createAsyncThunk(
  'appData/deleteOrder',
  async (data: any, { dispatch, getState }) => {
    const { id } = data;
    axios
      .delete(API_BASE_URL + 'api/orders/' + id, {
        headers: await authHeader(),
      })
      .then(() => {
        dispatch(
          SET_MESSAGE({
            message: 'Commande supprimée',
            closable: true,
            status: 'success',
            autoClose: true,
          })
        );
        const state: any = getState();
        fetchOrders(state.auth.user).then((orders) => {
          const products = state.appData.products;
          dispatch({
            type: SET_ORDERS,
            payload: calculerTotals(orders.data.data, products),
          });
        });
      });
  }
);
