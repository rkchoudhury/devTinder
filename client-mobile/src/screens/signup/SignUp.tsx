import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import type { AxiosError } from "axios";
import { router } from 'expo-router';
import { Button, TextInput, Text } from 'react-native-paper';

import { showAlert } from "../../redux/slices/alertSlice";
import { addUser } from "../../redux/slices/userSlice";
import { signUpNewUser } from "../../services/authService";

const Signup = () => {
      const dispatch = useDispatch();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const onPressSignUp = async () => {
        try {
            const response = await signUpNewUser({
                firstName,
                lastName,
                emailId,
                password,
            });
              dispatch(addUser(response?.data));
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

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardBody}>
                    <Text variant="headlineMedium" style={styles.title}>Sign Up</Text>
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
                            label="Email Id"
                            placeholder="Email Id"
                            value={emailId}
                            onChangeText={setEmailId}
                            style={styles.input}
                        />
                        <TextInput
                            label="Password"
                            placeholder="Password"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                    </View>
                    <Button icon="heart" contentStyle={{ flexDirection: 'row-reverse' }} mode="contained" onPress={onPressSignUp}>
                        Signup
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
        backgroundColor: '#2a2a2a',
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
        marginBottom: 16,
    },
    input: {
        marginBottom: 12,
    },
});

export default Signup;