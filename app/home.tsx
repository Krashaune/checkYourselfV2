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
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.hi}>Hi,</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.prompt}>How are you feeling today?</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.checkinButton}
          onPress={() => router.push('/checkin')}
        >
          <Text style={styles.checkinButtonText}>Check In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  centered: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    flex: 1,
    justifyContent: 'center',
  },
  hi: {
    fontSize: 24,
    color: '#aaaaaa',
    fontWeight: '300',
  },
  username: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  prompt: {
    fontSize: 18,
    color: '#cccccc',
    marginTop: 16,
    lineHeight: 26,
  },
  actions: {
    gap: 16,
  },
  checkinButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  checkinButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444444',
  },
  logoutButtonText: {
    color: '#888888',
    fontSize: 15,
  },
});
