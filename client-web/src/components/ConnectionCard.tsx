import { StatusType } from "../enums/StatusEnum";
import type { IConnectionFrom } from "../models/connectionModel";
import { capitalizedString } from "../utils/stringUtil";

export const ConnectionCard = ({
  connectionFrom,
  requestId,
  onPressButton,
}: {
  connectionFrom: IConnectionFrom;
  requestId: string;
  onPressButton?: (status: string, userId: string) => void;
}) => {
  const { firstName, lastName, about, photoUrl, age, gender, isPremium = false } = connectionFrom;

  return (
    <div className="flex justify-center mb-4">
      <div className="list bg-base-300 rounded-box shadow-md w-2/3">
        <li className="list-row">
          <div>
            <img className="size-20 rounded-box" src={photoUrl} />
          </div>
          <div>
            <div className="text-lg">
              {firstName} {lastName} {isPremium && "☑️"}
            </div>
            <div className="text-xs font-semibold">
              {age} {gender ? capitalizedString(gender) : ""}
            </div>
            <div className="text-xs font-semibold opacity-60 mt-2 text-justify">
              {about}
            </div>
          </div>
        </li>
        <div className="card-actions justify-center my-2">
          {/* <button className="btn btn-success mr-2">View Profile</button> */}
          <button
            className="btn btn-primary mr-2"
            onClick={() => onPressButton?.(StatusType.Accepted, requestId)}
          >
            Accept
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onPressButton?.(StatusType.Rejected, requestId)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
