import {Linking} from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
import {deepLinksConfing} from './deeplinkConfig';
import {
  handleInitialNotification,
  subscribeToBackgroundMessages,
  subscribeToForegroundMessages,
} from './linkingHelper';

const linking: LinkingOptions<any> = {
  prefixes: ['ncbdapp://'],
  config: deepLinksConfing,
  /**
   * Listen to firebase push notifications that open the app from killed state
   *
   * Get the initial URL that opened the app. This can be a deep link, a Notifee notification, or a Firebase notification.
   * @returns The initial URL or null if none is found.
   */
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Handle notifications from killed state (both Notifee and Firebase)
    const initialNotificationDeepLink = await handleInitialNotification();
    return initialNotificationDeepLink;
  },
  subscribe(listener) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    /**
     * Listen to firebase push notifications that open the app from background state
     */
    const unsubscribeBackgroundMessages =
      subscribeToBackgroundMessages(listener);

    /**
     * Listen to firebase push notifications received in foreground state
     */
    const unsubscribeForegroundMessages = subscribeToForegroundMessages();

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
      unsubscribeBackgroundMessages();
      unsubscribeForegroundMessages();
    };
  },
};

export {linking};
