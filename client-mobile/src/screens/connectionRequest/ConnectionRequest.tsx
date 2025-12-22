import { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import type { AxiosError } from "axios";

import { getConnectionRequests } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import type { RootState } from "../../redux/store";
import {
  addConnectionRequest,
  removeConnectionRequest,
} from "../../redux/slices/connectionRequests";
import { ConnectionCard } from "../../components/ConnectionCard";
import type { IConnection } from "../../models/connectionModel";
import { AlertType } from "../../enums/AlertEnum";
import { reviewRequest } from "../../services/requestService";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";

export const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const requests: IConnection[] = useSelector(
    (state: RootState) => state.connectionRequest
  );
  const { loading } = useSelector((state: RootState) => state.loader);

  useEffect(() => {
    const fetchConnectionReqests = async () => {
      try {
        dispatch(showLoader({ message: "Loading Connection Requests..." }));
        const response = await getConnectionRequests();
        dispatch(addConnectionRequest(response.data));
      } catch (error) {
        const axiosError = error as AxiosError;
        dispatch(
          showAlert({
            showAlert: true,
            message: axiosError?.message,
            duration: 5000,
          })
        );
      } finally {
        dispatch(hideLoader());
      }
    };
    fetchConnectionReqests();
  }, [dispatch]);

  const handleReviewRequest = async (status: string, requestId: string) => {
    try {
      const response = await reviewRequest(status, requestId);
      dispatch(removeConnectionRequest(response.data));
      dispatch(
        showAlert({
          showAlert: true,
          message: response?.message,
          duration: 3000,
          type: AlertType.Success,
        })
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      dispatch(
        showAlert({
          showAlert: true,
          message: axiosError?.message,
          duration: 5000,
        })
      );
    }
  };

  if (loading) {
    return null;
  }

  if (requests?.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="displaySmall">❤️</Text>
        <Text variant="headlineMedium" style={styles.emptyText}>
          No new connection request found!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ConnectionCard
            key={item?._id}
            requestId={item?._id}
            connectionFrom={item?.fromUserId}
            onPressButton={handleReviewRequest}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: 8,
    textAlign: "center",
  },
});
