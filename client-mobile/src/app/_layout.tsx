import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PaperProvider } from 'react-native-paper';

import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="(screens)/signup" options={{ title: 'Sign Up' }} />
          <Stack.Screen name="(screens)/forgotPassword" options={{ title: 'Forgot Password' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)/profile" options={{ title: 'Profile' }} />
        </Stack>
      </PaperProvider>
    </Provider>
  );
}
