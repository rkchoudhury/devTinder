import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/apiConfig";
import type { MembershipType } from "../enums/MembershipEnum";
import type { IPaymentVerification } from "../models/paymentModel";

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

const verifyPayment = async (payment: IPaymentVerification) => {
  try {
    const data = {
      razorpayPaymentId: payment.razorpay_payment_id,
      razorpayOrderId: payment.razorpay_order_id,
      razorpaySignature: payment.razorpay_signature,
    };

    const response = await axios.post(
      `${BASE_URL}/payment/verification`,
      data,
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

export { createPayment, verifyPayment };
