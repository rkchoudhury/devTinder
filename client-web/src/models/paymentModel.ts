import type { MembershipType } from "../enums/MembershipEnum";

interface IOrder {
  amount: number;
  currency: string;
  orderId: string;
  status: string;
  receipt: string;
  notes: {
    firstName: string;
    lastName: string;
    emailId: string;
    membershipType: MembershipType;
  };
  userId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IPayment {
  order: IOrder;
  razorpayKeyId: string;
}

interface IPaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export type { IOrder, IPayment, IPaymentVerification };
