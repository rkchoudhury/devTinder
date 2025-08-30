import { useState } from "react";
import { SkillBadgeList } from "./SkillBadgeList";
import { TextInput } from "./TextInput";

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
  const [ageError, setAgeError] = useState<string | undefined>(undefined);
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    age = "",
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

  const handleAgeChange = (value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setAge(value);
      setAgeError(undefined);
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
            <TextInput
              label="First Name"
              placeHolder="First Name"
              value={firstName}
              onChangevalue={setFirstName}
            />
            <TextInput
              label="Last Name"
              placeHolder="Last Name"
              value={lastName}
              onChangevalue={setLastName}
            />
            <TextInput
              label="Age"
              placeHolder="Age"
              value={age}
              onChangevalue={handleAgeChange}
              hasError={!!ageError?.length}
              errorMessage={ageError}
            />
            <fieldset className="fieldset">
              <label className="label">Gender</label>
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
            </fieldset>
            <TextInput
              label="Photo URL"
              placeHolder="Photo URL"
              value={photoUrl}
              onChangevalue={setPhotoUrl}
            />
            <fieldset className="fieldset">
              <label className="label">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea"
                placeholder="About"
                maxLength={250}
              ></textarea>
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Skills</label>
              <SkillBadgeList skills={skills} setSkills={setSkills} />
            </fieldset>
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
