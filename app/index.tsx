import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

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
      <Text style={styles.wordmark}>CheckYourself</Text>
      <Text style={styles.tagline}>check in with yourself</Text>
      <ActivityIndicator size="small" color={colors.amethyst} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {
    fontFamily: 'Caveat_700Bold',
    fontSize: 46,
    color: colors.onParchment,
    letterSpacing: 0.9,
  },
  tagline: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 11,
    color: colors.onParchment3,
    marginTop: 6,
    letterSpacing: 3.3,
    textTransform: 'uppercase',
  },
  spinner: {
    marginTop: 40,
  },
});
