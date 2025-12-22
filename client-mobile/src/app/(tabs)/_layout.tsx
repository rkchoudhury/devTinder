import { TouchableOpacity, StyleSheet } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState } from '@/src/redux/store';
import { IUser } from '@/src/models/userModel';

export default function TabLayout() {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user) as IUser | null;
    const uri = user?.photoUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    return (
        <Tabs
            screenOptions={{
                headerTitle: `Welcome, ${user?.firstName}`,
                headerRight: () => (
                    <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileIconContainer}>
                        <Avatar.Image
                            source={{ uri }}
                            size={36}
                        />
                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cards" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="connection"
                options={{
                    tabBarLabel: 'Connections',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-group" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="connectionRequest"
                options={{
                    tabBarLabel: 'Requests',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-clock" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cog" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    profileIconContainer: {
        marginRight: 12
    },
});