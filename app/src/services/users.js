import axios from "axios";
const baseUrl = process.env.baseURL || "http://localhost:5000";

const register = credentials => {
  axios.post(`${baseUrl}/users`, credentials);
};

const usersService = {
  register
};

export default usersService;
