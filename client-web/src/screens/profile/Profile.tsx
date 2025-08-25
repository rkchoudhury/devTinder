import { useState } from "react";
import { EditProfileCard } from "../../components/EditProfileCard";
import { UserCard } from "../../components/UserCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { IUser } from "../../models/userModel";

const Profile = () => {
  const user: IUser | null = useSelector((state: RootState) => state.user);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [skills, setSkills] = useState(user?.skills);

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
      />
      <UserCard
        user={{
          firstName,
          lastName,
          about,
          photoUrl,
          gender,
          age,
          skills,
        }}
      />
    </div>
  );
};

export default Profile;
