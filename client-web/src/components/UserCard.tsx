import { StatusType } from "../enums/StatusEnum";
import type { IUser } from "../models/userModel";
import { capitalizedString } from "../utils/stringUtil";

export const UserCard = ({
  user,
  showButton = false,
  showChatButton = false,
  onPressButton,
  onPressChat,
}: {
  user: Partial<IUser>;
  showButton?: boolean;
  showChatButton?: boolean;
  onPressButton?: (status: string, userId: string) => void;
  onPressChat?: () => void;
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
    isPremium,
  } = user;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="User Photo" className="flex-1" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName} {isPremium && "☑️"}
          </h2>
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
          {showChatButton && (
            <button className="btn btn-dash btn-secondary mt-2" onClick={onPressChat}>
              Chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
