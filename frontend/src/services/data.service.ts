import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API_BASE_URL = 'https://fkh-resto.osc-fr1.scalingo.io/';
export const API_ADDRESS_URL = 'https://api-adresse.data.gouv.fr/search/?q=';

export const authHeader = async () => {
  const user: any = JSON.parse(await AsyncStorage.getItem('user'));

  if (user.token) {
    // for Node.js Express back-end
    return { 'x-access-token': user.token };
  } else {
    return {};
  }
};
export const fetchRestaurants = async () => {
  return axios.get(API_BASE_URL + 'api/restaurants/', {
    headers: await authHeader(),
  });
};

export const fetchProducts = async () => {
  return axios.get(API_BASE_URL + 'api/products/', {
    headers: await authHeader(),
  });
};

export const fetchOrders = async (user: any) => {
  if (user.isAdmin) {
    return axios.get(API_BASE_URL + 'api/orders/', {
      headers: await authHeader(),
    });
  }
  return axios.get(API_BASE_URL + 'api/users/' + user.id + '/orders/', {
    headers: await authHeader(),
  });
};

export const autocompleteAddress = async (address: string) => {
  const addressFormatted = address.split(' ').join('+');
  return axios.get(API_ADDRESS_URL + addressFormatted);
};
