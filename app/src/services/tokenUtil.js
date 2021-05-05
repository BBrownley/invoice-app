import axios from "axios";

let tokenInterceptor;

export const setStoredToken = token => {
  tokenInterceptor = axios.interceptors.request.use(req => {
    req.headers.Authorization = token;

    return req;
  });
  console.log(tokenInterceptor);
};

export const ejectTokenInterceptor = () => {
  console.log(tokenInterceptor);
  axios.interceptors.request.eject(tokenInterceptor);
};
