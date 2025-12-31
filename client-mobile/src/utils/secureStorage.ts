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


export { saveRefreshToken, getRefreshToken, clearRefreshToken };