import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "../../components/UserCard";
import type { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getFeed } from "../../services/userService";
import type { AxiosError } from "axios";
import { showAlert } from "../../redux/slices/alertSlice";
import { addFeed } from "../../redux/slices/feedSlice";

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

  if (!list) return null;

  if (list?.length === 0) {
    return <h1>No Connections</h1>;
  }

  return (
    <div>
      <UserCard user={list[0]} showButton />
    </div>
  );
};

export default Feed;
