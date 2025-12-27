import { AxiosError } from "axios";

import api from "../utils/axiosInstance";

const getFeed = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get(`/user/feed?page=${page}&limit=${limit}`);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const getConnectionRequests = async () => {
  try {
    const response = await api.get('/user/requests/received');
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const getUserConnections = async () => {
  try {
    const response = await api.get('/user/connections');
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { getFeed, getConnectionRequests, getUserConnections };
