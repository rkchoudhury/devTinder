import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "react-native-paper";

import { EditProfileCard } from "../../components/EditProfileCard";
import { UserCard } from "../../components/UserCard";
import type { RootState } from "../../redux/store";
import { updateUserProfile } from "../../services/profileService";
import { showAlert } from "../../redux/slices/alertSlice";
import { AlertType } from "../../enums/AlertEnum";
import { updateUser } from "../../redux/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const params = useLocalSearchParams<{ enableEdit?: string }>();
  const enableEdit = params?.enableEdit ? params?.enableEdit === "true" : true;

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
      dispatch(updateUser(response?.data));
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
    <SafeAreaView edges={["bottom"]} style={styles.scrollContainer}>
      <ScrollView style={styles.scrollContainer}>
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
        {enableEdit && (
          <>
            <Divider bold horizontalInset style={styles.divider} />
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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  divider: {
    marginVertical: 16,
    height: 2,
    color: "#6200ee",
  },
});

export default Profile;
