import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";

import type { RootState } from "../redux/store";
import { hideAlert } from "../redux/slices/alertSlice";
import { AlertType } from "../enums/AlertEnum";

export const ToastAlert = () => {
  const dispatch = useDispatch();
  const {
    message,
    showAlert,
    duration,
    type = AlertType.Error,
  } = useSelector((state: RootState) => state.alert);

  const onDismiss = () => {
    dispatch(hideAlert());
  };

  return (
    <View style={styles.container}>
      <Snackbar
        visible={showAlert && !!message?.length}
        onDismiss={onDismiss}
        duration={duration}
        style={[styles.snackbar, styles[type] ?? {}]}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 180,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  snackbar: {
    marginHorizontal: 16,
  },
  [AlertType.Success]: {
    backgroundColor: "#4caf50",
  },
  [AlertType.Error]: {
    backgroundColor: "#f44336",
  },
  [AlertType.Warning]: {
    backgroundColor: "#ff9800",
  },
  [AlertType.Info]: {
    backgroundColor: "#2196f3",
  },
});
