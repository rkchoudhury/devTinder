import { useState } from "react";
import { EditProfileCard } from "../../components/EditProfileCard";
import { UserCard } from "../../components/UserCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { IUser } from "../../models/userModel";

const Profile = () => {
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
          age: typeof age === "string" ? Number(age) : age,
          skills,
        }}
      />
    </div>
  );
};

export default Profile;
