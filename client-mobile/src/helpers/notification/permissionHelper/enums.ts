import messaging from '@react-native-firebase/messaging';

// Export enums
const AuthorizationStatus = messaging.AuthorizationStatus;
const NotificationAndroidPriority = messaging.NotificationAndroidPriority;
const NotificationAndroidVisibility = messaging.NotificationAndroidVisibility;

/**
 * Represents the possible permission states for push notifications.
 *
 * @property Granted - Permission has been explicitly granted by the user
 * @property Denied - Permission has been explicitly denied by the user
 * @property Blocked - Permission is blocked and cannot be requested again
 * @property Unavailable - Notification permissions are not available on this platform/browser
 * @property Limited - Permission is granted but with limitations or restrictions
 */
enum NotificationPermissionStatus {
  Granted = 'granted',
  Denied = 'denied',
  Blocked = 'blocked',
  Unavailable = 'unavailable',
  Limited = 'limited',
}

export {
  AuthorizationStatus,
  NotificationAndroidPriority,
  NotificationAndroidVisibility,
  NotificationPermissionStatus,
};
