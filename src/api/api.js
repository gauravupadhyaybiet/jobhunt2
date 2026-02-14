import axios from "axios";

const api = axios.create({
  baseURL: "https://jobhunt1-1.onrender.com",
  withCredentials: true,
});

export default api;
