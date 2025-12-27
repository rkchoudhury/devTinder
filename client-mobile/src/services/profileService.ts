import { AxiosError } from "axios";

import api from "../utils/axiosInstance";
import type { IUser } from "../models/userModel";

const getUserProfile = async () => {
  const response = await api.get("/profile/view");
  return response?.data;
};

// patch is throwing cros error. So has changed the method to put
const updateUserProfile = async (user: Partial<IUser>) => {
  try {
    const response = await api.put('/profile/edit', user);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const updateUserPassword = async (emailId: string, password: string) => {
  try {
    const data = { emailId, password };
    const response = await api.put('/profile/password', data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { getUserProfile, updateUserProfile, updateUserPassword };
