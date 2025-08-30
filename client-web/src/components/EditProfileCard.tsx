import { useState } from "react";
import { SkillBadgeList } from "./SkillBadgeList";

interface IEditProfileProps {
  firstName: string;
  lastName: string;
  age?: string;
  gender?: string;
  about: string;
  photoUrl: string;
  skills?: string[];
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setAge: (value: string) => void;
  setGender: (value: string) => void;
  setAbout: (value: string) => void;
  setPhotoUrl: (value: string) => void;
  setSkills: (skills: string[]) => void;
  onPressUpdateProfile: () => void;
}

export const EditProfileCard = (props: IEditProfileProps) => {
  const [ageError, setAgeError] = useState<string | null>(null);
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    age,
    setAge,
    about,
    setAbout,
    photoUrl,
    setPhotoUrl,
    gender,
    setGender,
    onPressUpdateProfile,
    skills = [],
    setSkills,
  } = props;

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setAge(value);
      setAgeError(null);
    } else {
      setAge(value);
      setAgeError("Age must be a number");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Edit Profile</h2>
          <div className="w-full mt-4">
            <input
              value={firstName}
              type="text"
              className="input"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="mt-4">
              <input
                value={lastName}
                type="text"
                className="input"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                value={age}
                type="text"
                className={`input ${
                  ageError ? "input-error border-red-500" : ""
                }`}
                placeholder="Age"
                onChange={handleAgeChange}
              />
              {ageError && (
                <p className="text-red-500 text-sm mt-1">{ageError}</p>
              )}
            </div>
            <div className="mt-4">
              <select
                defaultValue={gender ?? "Select Gender"}
                onChange={(e) => setGender(e.target.value)}
                className="select"
              >
                <option disabled={true}>Select Gender</option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
                <option value={"other"}>Other</option>
              </select>
            </div>
            <div className="mt-4">
              <input
                value={photoUrl}
                type="text"
                className="input"
                placeholder="Photo URL"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea"
                placeholder="About"
                maxLength={250}
              ></textarea>
            </div>
            <div className="mt-4">
              <SkillBadgeList skills={skills} setSkills={setSkills} />
            </div>
            {/* <p className="text-red-500 mt-4">{error}</p> */}
          </div>
          <div className="w-full mt-4">
            <button
              className="btn btn-outline btn-primary"
              onClick={onPressUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
