import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";
import { PaperProvider } from 'react-native-paper';

import { store } from "../redux/store";
import { Loader } from "../components/Loader";
import { ToastAlert } from "../components/ToastAlert";
import { bootstrapAuth } from "../helpers/authHelper";

import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from "react-native";

import '../helpers/notification/notifeeHelper/notifeeEvents'; // Import to register notification handlers

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

  useEffect(() => {
    void (async () => {
      try {
        await messaging().registerDeviceForRemoteMessages();

        if (Platform.OS === 'ios') {
          await messaging().requestPermission();
        }

        if (Platform.OS === 'android' && Number(Platform.Version) >= 33) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        }
      } catch (error) {
        console.log('Notification permission/init error', error);
      }
    })();
  }, []);

  useEffect(() => {
    // Handle notification opened when app is in background
    const unsubscribeNotificationOpened =
      messaging().onNotificationOpenedApp(remoteMessage => {
        Alert.alert(
          'Notification Opened - Background',
          `You opened: ${remoteMessage.notification?.title ?? 'Notification'}`,
          [{text: 'OK'}],
        );
      });

    // Check if notification opened the app from quit state
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        Alert.alert(
          'Notification Opened - Quit State',
          `You opened: ${remoteMessage.notification?.title ?? 'Notification'}`,
          [{text: 'OK'}],
        );
      }
    });

    // Listen for foreground messages
    const unsubscribeForegroundMessage = messaging().onMessage(
      async remoteMessage => {
        Alert.alert(
          'New Notification - Foreground',
          remoteMessage.notification?.body || JSON.stringify(remoteMessage),
          [{text: 'OK'}],
        );
      },
    );

    return () => {
      unsubscribeNotificationOpened();
      unsubscribeForegroundMessage();
    };
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
