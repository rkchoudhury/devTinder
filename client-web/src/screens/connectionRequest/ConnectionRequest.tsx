import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnectionRequests } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import type { AxiosError } from "axios";
import type { RootState } from "../../redux/store";
import { addConnectionRequest } from "../../redux/slices/connectionRequests";

export const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state: RootState) => state.connectionRequest);

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

  console.log(requests);

  return <div>ConnectionRequest</div>;
};
