import { StatusType } from "../enums/StatusEnum";
import type { IUser } from "../models/userModel";
import { capitalizedString } from "../utils/stringUtil";

export const UserCard = ({
  user,
  showButton = false,
  onPressButton,
}: {
  user: Partial<IUser>;
  showButton?: boolean;
  onPressButton?: (status: string, userId: string) => void;
}) => {
  if (!user) return;

  const {
    _id = "",
    firstName,
    lastName,
    about,
    photoUrl,
    gender,
    age,
    skills = [],
  } = user;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="User Photo" className="flex-1" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p>
              {age} {capitalizedString(gender)}
            </p>
          )}
          <p>{about}</p>
          {skills?.length > 0 && (
            <div className="flex">
              <div className="mr-2">Skills:</div>
              <div>
                {skills?.map((name) => (
                  <div
                    key={name}
                    className="badge badge-md badge-outline badge-primary mr-2 mb-2"
                  >
                    {capitalizedString(name)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {showButton && (
            <div className="card-actions justify-center mt-2">
              <button
                className="btn btn-primary mr-2"
                onClick={() => onPressButton?.(StatusType.Ignored, _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onPressButton?.(StatusType.Interested, _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
