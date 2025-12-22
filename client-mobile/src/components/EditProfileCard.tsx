import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Menu } from "react-native-paper";
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
  const [ageError, setAgeError] = useState<string | undefined>(undefined);
  const [genderMenuVisible, setGenderMenuVisible] = useState(false);
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

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    setGenderMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text variant="headlineMedium" style={styles.title}>
            Edit Profile
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              label="First Name"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <TextInput
              label="Age"
              placeholder="Age"
              value={age}
              onChangeText={handleAgeChange}
              keyboardType="numeric"
              error={!!ageError}
              style={styles.input}
            />
            {ageError && (
              <Text variant="bodySmall" style={styles.errorText}>
                {ageError}
              </Text>
            )}

            <View style={styles.fieldContainer}>
              <Text variant="bodyMedium" style={styles.label}>
                Gender
              </Text>
              <Menu
                visible={genderMenuVisible}
                onDismiss={() => setGenderMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setGenderMenuVisible(true)}
                    style={styles.selectButton}
                  >
                    {gender
                      ? gender.charAt(0).toUpperCase() + gender.slice(1)
                      : "Select Gender"}
                  </Button>
                }
              >
                <Menu.Item
                  onPress={() => handleGenderSelect("male")}
                  title="Male"
                />
                <Menu.Item
                  onPress={() => handleGenderSelect("female")}
                  title="Female"
                />
                <Menu.Item
                  onPress={() => handleGenderSelect("other")}
                  title="Other"
                />
              </Menu>
            </View>

            <TextInput
              label="Photo URL"
              placeholder="Photo URL"
              value={photoUrl}
              onChangeText={setPhotoUrl}
              autoCapitalize="none"
              style={styles.input}
            />

            <View style={styles.fieldContainer}>
              <Text variant="bodyMedium" style={styles.label}>
                About
              </Text>
              <TextInput
                value={about}
                onChangeText={setAbout}
                placeholder="About"
                multiline
                numberOfLines={4}
                maxLength={250}
                style={styles.textArea}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text variant="bodyMedium" style={styles.label}>
                Skills
              </Text>
              <SkillBadgeList skills={skills} setSkills={setSkills} />
            </View>
          </View>
          <Button
            mode="contained"
            onPress={onPressUpdateProfile}
            style={styles.button}
          >
            Update Profile
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 384,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 16,
  },
  cardBody: {
    alignItems: "center",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    marginTop: 16,
  },
  input: {
    marginBottom: 12,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
  },
  selectButton: {
    width: "100%",
  },
  textArea: {
    minHeight: 100,
  },
  errorText: {
    color: "#ef4444",
    marginTop: -8,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    marginTop: 16,
  },
});
