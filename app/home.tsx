import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radii } from '../constants/theme';

export default function HomeScreen() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const token = await AsyncStorage.getItem('spotify_token');
    if (!token) {
      router.replace('/login');
      return;
    }

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      await AsyncStorage.multiRemove(['spotify_token', 'spotify_token_expiry']);
      router.replace('/login');
      return;
    }

    const data = await response.json();
    setUsername(data.display_name || data.id);
    setLoading(false);
  }

  async function handleLogout() {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.multiRemove([
            'spotify_token',
            'spotify_token_expiry',
            'spotify_refresh_token',
          ]);
          router.replace('/login');
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.amethyst} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.greeting}>
          <Text style={styles.hi}>Hi,</Text>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.prompt}>How are you feeling today?</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.checkinButton}
            onPress={() => router.push('/checkin')}
            activeOpacity={0.85}
          >
            <Text style={styles.checkinButtonText}>Check In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.parchment,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 14,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchmentDeep,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
    color: colors.onParchment,
  },
  body: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 40,
  },
  greeting: {
    flex: 1,
    justifyContent: 'center',
  },
  hi: {
    fontFamily: 'Nunito_300Light',
    fontSize: 22,
    color: colors.onParchment3,
  },
  username: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 36,
    color: colors.onParchment,
    marginTop: 4,
  },
  prompt: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 17,
    color: colors.onParchment2,
    marginTop: 14,
    lineHeight: 26,
  },
  actions: {
    gap: 12,
  },
  checkinButton: {
    backgroundColor: colors.amethyst,
    paddingVertical: 16,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  checkinButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: colors.onAmethyst,
    fontSize: 17,
  },
  logoutButton: {
    backgroundColor: colors.parchmentSoft,
    paddingVertical: 12,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onParchment3,
    fontSize: 14,
  },
});
