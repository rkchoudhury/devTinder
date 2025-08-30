import axios, { AxiosError } from "axios";

import { BASE_URL } from "../utils/apiConfig";

// Used in Feed Page
const sendRequest = async (status: string, userId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/request/send/${status}/${userId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

// Used in Connection Request Page
const reviewRequest = async (status: string, requestId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/request/review/${status}/${requestId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { sendRequest, reviewRequest };
