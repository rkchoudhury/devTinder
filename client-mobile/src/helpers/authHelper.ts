import { router } from "expo-router";

import api from "../utils/axiosInstance";
import { store } from "../redux/store";
import { updateAccessToken, removeUser, updateUser, updateAuthInitialized } from "../redux/slices/userSlice";
import { getRefreshToken, clearRefreshToken } from "../utils/secureStorage";
import { getUserProfile } from "../services/profileService";

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
