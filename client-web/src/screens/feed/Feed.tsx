import { useEffect } from "react";
import type { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "../../components/UserCard";
import type { RootState } from "../../redux/store";
import { getFeed } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import { addFeed, updateFeed } from "../../redux/slices/feedSlice";
import { sendRequest } from "../../services/requestService";
import { AlertType } from "../../enums/alertEnum";

const Feed = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await getFeed();
        dispatch(addFeed(response));
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

  const handleSendRequest = async (status: string, userId: string) => {
    try {
      const response = await sendRequest(status, userId);
      dispatch(updateFeed(response));
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

  if (!list) return null;

  if (list?.length === 0) {
    return <h1>No Connections</h1>;
  }

  return (
    <div className="flex justify-center  my-6">
      <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
        {list.map((item) => (
          <div className="carousel-item">
            <UserCard
              key={item._id}
              user={item}
              showButton
              onPressButton={handleSendRequest}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
