import axios, { AxiosError } from "axios";

import { BASE_URL } from "../utils/apiConfig";

const getFeed = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/feed?page=${page}&limit=${limit}`,
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

const getConnectionRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/requests/received`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { getFeed, getConnectionRequests };
