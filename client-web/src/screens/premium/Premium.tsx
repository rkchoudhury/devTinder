import { useDispatch, useSelector } from "react-redux";
import type { AxiosError } from "axios";

import { createPayment, updateFailedPayment, verifyPayment } from "../../services/paymentService";
import { showAlert } from "../../redux/slices/alertSlice";
import { MembershipType } from "../../enums/MembershipEnum";
import type { IPayment, IPaymentError, IPaymentVerification } from "../../models/paymentModel";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { updateUser } from "../../redux/slices/userSlice";
import type { RootState } from "../../redux/store";
import type { IUser } from "../../models/userModel";

export const Premium = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user as IUser | null);
  const isPremiumUser = user?.isPremium ?? false;
  const membershipType = user?.membershipType;

  const onPressBuy = async (membershipType: MembershipType) => {
    try {
      dispatch(showLoader());
      const response: IPayment = await createPayment(membershipType);

      // Open Razorpay Checkout
      openRazorpayPaymentGateway(response);
    } catch (error) {
      const axiosError = error as AxiosError;
      dispatch(
        showAlert({
          showAlert: true,
          message: axiosError?.message,
        })
      );
      dispatch(hideLoader());
    }
  };

  const openRazorpayPaymentGateway = ({ order, razorpayKeyId }: IPayment) => {
    const {
      amount,
      currency,
      orderId,
      notes: { firstName, lastName, emailId },
    } = order;

    // Open Razorpay Checkout Options
    const options = {
      key: razorpayKeyId, // Replace with your Razorpay key_id
      amount: amount * 100, // Amount is in currency subunits.
      currency,
      name: "DevTinder",
      description: "DeTinder Membership Payment",
      order_id: orderId, // This is the order_id created in the backend
      // callback_url: "http://localhost:7000/payment/verification", // Your success URL
      prefill: {
        name: `${firstName} ${lastName}`,
        email: emailId,
      },
      theme: {
        color: "#F37254",
      },
      handler: async (response: IPaymentVerification) => {
        dispatch(showLoader());
        // This method is only called when payment is succesful.
        const res = await verifyPayment(response);
        dispatch(updateUser(res.user));
        dispatch(hideLoader());
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    // The call back function will only be called when payment is not completed or in case of failure case
    rzp.on("payment.failed", async (response: IPaymentError) => {
      await updateFailedPayment(response);
      dispatch(hideLoader());
    });
  };

  return (
    <div className="">
      <h1 className="font-bold text-3xl mt-5 mb-8 text-center">
        Premuim Plans
      </h1>
      <div className="ml-20 mr-20 mb-20">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card bg-base-300 rounded-box grid grow place-items-center">
            <h1 className="font-bold text-2xl mt-5">Silver Membership</h1>
            {membershipType === MembershipType.SILVER && <div className="badge badge-outline badge-success mt-2">Purchased</div>}
            <ul className="pt-10 pb-10">
              <li>- Chat with other people</li>
              <li>- 100 connection requests per day</li>
              <li>- Blue Tick</li>
              <li>- 3 Months</li>
            </ul>
            <button
              className="btn btn-outline btn-secondary mb-5 btn-wide"
              onClick={() => onPressBuy(MembershipType.SILVER)}
              disabled={isPremiumUser}
            >
              Buy Silver
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid grow place-items-center">
            <h1 className="font-bold text-2xl mt-5">Gold Membership</h1>
            {membershipType === MembershipType.GOLD && <div className="badge badge-outline badge-success mt-2">Purchased</div>}
            <ul className="pt-10 pb-10">
              <li>- Chat with other people</li>
              <li>- Unlimited requests per day</li>
              <li>- Blue Tick</li>
              <li>- 7 Months</li>
            </ul>
            <button
              className="btn btn-outline btn-warning mb-5 btn-wide"
              onClick={() => onPressBuy(MembershipType.GOLD)}
              disabled={isPremiumUser}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
