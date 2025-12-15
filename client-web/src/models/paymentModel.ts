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

interface IPaymentError {
  error: {
    code: string;
    description: string;
    metadata: {
      order_id: string;
      payment_id: string;
    }
    reason: string;
    source: string;
    step: string;
  }
}


export type { IOrder, IPayment, IPaymentVerification, IPaymentError };
