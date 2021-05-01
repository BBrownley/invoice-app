import axios from "axios";
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
    const token = await axios.post(`${baseUrl}/users/login`, user);
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
