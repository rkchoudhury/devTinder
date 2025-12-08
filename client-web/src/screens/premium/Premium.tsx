import { useDispatch } from "react-redux";
import type { AxiosError } from "axios";

import { createPayment } from "../../services/paymentService";
import { showAlert } from "../../redux/slices/alertSlice";
import { MembershipType } from "../../enums/MembershipEnum";

export const Premium = () => {
  const dispatch = useDispatch();

  const onPressBuy = async (membershipType: MembershipType) => {
    try {
      const response = await createPayment(membershipType);
    } catch (error) {
      const axiosError = error as AxiosError;
      dispatch(
        showAlert({
          showAlert: true,
          message: axiosError?.message,
        })
      );
    }
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
            <ul className="pt-10 pb-10">
              <li>- Chat with other people</li>
              <li>- 100 connection requests per day</li>
              <li>- Blue Tick</li>
              <li>- 3 Months</li>
            </ul>
            <button
              className="btn btn-outline btn-secondary mb-5 btn-wide"
              onClick={() => onPressBuy(MembershipType.SILVER)}
            >
              Buy Silver
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid grow place-items-center">
            <h1 className="font-bold text-2xl mt-5">Gold Membership</h1>
            <ul className="pt-10 pb-10">
              <li>- Chat with other people</li>
              <li>- Unlimited requests per day</li>
              <li>- Blue Tick</li>
              <li>- 6 Months</li>
            </ul>
            <button
              className="btn btn-outline btn-warning mb-5 btn-wide"
              onClick={() => onPressBuy(MembershipType.GOLD)}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
