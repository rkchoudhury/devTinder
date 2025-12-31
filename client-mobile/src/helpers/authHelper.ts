import { router } from "expo-router";

import api from "../utils/axiosInstance";
import { store } from "../redux/store";
import { updateAccessToken, removeUser, updateUser, updateAuthInitialized } from "../redux/slices/userSlice";
import { getRefreshToken, clearRefreshToken } from "../utils/secureStorage";
import { getUserProfile } from "../services/profileService";

/**
 * Automatic Login if user has a valid refresh token.
 * 
 * 1. Retrieve the refresh token from the secure storage.
 * 2. If refresh token is not there, return and starts with the Login Screen.
 * 3. If refresh token is available, generate access token using `/auth/refresh` API.
 *      - If refresh token is invalid/expired, It goes to catch block. Clear the refresh token and starts with the Login Screen.
 * 4. Once access token available, save the access token in redux store.
 * 5. Fetch the user data and update the redux store. [As upon login we are receiving the user resoponse and we are updating the redux store]
 * 6. Then navigate to the Feed Screen.
 * 
 * - `authInitialized`: Using this value we are hiding the Splash Screen
 */
export const bootstrapAuth = async () => {
    try {
        const refreshToken = await getRefreshToken();

        // No refresh token found
        if (!refreshToken) {
            return;
        }

        // Try to restore session
        const { data } = await api.post("/auth/refresh", {
            refreshToken,
        });
        store.dispatch(updateAccessToken(data.accessToken));

        const response = await getUserProfile();
        store.dispatch(updateUser(response?.data));
        router.replace("/feed");
    } catch (error) {
        console.log('refresh token error', error);
        // Refresh token invalid / expired
        await clearRefreshToken();
        store.dispatch(removeUser());
        router.replace("/");
    } finally {
        store.dispatch(updateAuthInitialized(true));
    }
};
