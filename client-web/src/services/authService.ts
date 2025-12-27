import { AxiosError } from "axios";

import api from "../utils/axiosInstance";

const authenticateUser = async (emailId: string, password: string) => {
  try {
    const data = { emailId, password };
    const response = await api.post(`/login`, data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const logoutUser = async () => {
  try {
    const response = await api.post("/logout", null);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const signUpNewUser = async (data: {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
}) => {
  try {
    const response = await api.post("/signup", data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { authenticateUser, logoutUser, signUpNewUser };
