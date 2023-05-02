import axios from 'axios';
import { setProducts, setRestaurants, store } from '../store/store';

export const API_BASE_URL = 'https://fkh-resto.osc-fr1.scalingo.io/';

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
};
export const fetchRestaurants = async () => {
  await axios
    .get(API_BASE_URL + 'api/restaurants/', {
      headers: authHeader(),
    })
    .then((response) => {
      console.log('fetchRestaurants sucessful');
      store.dispatch(setRestaurants(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchProducts = async () => {
  await axios
    .get(API_BASE_URL + 'api/products/', {
      headers: authHeader(),
    })
    .then((response) => {
      console.log('fetchProducts sucessful');
      store.dispatch(setProducts(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
