import { useCallback, useState, use, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { List, Divider, Switch } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

import { removeUser } from '@/src/redux/slices/userSlice';
import { logoutUser } from '@/src/services/authService';
import { showAlert } from '@/src/redux/slices/alertSlice';
import { AlertType } from '@/src/enums/AlertEnum';
import {
  clearRefreshToken,
  getNotificationsEnabled,
  saveNotificationsEnabled,
} from '@/src/utils/secureStorage';
import { RootState } from '@/src/redux/store';

export default function Setting() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await getNotificationsEnabled();
        if (saved !== null) setNotificationsEnabled(saved);
      } catch {
        // If secure storage is unavailable, keep default.
      }
    })();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutUser(user?._id ?? '');
              await clearRefreshToken();
              dispatch(removeUser());
              router.replace('/');
              dispatch(
                showAlert({
                  showAlert: true,
                  message: "You have logged out successfully!",
                  type: AlertType.Success,
                })
              );
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleToggleNotifications = useCallback(
    async (value: boolean) => {
      setNotificationsEnabled(value);

      try {
        await saveNotificationsEnabled(value);

        // Controls whether FCM auto-initializes (token generation, etc.)
        await messaging().setAutoInitEnabled(value);

        if (value === false) {
          // Optional: revoke the current token so this device stops receiving pushes.
          await messaging().deleteToken();
        } else {
          // On iOS this prompts for permission; on Android it generally no-ops.
          await messaging().requestPermission();

          const deviceToken = await messaging().getToken();
          console.log('FCM Device Token:', deviceToken);
        }

        dispatch(
          showAlert({
            showAlert: true,
            message: value ? 'Notifications enabled' : 'Notifications disabled',
            type: AlertType.Success,
          })
        );
      } catch {
        setNotificationsEnabled((prev) => !prev);
        dispatch(
          showAlert({
            showAlert: true,
            message: 'Unable to update notification setting',
            type: AlertType.Error,
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item
          title="My Profile"
          description="View and edit your profile"
          left={(props) => <List.Icon {...props} icon="account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => router.push('/(screens)/profile')}
        />
        <Divider />
        {/* <List.Item
          title="Premium"
          description="Upgrade to premium membership"
          left={(props) => <List.Icon {...props} icon="crown" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => router.push('/(screens)/premium')}
          disabled={true}
        /> */}
        <Divider />
        <List.Item
          title="Notifications"
          description="Manage your notification settings"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />}
        />
        <Divider />
        <List.Item
          title="Logout"
          description="Sign out of your account"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={handleLogout}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
