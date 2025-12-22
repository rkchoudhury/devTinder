import { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button } from "react-native-paper";
import type { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { getUserConnections } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import type { IConnectionUser } from "../../models/userModel";
import type { RootState } from "../../redux/store";
import { saveConnections } from "../../redux/slices/connection";
import { UserCard } from "../../components/UserCard";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";

export const Connections = () => {
  const dispatch = useDispatch();
  const connections: IConnectionUser[] = useSelector(
    (state: RootState) => state.connection
  );
  const { loading } = useSelector((state: RootState) => state.loader);

  useEffect(() => {
    const fetchserConnections = async () => {
      try {
        dispatch(showLoader({ message: "Loading Connections..." }));
        const response = await getUserConnections();
        dispatch(saveConnections(response.data));
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
    fetchserConnections();
  }, [dispatch]);

  const onPressConnect = () => {
    router.push("/feed");
  };

  if (loading) {
    return null;
  }

  if (connections?.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="displaySmall">❤️</Text>
        <Text variant="headlineMedium" style={styles.emptyTitle}>
          You have no connections!
        </Text>
        <Text variant="bodyLarge" style={styles.emptySubtitle}>
          Please connect with other devs!
        </Text>
        <Button
          mode="outlined"
          onPress={onPressConnect}
          style={styles.connectButton}
        >
          Connect Me
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <FlatList
        data={connections}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            showButton={false}
            showChatButton={true}
            onPressChat={() => {
              // navigate(ROUTE_NAMES.CHAT, {
              //   state: {
              //     targetUserId: eachConnection._id,
              //   },
              // });
            }}
          />
        )}
        ListHeaderComponent={
          <Text variant="headlineMedium" style={styles.title}>
            My Connections
          </Text>
        }
      />
    </SafeAreaView>
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
  emptyTitle: {
    marginTop: 4,
  },
  emptySubtitle: {
    marginTop: 8,
    textAlign: "center",
  },
  connectButton: {
    marginTop: 8,
  },
  title: {
    textAlign: "center",
    marginVertical: 4,
    fontWeight: "600",
  },
});
