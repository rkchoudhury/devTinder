import {Linking} from 'react-native';
import notifee, {EventType, type Event} from '@notifee/react-native';
import {getDeepLinkFromNotificationData} from './notifeeHelper';

export const registerNotifeePressHandlers = (): void => {
  const handlePress = async (data: unknown) => {
    const deepLink = getDeepLinkFromNotificationData(data);
    if (!deepLink) {
      return;
    }

    await Linking.openURL(deepLink);
  };

  notifee.onForegroundEvent(async ({type, detail}: Event) => {
    if (type === EventType.PRESS) {
      await handlePress(detail.notification?.data);
    }
  });

  notifee.onBackgroundEvent(async ({type, detail}: Event) => {
    if (type === EventType.PRESS) {
      await handlePress(detail.notification?.data);
    }
  });
};

// Register immediately when this module is imported.
registerNotifeePressHandlers();
