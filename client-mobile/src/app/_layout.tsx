import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";
import { PaperProvider } from 'react-native-paper';

import { store } from "../redux/store";
import { Loader } from "../components/Loader";
import { ToastAlert } from "../components/ToastAlert";
import { bootstrapAuth } from "../helpers/authHelper";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const initAuth = async () => {
      await bootstrapAuth();
      
      // Hide splash screen once auth is initialized
      if (store.getState().user.authInitialized) {
        await SplashScreen.hideAsync();
      }
    };
    
    initAuth();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="(screens)/signup" options={{ title: 'Sign Up', headerBackButtonDisplayMode: 'minimal' }} />
          <Stack.Screen name="(screens)/forgotPassword" options={{ title: 'Forgot Password', headerBackButtonDisplayMode: 'minimal' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)/profile" options={{ title: 'My Profile', headerBackButtonDisplayMode: 'minimal' }} />
        </Stack>
        <Loader />
        <ToastAlert />
      </PaperProvider>
    </Provider>
  );
}
