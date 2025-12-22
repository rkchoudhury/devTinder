import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PaperProvider } from 'react-native-paper';

import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Stack />
      </PaperProvider>
    </Provider>
  );
}
