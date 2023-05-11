import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API_BASE_URL = 'https://fkh-resto.osc-fr1.scalingo.io/';

export const authHeader = async () => {
  const token = await AsyncStorage.getItem('userToken');

  if (token) {
    // for Node.js Express back-end
    return { 'x-access-token': token };
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
