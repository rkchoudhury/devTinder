import { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-paper";
import type { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "../../components/UserCard";
import type { RootState } from "../../redux/store";
import { getFeed } from "../../services/userService";
import { showAlert } from "../../redux/slices/alertSlice";
import { addFeed, updateFeed } from "../../redux/slices/feedSlice";
import { sendRequest } from "../../services/requestService";
import { AlertType } from "../../enums/AlertEnum";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.feed);
  const user = useSelector((state: RootState) => state.user.data);
  const { loading } = useSelector((state: RootState) => state.loader);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        dispatch(showLoader({ message: 'Loading...' }));
        const response = await getFeed();
        dispatch(addFeed(response));
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
    fetchFeed();
  }, [dispatch]);

  const handleSendRequest = async (status: string, userId: string) => {
    try {
      const response = await sendRequest(status, userId);
      dispatch(updateFeed(response));
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

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="displaySmall">⚠️</Text>
        <Text variant="headlineMedium">Something went wrong!</Text>
      </View>
    );
  }

  if (list?.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text variant="displaySmall">❤️</Text>
        <Text variant="headlineMedium">No new connection available!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            showButton
            onPressButton={handleSendRequest}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Feed;
