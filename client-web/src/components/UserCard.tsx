import type { IUser } from "../models/userModel";

export const UserCard = ({
  user,
  showButton = false,
}: {
  user: Partial<IUser>;
  showButton?: boolean;
}) => {
  if (!user) return;

  const {
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
          <img src={photoUrl} alt="User Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p>
              {age} {gender?.[0]?.toUpperCase() + gender?.substring(1)}
            </p>
          )}
          <p>{about}</p>
          {skills?.length > 0 && (
            <div className="flex">
              <div className="mr-2">Skills:</div>
              <div>
                {skills?.map((name) => (
                  <div className="badge badge-md badge-outline badge-primary mr-2 mb-2">
                    {/* {name
                      .split(" ")
                      .map(
                        (word) => word?.[0]?.toUpperCase() + word.substring(1)
                      )
                      .join(" ")} */}
                    {name.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </div>
                ))}
              </div>
            </div>
          )}
          {showButton && (
            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary mr-2">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
