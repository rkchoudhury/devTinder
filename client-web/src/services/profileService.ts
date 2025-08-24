import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";

const getUserProfile = async () => {
  const response = await axios.get(`${BASE_URL}/profile/view`, {
    withCredentials: true,
  });
  return response?.data;
};

export { getUserProfile };
