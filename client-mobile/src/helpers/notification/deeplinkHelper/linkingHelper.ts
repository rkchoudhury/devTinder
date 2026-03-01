import messaging, { RemoteMessage } from '@react-native-firebase/messaging';
import {
  getNotifeeInitialDeepLink,
  showForegroundLocalNotification,
} from '../notifeeHelper/notifeeHelper';

const getDeepLinkUrl = (message: RemoteMessage | null): string | null => {
  const deepLink = message?.data?.deepLink;
  return typeof deepLink === 'string' && deepLink?.length > 0 ? deepLink : null;
};

/**
 * Listen to firebase push notifications received in foreground state
 *
 * - Since these notifications do not trigger the default notification behavior, we show a local notification using Notifee.
 * - When the user taps on the notification, the app will open and navigate to the deep link specified in the push notification data.
 */
const subscribeToForegroundMessages = () => {
  const unsubscribeForegroundMessage = messaging().onMessage(
    async message => {
      await showForegroundLocalNotification(message);
    },
  );
  return unsubscribeForegroundMessage;
};

/**
 * Listen to firebase push notifications that open the app from background state
 */
const subscribeToBackgroundMessages = (listener: (url: string) => void) => {
  const unsubscribeNotification = messaging().onNotificationOpenedApp(
    message => {
      const deepLink = getDeepLinkUrl(message);
      if (!deepLink) {
        return;
      }

      listener(deepLink);
    },
  );
  return unsubscribeNotification;
};

/**
 * Listen to firebase push notifications that open the app from killed state
 */
const handleInitialNotification = async () => {
  // Check if the app was opened by tapping a Notifee local notification
  const notifeeDeepLink = await getNotifeeInitialDeepLink();
  if (notifeeDeepLink) {
    return notifeeDeepLink;
  }

  // Check if there is an initial firebase notification
  const message = await messaging().getInitialNotification();

  // Get deep link from data
  // if this is undefined, the app will open the default/home page
  return getDeepLinkUrl(message);
};

export {
  getDeepLinkUrl,
  subscribeToForegroundMessages,
  subscribeToBackgroundMessages,
  handleInitialNotification,
};
