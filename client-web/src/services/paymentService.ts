import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/apiConfig";
import type { MembershipType } from "../enums/MembershipEnum";

const createPayment = async (membershipType: MembershipType) => {
  try {
    const data = { membershipType };
    const response = await axios.post(`${BASE_URL}/payment/create`, data, {
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { createPayment };
