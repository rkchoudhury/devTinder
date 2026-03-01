import {Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {getDeepLinkUrl} from '../deeplinkHelper/linkingHelper';
import { RemoteMessage } from '@react-native-firebase/messaging';

// Use a dedicated channel for foreground local notifications.
// Note: Android channels are immutable once created; changing sound/importance later won't update existing installs.
const ANDROID_CHANNEL_ID = 'foreground';

let channelPromise: Promise<string> | undefined;

const ensureAndroidChannel = (): Promise<string> => {
  if (Platform.OS !== 'android') {
    return Promise.resolve(ANDROID_CHANNEL_ID);
  }

  channelPromise ??= notifee.createChannel({
    id: ANDROID_CHANNEL_ID,
    name: 'Foreground',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  return channelPromise;
};

const getDeepLinkFromNotificationData = (data: unknown): string | null => {
  const deepLink = (data as Record<string, unknown> | null | undefined)
    ?.deepLink;
  return typeof deepLink === 'string' && deepLink.length > 0 ? deepLink : null;
};

const toStringRecord = (data: Record<string, unknown>) => {
  const entries = Object.entries(data).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string',
  );
  return Object.fromEntries(entries);
};

const getTitleBody = (message: RemoteMessage) => {
  const titleFromNotification = message?.notification?.title;
  const bodyFromNotification = message?.notification?.body;
  const titleFromData = message?.data?.title;
  const bodyFromData = message?.data?.content;

  let title = 'Notification';
  if (typeof titleFromNotification === 'string') {
    title = titleFromNotification;
  } else if (typeof titleFromData === 'string') {
    title = titleFromData;
  }

  let body = '';
  if (typeof bodyFromNotification === 'string') {
    body = bodyFromNotification;
  } else if (typeof bodyFromData === 'string') {
    body = bodyFromData;
  }

  return {title, body};
};

const getNotifeeInitialDeepLink = async (): Promise<string | null> => {
  const initialNotification = await notifee.getInitialNotification();
  const deepLink = initialNotification?.notification?.data?.deepLink;
  return typeof deepLink === 'string' && deepLink.length > 0 ? deepLink : null;
};

const showForegroundLocalNotification = async (message: RemoteMessage) => {
  const deepLink = getDeepLinkUrl(message);
  if (!deepLink) {
    return;
  }

  const channelId = await ensureAndroidChannel();
  const {title, body} = getTitleBody(message);

  const data = {
    ...toStringRecord(message?.data ?? {}),
    deepLink,
  };

  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId,
      pressAction: {id: 'default'},
    },
    ios: {
      sound: 'default',
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  });
};

export {
  getDeepLinkFromNotificationData,
  getNotifeeInitialDeepLink,
  showForegroundLocalNotification,
};
