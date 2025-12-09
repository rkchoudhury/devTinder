import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const Loader = () => {
  const { loading } = useSelector((state: RootState) => state.loader);

  if (!loading) {
    return null;
  }

  return (
    <div className="h-full w-full absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-opacity-50 bg-gray-700">
      <div className="z-10">
        <div className="w-56 h-56 text-center bg-gray-900 rounded-lg flex items-center justify-center">
          <div>
            <span className="loading loading-ring loading-xl"></span>
            <h1 className="text-lg mt-2">Loading...</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
