import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from 'expo-router';
import { Button, TextInput, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import type { AxiosError } from "axios";

import { authenticateUser } from "../../services/authService";
import { addUser } from "../../redux/slices/userSlice";
import { showAlert } from "../../redux/slices/alertSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    try {
      const response = await authenticateUser(emailId, password);
      dispatch(addUser(response));
      router.replace('/feed');
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

  const onPressSignup = () => {
    router.push('/signup');
  };

  const onPressForgotPassword = () => {
    router.push('/forgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>🧑‍💻 DevTinder 💕</Text>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.formContainer}>
            <TextInput
              label="Email Id"
              placeholder="Enter Your Email Id"
              value={emailId}
              onChangeText={setEmailId}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              label="Password"
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
          <Button 
            mode="contained" 
            onPress={onPressLogin}
            style={styles.loginButton}
          >
            Login ❤️
          </Button>
          <Text variant="bodyLarge" style={styles.signupText} onPress={onPressSignup}>
            New user <Text style={styles.signupLink}>Sign up</Text> here.
          </Text>
          <Text variant="bodyLarge" style={styles.forgotPassword} onPress={onPressForgotPassword}>
            Forgot Password
          </Text>
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
    textAlign: 'center',
    position: 'absolute',
    top: 100,
    right: 0,
    left: 0,
    fontWeight: '700',
  },
  formContainer: {
    width: '100%',
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    width: '100%',
    marginTop: 16,
  },
  signupText: {
    marginTop: 16,
  },
  signupLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    marginTop: 8,
    color: '#ef4444',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LogIn;
