import axios from "axios";

let storedToken = null;

export const setStoredToken = token => {
  storedToken = token;
  axios.defaults.headers.common["Authorization"] = storedToken;
};

export const removeStoredToken = () => {
  storedToken = null;
};

export default storedToken;
