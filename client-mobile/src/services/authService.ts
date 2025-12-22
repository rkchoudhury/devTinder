import axios, { AxiosError } from "axios";

import { BASE_URL } from "../utils/apiConfig";

const authenticateUser = async (emailId: string, password: string) => {
  try {
    const data = { emailId, password };
    const response = await axios.post(`${BASE_URL}/login`, data, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, null, {
      withCredentials: true,
    });
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
    console.log('signUpNewUser data:', data, BASE_URL);
    const response = await axios.post(`${BASE_URL}/signup`, data, {
      withCredentials: true,
    });
    console.log('signUpNewUser response:', response);
    return response?.data;
  } catch (error) {
    console.error('Error in signUpNewUser:', error);
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { authenticateUser, logoutUser, signUpNewUser };
