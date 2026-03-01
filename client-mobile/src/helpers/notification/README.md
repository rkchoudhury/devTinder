# @react-native-firebase/messaging

A remote push notification package for React Native. It uses Firebase Cloud Messaging (FCM).

## Installation

Install the package:

```bash
yarn add @react-native-firebase/app
yarn add @react-native-firebase/messaging
```

## Android Setup

1. Download the `google-services.json` file and place it inside of the project at this location: `/android/app/google-services.json`

2. Add the google-services plugin as a dependency inside the `/android/build.gradle` file:

   ```gradle
   buildscript {
     dependencies {
       // ... other dependencies
       classpath 'com.google.gms:google-services:4.4.1' // <- Add this line
     }
   }
   ```

3. Execute the plugin by adding the following to `/android/app/build.gradle` file:

   ```gradle
   apply plugin: 'com.android.application'
   apply plugin: 'com.google.gms.google-services' // <- Add this line
   ```

4. In the `AndroidManifest.xml` file, add the notification permission:

   ```xml
   <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
   ```

## iOS Setup

1. Download the `GoogleService-Info.plist` file and add this file into the project using XCode

2. Open `/ios/{projectName}/AppDelegate.swift` file and do the following changes:

   - At the top of the file, import the Firebase SDK right after `import ReactAppDependencyProvider`:

     ```swift
     import Firebase
     ```

   - Within your existing `application` method, add the following to the top of the method:

     ```swift
     override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
       FirebaseApp.configure() // <- Add this
     }
     ```

3. Open the file `./ios/Podfile` and add the following lines inside the targets (right before the `use_react_native` line):

   ```ruby
   use_frameworks! :linkage => :static
   $RNFirebaseAsStaticFramework = true
   ```

4. Install the pods:

   ```bash
   pod install --repo-update
   ```

## iOS Messaging Setup

iOS requires additional configuration steps before you can receive messages. See the [iOS Messaging Setup Guide](https://rnfirebase.io/messaging/usage/ios-setup#configuring-your-app) for more details.

### 1. Enable Push Notifications

Add the `Push Notifications` capability to the project:

1. Open your project in Xcode
2. Navigate to the **Signing & Capabilities** tab
3. Click the **+ Capability** button
4. Search for and select **Push Notifications**

### 2. Enable Background Modes

Add the `Background Modes` capability to the project:

1. In the **Signing & Capabilities** tab, click the **+ Capability** button
2. Search for and select **Background Modes**
3. Enable the following sub-modes:
   - Background fetch
   - Remote notifications

### 3. Link APNs with FCM

APNs (Apple Push Notification service) is required for both foreground and background messaging to function correctly on iOS.

Follow the detailed steps in the [Linking APNs with FCM guide](https://rnfirebase.io/messaging/usage/ios-setup#linking-apns-with-fcm-ios) to:

- Generate an APNs authentication key or certificate
- Upload it to your Firebase project console

## Production / Higher Environments

When deploying to production or higher environments, you must update the Firebase configuration files to use the production project credentials:

### Android

1. Download the production `google-services.json` file from your Firebase production project
2. Replace the existing file at `/android/app/google-services.json` with the production version

### iOS

1. Download the production `GoogleService-Info.plist` file from your Firebase production project
2. Replace the existing file in your Xcode project with the production version
3. Update the `aps-environment` value to `"production"` in your `shell.entitlements` file:

   ```xml
   <key>aps-environment</key>
   <string>production</string>
   ```

## Usage

```typescript
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Linking,
  Button,
} from 'react-native';
import {
  remoteMessaging,
  checkNotificationPermission,
  requestNotificationPermission,
  NotificationPermissionStatus,
} from '@bbl/remote-push-notification';

const App: React.FC = () => {
  const [fcmToken, setFcmToken] = useState<string>('');
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus>(
      NotificationPermissionStatus.Unavailable
    );

  useEffect(() => {
    // Initial permission check
    checkNotificationPermission().then((status) => setPermissionStatus(status));

    // Handle notification opened when app is in background
    const unsubscribeNotificationOpened =
      remoteMessaging.onNotificationOpenedApp((remoteMessage) => {
        Alert.alert(
          'Notification Opened',
          `You opened: ${remoteMessage.notification?.title ?? 'Notification'}`,
          [{ text: 'OK' }]
        );
      });

    // Check if notification opened the app from quit state
    remoteMessaging.getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        Alert.alert(
          'Notification Opened',
          `You opened: ${remoteMessage.notification?.title ?? 'Notification'}`,
          [{ text: 'OK' }]
        );
      }
    });

    // Listen for foreground messages
    const unsubscribeForegroundMessage = remoteMessaging.onMessage(
      async (remoteMessage) => {
        Alert.alert(
          'New Notification',
          remoteMessage.notification?.body || JSON.stringify(remoteMessage),
          [{ text: 'OK' }]
        );
      }
    );

    return () => {
      unsubscribeNotificationOpened();
      unsubscribeForegroundMessage();
    };
  }, []);

  const getDeviceToken = async () => {
    try {
      if (permissionStatus === NotificationPermissionStatus.Granted) {
        if (!remoteMessaging.isDeviceRegisteredForRemoteMessages) {
          await remoteMessaging.registerDeviceForRemoteMessages();
        }
        const token = await remoteMessaging.getToken();
        console.log('FCM Token:', token);
        setFcmToken(token);
      }
    } catch {
      console.error('Error initializing push notifications');
    }
  };

  const onRequestPermission = async () => {
    const status = await requestNotificationPermission();
    setPermissionStatus(status);

    if (status === NotificationPermissionStatus.Denied) {
      Alert.alert(
        'Permission Denied',
        'Please enable notifications in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notification Demo App</Text>
      <Text style={styles.subtitle}>
        Platform: {Platform.OS} {Platform.Version}
      </Text>
      <Text style={styles.subtitle}>Permission Status: {permissionStatus}</Text>
      <Button
        title="Enable Notifications"
        onPress={onRequestPermission}
        disabled={permissionStatus === NotificationPermissionStatus.Granted}
      />
      <Button
        title="Get FCM token"
        onPress={getDeviceToken}
        disabled={permissionStatus !== NotificationPermissionStatus.Granted}
      />
      <Text style={styles.subtitle}>FCM Token: {fcmToken}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default App;
```

## Push Notification Testing

You can test push notifications using [testfcm.in](https://www.testfcm.in/), which supports Google's latest FCM API (HTTP V1).

### Required Information

To send a test notification, you'll need the following:

1. **Project ID**

   - Find it in the Firebase Console (Firebase Console -> Project Settings -> General -> Project ID)
   - Or extract it from `google-services.json` (Android) or `GoogleService-Info.plist` (iOS)

2. **Access Token**

   - Generate an OAuth 2.0 access token following [this guide](https://stackoverflow.com/questions/50399170/what-bearer-token-should-i-be-using-for-firebase-cloud-messaging-testing/62670409#62670409)
   - The token is required for authenticating with FCM HTTP V1 API

3. **Device Token**

   - Obtain it from your device by calling `remoteMessaging.getToken()`
   - This is the FCM registration token for the target device

4. **Notification Content**
   - Provide a notification title
   - Provide a notification message/body

### Testing Steps

1. Navigate to [testfcm.in](https://www.testfcm.in/)
2. Enter your Project ID, Access Token, and Device Token
3. Compose your notification with a title and message
4. Send the test notification
5. Verify the notification appears on your device

### Alternative: Using Firebase Console

You can also send test notifications directly from the Firebase Console:

1. Log in to [Firebase Console](https://console.firebase.google.com/)
2. Select your project and navigate to **Messaging** from the dashboard
3. Click **Create your first campaign** (or **New campaign** if you have existing campaigns)
4. Select **Firebase Notification messages**
5. Click **Create** to start composing your notification
6. Enter the **Notification title** and **Notification message**
7. Click the **Send test message** button
8. In the test dialog, enter your **FCM device token** (obtained from `remoteMessaging.getToken()`)
9. Click **Test** to send the notification
10. Verify the notification appears on your device

> **Tip:** You can add multiple device tokens to test on several devices simultaneously.

## Mocking File Usage

To use the mocking file (`mock.js`) within the MFE while running test cases, follow these configuration steps.

Update the `jest.config.js` file of your MFE as shown below:

```javascript
module.exports = {
  // Other configurations

  setupFiles: [
    // Existing setup files
    '<rootDir>/../../shell/node_modules/@bbl/remote-push-notification/src/mocks/mock.js', // Add this line
  ],
  moduleNameMapper: {
    // Existing name mappers
    '^@bbl/remote-push-notification$':
      '<rootDir>/../../shell/node_modules/@bbl/remote-push-notification/src/mocks/mock.js', // Add this line
  },
};
```

## Reference

- [Firebase Configuration](https://rnfirebase.io/)
- [Firebase Messaging Usage](https://rnfirebase.io/messaging/usage)
- [Additional Setup to run on iOS Device](https://rnfirebase.io/messaging/usage/ios-setup#linking-apns-with-fcm-ios)

## Notes

- The `@bbl/analytics` package has a dependency on `@react-native-firebase/app` version `20.0.0`.
- This package uses the same version (`20.0.0`) for both `@react-native-firebase/app` and `@react-native-firebase/messaging` to maintain compatibility.
- If you need to update these versions, ensure you also update the corresponding version in `@bbl/analytics`.
