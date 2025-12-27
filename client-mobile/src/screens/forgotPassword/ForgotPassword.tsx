import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import type { AxiosError } from "axios";

import { showAlert } from "../../redux/slices/alertSlice";
import { updateUserPassword } from "../../services/profileService";
import { AlertType } from "../../enums/AlertEnum";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onPressChangePassword = async () => {
    try {
      const response = await updateUserPassword(emailId, password);
      dispatch(
        showAlert({
          showAlert: true,
          type: AlertType.Success,
          message: response?.message,
        })
      );
      router.back(); // Go back to the previous screen -> login
    } catch (error) {
      const axiosError = error as AxiosError;
      dispatch(
        showAlert({
          showAlert: true,
          message: axiosError?.message,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.formContainer}>
            <TextInput
              label="Email Id"
              placeholder="Email Id"
              value={emailId}
              onChangeText={setEmailId}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              label="New Password"
              placeholder="New Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
          <Button 
            mode="contained" 
            onPress={onPressChangePassword}
            style={styles.button}
          >
            Update Password
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 384,
    borderRadius: 8,
    padding: 16,
  },
  cardBody: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    width: '100%',
    marginTop: 16,
  },
});
