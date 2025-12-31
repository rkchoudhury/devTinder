import { AxiosError } from "axios";
import api from "../utils/axiosInstance";
import type { MembershipType } from "../enums/MembershipEnum";
import type {
  IPaymentError,
  IPaymentVerification,
} from "../models/paymentModel";

const createPayment = async (membershipType: MembershipType) => {
  try {
    const data = { membershipType };
    const response = await api.post("/payment/create", data);
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

    const response = await api.post("/payment/verification", data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

const updateFailedPayment = async (payment: IPaymentError) => {
  try {
    const data = {
      razorpayPaymentId: payment.error.metadata.payment_id,
      razorpayOrderId: payment.error.metadata.order_id,
    };

    const response = await api.post("/payment/failure", data);
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError?.response?.data;
  }
};

export { createPayment, verifyPayment, updateFailedPayment };
