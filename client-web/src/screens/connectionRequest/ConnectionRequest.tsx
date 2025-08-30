import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnectionRequests } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import type { AxiosError } from "axios";
import type { RootState } from "../../redux/store";
import { addConnectionRequest } from "../../redux/slices/connectionRequests";
import { ConnectionCard } from "../../components/ConnectionCard";
import type { IConnection } from "../../models/connectionModel";

export const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const requests: IConnection[] = useSelector(
    (state: RootState) => state.connectionRequest
  );

  useEffect(() => {
    const fetchFeed = async () => {
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
    fetchFeed();
  }, [dispatch]);

  if (requests?.length === 0) {
    return <h1>No Connection Request Found.</h1>;
  }

  return (
    <div>
      <h1 className="flex justify-center my-6 font-semibold text-xl">
        Connection Requests
      </h1>
      {requests.map((eachRequest: IConnection) => (
        <ConnectionCard
          key={eachRequest?._id}
          connectionFrom={eachRequest?.fromUserId}
        />
      ))}
    </div>
  );
};
