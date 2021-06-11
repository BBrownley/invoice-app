import axios from "axios";
import { setStoredToken } from "./tokenUtil";

const baseUrl = process.env.baseURL || "http://localhost:5000";

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
    const token = req.data;
    setStoredToken(token);
    window.localStorage.setItem("loggedUser", token);
    return;
  } catch (error) {
    return error.response.data;
  }
};

const usersService = {
  register,
  login
};

export default usersService;
