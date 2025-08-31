import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnectionRequests } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import type { AxiosError } from "axios";
import type { RootState } from "../../redux/store";
import {
  addConnectionRequest,
  removeConnectionRequest,
} from "../../redux/slices/connectionRequests";
import { ConnectionCard } from "../../components/ConnectionCard";
import type { IConnection } from "../../models/connectionModel";
import { AlertType } from "../../enums/alertEnum";
import { reviewRequest } from "../../services/requestService";

export const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const requests: IConnection[] = useSelector(
    (state: RootState) => state.connectionRequest
  );

  useEffect(() => {
    const fetchConnectionReqests = async () => {
      try {
        const response = await getConnectionRequests();
        dispatch(addConnectionRequest(response.data));
      } catch (error) {
        const axiosError = error as AxiosError;
        dispatch(
          showAlert({
            showAlert: true,
            message: axiosError?.message,
            duration: 5000,
          })
        );
      }
    };
    fetchConnectionReqests();
  }, [dispatch]);

  const handleReviewRequest = async (status: string, requestId: string) => {
    try {
      const response = await reviewRequest(status, requestId);
      dispatch(removeConnectionRequest(response.data));
      dispatch(
        showAlert({
          showAlert: true,
          message: response?.message,
          duration: 3000,
          type: AlertType.Success,
        })
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      dispatch(
        showAlert({
          showAlert: true,
          message: axiosError?.message,
          duration: 5000,
        })
      );
    }
  };

  if (requests?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-2xl">❤️</p>
        <p className="text-2xl">No new connection request found!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex justify-center my-6 font-semibold text-xl">
        Connection Requests
      </h1>
      {requests.map((eachRequest: IConnection) => (
        <ConnectionCard
          key={eachRequest?._id}
          requestId={eachRequest?._id}
          connectionFrom={eachRequest?.fromUserId}
          onPressButton={handleReviewRequest}
        />
      ))}
    </div>
  );
};
