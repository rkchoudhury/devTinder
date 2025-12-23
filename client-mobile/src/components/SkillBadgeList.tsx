import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chip, TextInput, Button } from "react-native-paper";
import { capitalizedString } from "../utils/stringUtil";

interface IProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

export const SkillBadgeList = ({ skills, setSkills }: IProps) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    const skill = newSkill.toLowerCase().trim();
    if (skill && !skills?.includes(skill)) {
      setSkills([...(skills ?? []), skill]);
      setNewSkill("");
    }
  };

  const updateSkills = (name: string) => {
    const newList = skills?.filter((eachSkill) => eachSkill !== name);
    setSkills(newList ?? []);
  };

  return (
    <View style={styles.container}>
      <View style={styles.skillsContainer}>
        <View style={styles.chipsContainer}>
          {skills?.map((name) => (
            <Chip
              key={name}
              mode="outlined"
              onClose={() => updateSkills(name)}
              style={styles.chip}
            >
              {capitalizedString(name)}
            </Chip>
          ))}
        </View>
        {skills?.length < 10 && (
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              placeholder="Add skill"
              value={newSkill}
              onChangeText={setNewSkill}
              onSubmitEditing={handleAddSkill}
              style={styles.input}
              returnKeyType="done"
            />
            <Button
              mode="contained"
              onPress={handleAddSkill}
              disabled={
                !newSkill.trim() ||
                skills?.includes(newSkill.toLowerCase().trim())
              }
              style={styles.addButton}
            >
              Add
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  skillsContainer: {
    width: '100%',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
  },
  addButton: {
    alignSelf: 'center',
  },
});
