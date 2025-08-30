import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserConnections } from "../../services/userService";
import type { AxiosError } from "axios";
import { showAlert } from "../../redux/slices/alertSlice";
import type { IConnectionUser } from "../../models/userModel";
import type { RootState } from "../../redux/store";
import { saveConnections } from "../../redux/slices/connection";

export const Connections = () => {
  const dispatch = useDispatch();
  const connections: IConnectionUser[] = useSelector(
    (state: RootState) => state.connection
  );

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await getUserConnections();
        console.log(response);
        dispatch(saveConnections(response.data));
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

  return <div>Connection</div>;
};
