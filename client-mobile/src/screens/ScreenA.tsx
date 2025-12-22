import { View, Text, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

export default function ScreenA() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen A</Text>
      <Text style={styles.subtitle}>This is Screen A</Text>
      
      <Button 
        title="Go to Screen B" 
        onPress={() => router.push('/ScreenB')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});
