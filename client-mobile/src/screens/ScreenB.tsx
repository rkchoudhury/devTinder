import { View, Text, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';

export default function ScreenB() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen B</Text>
      <Text style={styles.subtitle}>This is Screen B</Text>
      
      <Button 
        title="Go to Screen A" 
        onPress={() => router.push('/ScreenA')} 
      />
      
      <View style={styles.spacer} />
      
      <Button 
        title="Go Back" 
        onPress={() => router.back()} 
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
  spacer: {
    height: 10,
  },
});
