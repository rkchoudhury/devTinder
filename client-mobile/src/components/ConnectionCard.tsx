import { View, StyleSheet, Image } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { StatusType } from "../enums/StatusEnum";
import type { IConnectionFrom } from "../models/connectionModel";
import { capitalizedString } from "../utils/stringUtil";

export const ConnectionCard = ({
  connectionFrom,
  requestId,
  onPressButton,
}: {
  connectionFrom: IConnectionFrom;
  requestId: string;
  onPressButton?: (status: string, userId: string) => void;
}) => {
  const { firstName, lastName, about, photoUrl, age, gender, isPremium = false } = connectionFrom;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.profileContainer}>
            <Image 
              source={{ uri: photoUrl }} 
              style={styles.profileImage}
            />
            <View style={styles.infoContainer}>
              <Text variant="titleLarge" style={styles.name}>
                {firstName} {lastName} {isPremium && "☑️"}
              </Text>
              <Text variant="bodyMedium" style={styles.ageGender}>
                {age} {gender ? capitalizedString(gender) : ""}
              </Text>
              <Text variant="bodySmall" style={styles.about}>
                {about}
              </Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => onPressButton?.(StatusType.Accepted, requestId)}
            style={styles.button}
          >
            Accept
          </Button>
          <Button
            mode="contained"
            onPress={() => onPressButton?.(StatusType.Rejected, requestId)}
            style={styles.button}
          >
            Reject
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    width: '90%',
    maxWidth: 600,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  ageGender: {
    fontWeight: '600',
    marginTop: 4,
  },
  about: {
    fontWeight: '600',
    opacity: 0.6,
    marginTop: 8,
    textAlign: 'justify',
  },
  actions: {
    justifyContent: 'center',
    marginVertical: 8,
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
