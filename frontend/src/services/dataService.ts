import axios from "axios";
import { setProducts, setRestaurants, setUser, store } from "../store/store";

const API_BASE_URL = "https://fkh-resto.osc-fr1.scalingo.io/";

export const fetchRestaurants = async (token: string) => {
  await axios
    .get(API_BASE_URL + "api/restaurants/", {
      headers: {
        "x-access-token": token,
      },
    })
    .then((response) => {
      console.log("fetchRestaurants sucessful");
      store.dispatch(setRestaurants(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchProducts = async (token: string) => {
  await axios
    .get(API_BASE_URL + "api/products/", {
      headers: {
        "x-access-token": token,
      },
    })
    .then((response) => {
      console.log("fetchProducts sucessful");
      store.dispatch(setProducts(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

// login and fetch restaurants and products
export const login = async (email: string, password: string): Promise<any> => {
  return axios
    .post(API_BASE_URL + "login", {
      email,
      password,
    })
    .then(async (response) => {
      console.log("login sucessfull");
      store.dispatch(
        setUser({ ...response.data.user, token: response.data.token })
      );
      await fetchRestaurants(response.data.token);
      await fetchProducts(response.data.token);
    });
};
