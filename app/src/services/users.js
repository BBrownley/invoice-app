import axios from "axios";
import { storedToken, setStoredToken } from "./tokenUtil";

const baseUrl = process.env.baseURL || "http://localhost:5000";

const register = credentials => {
  axios.post(`${baseUrl}/users`, credentials);
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
    window.localStorage.setItem("loggedUser", token.data);
  } catch (exception) {
    console.log(exception);
  }
};

const usersService = {
  register,
  login
};

export default usersService;
