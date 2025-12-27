import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // web support
  headers: {
    "X-Client-Type": "web",
  },
});

export default api;
