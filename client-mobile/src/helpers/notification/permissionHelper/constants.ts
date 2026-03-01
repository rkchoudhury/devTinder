import { Platform } from 'react-native';
import { AuthorizationStatus, NotificationPermissionStatus } from './enums';

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const ANDROID_VERSIONS = {
  TIRAMISU: 33, // Android 13 - Introduced POST_NOTIFICATIONS permission
};

/**
 * Maps Firebase authorization status values to notification NotificationPermissionStatus enum values.
 *
 * @platform iOS
 *
 * @remarks
 * The mapping includes the following conversions:
 * - AUTHORIZED → Granted: User has explicitly granted notification permissions
 * - PROVISIONAL → Limited: User has provisional authorization (iOS specific)
 * - DENIED → Denied: User has explicitly denied notification permissions
 * - NOT_DETERMINED → Unavailable: Permission status has not been determined yet
 * - EPHEMERAL → Limited: Temporary authorization for ephemeral notifications
 *
 * @internal
 */
const MapFirebaseAuthStatus: Record<
  (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus],
  NotificationPermissionStatus
> = {
  [AuthorizationStatus.AUTHORIZED]: NotificationPermissionStatus.Granted,
  [AuthorizationStatus.PROVISIONAL]: NotificationPermissionStatus.Limited,
  [AuthorizationStatus.DENIED]: NotificationPermissionStatus.Denied,
  [AuthorizationStatus.NOT_DETERMINED]:
    NotificationPermissionStatus.Unavailable,
  [AuthorizationStatus.EPHEMERAL]: NotificationPermissionStatus.Limited,
};

/**
 * Maps Android permission result strings to NotificationPermissionStatus enum values.
 *
 * @platform Android
 *
 * @internal
 */
const MapAndroidPermissionResult: Record<string, NotificationPermissionStatus> =
  {
    granted: NotificationPermissionStatus.Granted,
    never_ask_again: NotificationPermissionStatus.Blocked,
    denied: NotificationPermissionStatus.Denied,
  };

export {
  isAndroid,
  isIOS,
  ANDROID_VERSIONS,
  MapFirebaseAuthStatus,
  MapAndroidPermissionResult,
};
