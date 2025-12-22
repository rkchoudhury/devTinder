import { View, StyleSheet, Image } from "react-native";
import { Card, Text, Button, Chip } from "react-native-paper";
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
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: photoUrl }} style={styles.image} />
        <Card.Content>
          <View style={styles.titleContainer}>
            <Text variant="headlineSmall" style={styles.title}>
              {firstName + " " + lastName} {isPremium && "☑️"}
            </Text>
          </View>
          {age && gender && (
            <Text variant="bodyMedium" style={styles.ageGender}>
              {age} {capitalizedString(gender)}
            </Text>
          )}
          <Text variant="bodyMedium" style={styles.about}>{about}</Text>
          {skills?.length > 0 && (
            <View style={styles.skillsContainer}>
              <Text variant="bodyMedium" style={styles.skillsLabel}>Skills:</Text>
              <View style={styles.skillsChips}>
                {skills?.map((name) => (
                  <Chip
                    key={name}
                    mode="outlined"
                  >
                    {capitalizedString(name)}
                  </Chip>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
        {showButton && (
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              onPress={() => onPressButton?.(StatusType.Ignored, _id)}
              style={styles.button}
            >
              Ignore
            </Button>
            <Button
              mode="contained"
              onPress={() => onPressButton?.(StatusType.Interested, _id)}
              style={styles.button}
            >
              Interested
            </Button>
          </Card.Actions>
        )}
        {showChatButton && (
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              onPress={onPressChat}
              style={styles.button}
            >
              Chat
            </Button>
          </Card.Actions>
        )}
        {!showButton && !showChatButton && <View style={styles.cardActions} />}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  image: {
    height: 300,
    width: '100%',
  },
  titleContainer: {
    marginTop: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  ageGender: {
    marginTop: 4,
  },
  about: {
    marginTop: 8,
  },
  skillsContainer: {
    marginTop: 12,
  },
  skillsLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  skillsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  cardActions: {
    marginVertical: 8,
    gap: 8,
  },
  button: {
    flex: 1,
  },
  emptySpace: { 
    height: 4,
  },
});
