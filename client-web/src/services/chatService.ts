import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/apiConfig";

const getChat = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/${userId}`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { getChat };
