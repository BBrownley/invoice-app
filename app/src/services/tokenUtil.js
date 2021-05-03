import axios from "axios";

// export let storedToken = null;

export const setStoredToken = token => {
  // storedToken = token;
  axios.interceptors.request.use(req => {
    console.log(`${req.method} ${req.url}`);
    req.headers.Authorization = token;

    return req;
  });
};

// export const headers = {
//   headers: {
//     Authorization: storedToken
//   }
// };
