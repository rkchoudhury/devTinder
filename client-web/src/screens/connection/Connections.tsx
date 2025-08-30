import { useEffect } from "react";
import type { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserConnections } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import type { IConnectionUser } from "../../models/userModel";
import type { RootState } from "../../redux/store";
import { saveConnections } from "../../redux/slices/connection";
import { UserCard } from "../../components/UserCard";

export const Connections = () => {
  const dispatch = useDispatch();
  const connections: IConnectionUser[] = useSelector(
    (state: RootState) => state.connection
  );

  useEffect(() => {
    const fetchserConnections = async () => {
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
    fetchserConnections();
  }, [dispatch]);

  return (
    <div className="mb-6">
      <h1 className="flex justify-center my-6 font-semibold text-xl">
        My Connections
      </h1>
      <div className="flex flex-wrap justify-center">
        {connections.map((eachConnection: IConnectionUser) => (
          <div className="flex ml-4 mb-4">
            <UserCard
              key={eachConnection._id}
              user={eachConnection}
              showButton={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
