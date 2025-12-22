import { View, StyleSheet, Alert } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

import { removeUser } from '@/src/redux/slices/userSlice';
import { logoutUser } from '@/src/services/authService';
import { showAlert } from '@/src/redux/slices/alertSlice';
import { AlertType } from '@/src/enums/AlertEnum';

export default function Setting() {
  const router = useRouter();
  const dispatch = useDispatch();

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
              await logoutUser();
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
        <List.Item
          title="Premium"
          description="Upgrade to premium membership"
          left={(props) => <List.Icon {...props} icon="crown" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => router.push('/(screens)/premium')}
          disabled={true}
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
