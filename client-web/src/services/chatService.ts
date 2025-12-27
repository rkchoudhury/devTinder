import { AxiosError } from "axios";
import api from "../utils/axiosInstance";

const getChat = async (userId: string) => {
  try {
    const response = await api.get(`/chat/${userId}`);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { getChat };
