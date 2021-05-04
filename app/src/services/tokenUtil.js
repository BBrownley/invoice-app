import axios from "axios";

export const setStoredToken = token => {
  axios.interceptors.request.use(req => {
    console.log(`${req.method} ${req.url}`);
    req.headers.Authorization = token;

    return req;
  });
};