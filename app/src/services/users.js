import axios from "axios";
import {  setStoredToken } from "./tokenUtil";

const baseUrl = process.env.baseURL || "http://localhost:5000";

const register = credentials => {
  axios.post(`${baseUrl}/users`, credentials);
};

const login = async (username, password) => {
  const user = {
    username,
    password
  };

  return new Promise(async (resolve, reject) => {
    try {
      const req = await axios.post(`${baseUrl}/users/login`, user);
      const token = req.data;
      setStoredToken(token);
      window.localStorage.setItem("loggedUser", token);
      resolve();
    } catch (exception) {
      console.log(exception);
      reject();
    }
  })

  
};

const usersService = {
  register,
  login
};

export default usersService;
