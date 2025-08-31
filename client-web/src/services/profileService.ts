import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/apiConfig";
import type { IUser } from "../models/userModel";

const getUserProfile = async () => {
  const response = await axios.get(`${BASE_URL}/profile/view`, {
    withCredentials: true,
  });
  return response?.data;
};

// patch is throwing cros error. So has changed the method to put
const updateUserProfile = async (user: Partial<IUser>) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile/edit`, user, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const updateUserPassword = async (emailId: string, password: string) => {
  try {
    const data = { emailId, password };
    const response = await axios.put(`${BASE_URL}/profile/password`, data, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { getUserProfile, updateUserProfile, updateUserPassword };
