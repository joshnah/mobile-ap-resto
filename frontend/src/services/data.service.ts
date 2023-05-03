import axios from 'axios';

export const API_BASE_URL = 'https://fkh-resto.osc-fr1.scalingo.io/';

export const authHeader = () => {
  const token = JSON.parse(localStorage.getItem('userToken'));

  if (token) {
    // for Node.js Express back-end
    return { 'x-access-token': token };
  } else {
    return {};
  }
};
export const fetchRestaurants = () => {
  return axios.get(API_BASE_URL + 'api/restaurants/', {
    headers: authHeader(),
  });
};

export const fetchProducts = () => {
  return axios.get(API_BASE_URL + 'api/products/', {
    headers: authHeader(),
  });
};
