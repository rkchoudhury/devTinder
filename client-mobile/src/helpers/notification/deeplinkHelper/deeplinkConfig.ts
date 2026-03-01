import { LinkingOptions } from "@react-navigation/native";

// ncbdapp://feature1 -> MFE1 -> FeatureScreen1
// ncbdapp://welcome -> Registration -> Welcome
// ncbdapp://notification-inbox -> NotificationInbox 
const deepLinksConfing: LinkingOptions<any>['config'] = {
  screens: {
    MFE1: {
      screens: {
        FeatureScreen1: 'feature1',
        FeatureScreen2: 'feature2',
      },
    },
    Registration: {
      screens: {
        Welcome: 'welcome',
      },
    }
  },
};

export {deepLinksConfing}