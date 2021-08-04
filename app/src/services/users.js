import axios from "axios";
import { setStoredToken } from "./tokenUtil";
import dotenv from "dotenv";

dotenv.config({ path: "../../../config.env" });

const baseUrl = process.env.BASE_URL || "http://localhost:5000";

const register = async credentials => {
  try {
    await axios.post(`${baseUrl}/users`, credentials);
    return;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const login = async (username, password) => {
  const user = {
    username,
    password
  };

  try {
    const req = await axios.post(`${baseUrl}/users/login`, user);

    const token = req.data.userToken;
    setStoredToken(token);
    window.localStorage.setItem("loggedUser", token);
    return;
  } catch (error) {
    return error.response.data;
  }
};

const getDarkModePref = async () => {
  try {
    const req = await axios.get(`${baseUrl}/users/darkmode`);

    return req.data;
  } catch (error) {
    return error.response.data;
  }
};

const toggleDarkModePref = async () => {
  try {
    const req = await axios.put(`${baseUrl}/users/darkmode`);

    console.log(req);
  } catch (error) {
    return error.response.data;
  }
};

const usersService = {
  register,
  login,
  getDarkModePref,
  toggleDarkModePref
};

export default usersService;
