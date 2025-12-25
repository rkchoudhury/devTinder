import { AxiosError } from "axios";

import api from "../utils/axiosInstance";

// Used in Feed Page
const sendRequest = async (status: string, userId: string) => {
  try {
    const response = await api.post(`/request/send/${status}/${userId}`, null);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

// Used in Connection Request Page
const reviewRequest = async (status: string, requestId: string) => {
  try {
    const response = await api.post(
      `/request/review/${status}/${requestId}`,
      null
    );
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { sendRequest, reviewRequest };
