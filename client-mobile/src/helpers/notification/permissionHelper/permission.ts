import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  ANDROID_VERSIONS,
  isAndroid,
  isIOS,
  MapAndroidPermissionResult,
  MapFirebaseAuthStatus,
} from './constants';
import { NotificationPermissionStatus } from './enums';

/**
 * Determines if runtime permission is required for push notifications.
 *
 * On Android devices running Tiramisu (API level 33) or higher, runtime permission
 * is required to display push notifications. This function checks if the current platform meets these criteria.
 *
 * @returns {boolean} `true` if the device is Android and running version Tiramisu or higher, `false` otherwise.
 */
const requiresRuntimePermission = (): boolean => {
  return isAndroid && Number(Platform.Version) >= ANDROID_VERSIONS.TIRAMISU;
};

/**
 * Checks the current notification permission status for the device.
 *
 * This function handles platform-specific permission checking:
 * - **iOS**: Uses Firebase Remote Messaging to check authorization status
 * - **Android**:
 *   - For Android 13+ (API level 33+): Checks POST_NOTIFICATIONS runtime permission
 *   - For Android < 13: Returns Granted by default (no runtime permission required)
 *
 * @returns A promise that resolves to a {@link NotificationPermissionStatus} indicating:
 * - `Granted`: User has granted notification permissions
 * - `Denied`: User has denied notification permissions
 * - `Unavailable`: Platform is unsupported or an error occurred during permission check
 *
 */
const checkNotificationPermission =
  async (): Promise<NotificationPermissionStatus> => {
    try {
      if (isIOS) {
        const authStatus = await messaging().hasPermission();
        return MapFirebaseAuthStatus[authStatus];
      }

      if (isAndroid) {
        if (requiresRuntimePermission()) {
          const isGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          return isGranted
            ? NotificationPermissionStatus.Granted
            : NotificationPermissionStatus.Denied;
        }
        // Android < 13 doesn't require runtime permission
        return NotificationPermissionStatus.Granted;
      }

      return NotificationPermissionStatus.Unavailable;
    } catch {
      return NotificationPermissionStatus.Unavailable;
    }
  };

/**
 * Requests notification permission from the user based on the platform (iOS or Android).
 *
 * @remarks
 * - For iOS: Uses Firebase remote messaging to request permission and maps the result to NotificationPermissionStatus
 * - For Android 13+: Requests POST_NOTIFICATIONS runtime permission
 * - For Android <13: Automatically returns Granted as runtime permission is not required
 * - For other platforms: Returns Unavailable
 * - If an error occurs during the permission request, the function returns `NotificationPermissionStatus.Denied`
 *
 * @returns A promise that resolves to a {@link NotificationPermissionStatus} indicating the permission state:
 * - `Granted`: User has granted notification permission
 * - `Denied`: User has denied notification permission or an error occurred
 * - `Unavailable`: Platform does not support notifications
 *
 */
const requestNotificationPermission =
  async (): Promise<NotificationPermissionStatus> => {
    try {
      if (isIOS) {
        const authStatus = await messaging().requestPermission();
        return MapFirebaseAuthStatus[authStatus];
      }

      if (isAndroid) {
        if (requiresRuntimePermission()) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          return (
            MapAndroidPermissionResult[result] ??
            NotificationPermissionStatus.Denied
          );
        }
        // Android < 13 doesn't require runtime permission
        return NotificationPermissionStatus.Granted;
      }

      return NotificationPermissionStatus.Unavailable;
    } catch {
      return NotificationPermissionStatus.Denied;
    }
  };

export {
  checkNotificationPermission,
  requestNotificationPermission,
  requiresRuntimePermission,
};
