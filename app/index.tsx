import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = await AsyncStorage.getItem('spotify_token');
    const expiry = await AsyncStorage.getItem('spotify_token_expiry');

    const isValid = token && expiry && Date.now() < parseInt(expiry, 10);

    if (isValid) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CheckYourself</Text>
      <Text style={styles.subtitle}>check in with yourself</Text>
      <ActivityIndicator size="large" color="#1DB954" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  spinner: {
    marginTop: 40,
  },
});
