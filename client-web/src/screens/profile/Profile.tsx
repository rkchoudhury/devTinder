import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AxiosError } from "axios";

import { EditProfileCard } from "../../components/EditProfileCard";
import { UserCard } from "../../components/UserCard";
import type { RootState } from "../../redux/store";
import type { IUser } from "../../models/userModel";
import { updateUserProfile } from "../../services/profileService";
import { showAlert } from "../../redux/slices/alertSlice";
import { AlertType } from "../../enums/alertEnum";
import { addUser } from "../../redux/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as IUser | null;

  const [firstName, setFirstName] = useState<string>(user?.firstName ?? "");
  const [lastName, setLastName] = useState<string>(user?.lastName ?? "");
  const [age, setAge] = useState<string | undefined>(user?.age?.toString());
  const [gender, setGender] = useState<string | undefined>(
    user?.gender ?? undefined
  );
  const [about, setAbout] = useState<string>(user?.about ?? "");
  const [photoUrl, setPhotoUrl] = useState<string>(user?.photoUrl ?? "");
  const [skills, setSkills] = useState<string[]>(user?.skills ?? []);

  if (!user) return null;

  const updateProfile = async () => {
    try {
      const response = await updateUserProfile({
        firstName,
        lastName,
        about,
        photoUrl,
        gender,
        age: Number(age),
        skills,
      });
      dispatch(addUser(response?.data));
      dispatch(
        showAlert({
          showAlert: true,
          message: response?.message,
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

  return (
    <div className="flex justify-center my-10 gap-10">
      <EditProfileCard
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        age={age}
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        about={about}
        setAbout={setAbout}
        photoUrl={photoUrl}
        setPhotoUrl={setPhotoUrl}
        skills={skills}
        setSkills={setSkills}
        onPressUpdateProfile={updateProfile}
      />
      <UserCard
        user={{
          firstName,
          lastName,
          about,
          photoUrl,
          gender,
          age: typeof age === "string" ? Number(age) : age,
          skills,
        }}
      />
    </div>
  );
};

export default Profile;
