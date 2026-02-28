import * as SecureStore from 'expo-secure-store';

async function saveRefreshToken(value: string) {
    await SecureStore.setItemAsync('refreshToken', value);
}

async function getRefreshToken() {
    const result = await SecureStore.getItemAsync('refreshToken');
    return result;
}

async function clearRefreshToken() {
    await SecureStore.deleteItemAsync('refreshToken');
}

async function saveNotificationsEnabled(value: boolean) {
    await SecureStore.setItemAsync('notificationsEnabled', value ? 'true' : 'false');
}

async function getNotificationsEnabled() {
    const result = await SecureStore.getItemAsync('notificationsEnabled');
    if (result == null) return null;
    return result === 'true';
}


export {
    saveRefreshToken,
    getRefreshToken,
    clearRefreshToken,
    saveNotificationsEnabled,
    getNotificationsEnabled,
};