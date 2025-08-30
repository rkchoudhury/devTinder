import { useSelector } from "react-redux";
import { UserCard } from "../../components/UserCard";
import type { RootState } from "../../redux/store";
import type { IUser } from "../../models/userModel";

const Feed = () => {
  const user: IUser | null = useSelector((state: RootState) => state.user);
  return (
    <div>
      <UserCard user={user} />
    </div>
  );
};

export default Feed;
