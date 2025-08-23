import axios from "axios";
import { BASE_URL } from "../utils/apiConfig";

const authenticateUser = async (emailId: string, password: string) => {
  try {
    const data = { emailId, password };
    const response = await axios.post(`${BASE_URL}/login`, data);
    return response?.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response?.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export { authenticateUser, logoutUser };
