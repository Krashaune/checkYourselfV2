import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Track {
  name: string;
  artist: string;
  uri: string;
}

export default function MusicScreen() {
  const { playlistId, playlistName } = useLocalSearchParams<{
    playlistId: string;
    playlistName: string;
  }>();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (playlistId) {
      fetchTracks();
      fetchPlaylistUrl();
    }
  }, [playlistId]);

  async function getToken() {
    const token = await AsyncStorage.getItem('spotify_token');
    if (!token) {
      router.replace('/login');
      return null;
    }
    return token;
  }

  async function fetchTracks() {
    const token = await getToken();
    if (!token) return;

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.status === 401) {
      await AsyncStorage.multiRemove(['spotify_token', 'spotify_token_expiry']);
      router.replace('/login');
      return;
    }

    if (!response.ok) {
      setError('Could not load tracks. Check your Spotify connection.');
      setLoading(false);
      return;
    }

    const data = await response.json();
    const parsed: Track[] = (data.items ?? [])
      .filter((item: any) => item.track)
      .map((item: any) => ({
        name: item.track.name,
        artist: item.track.artists?.map((a: any) => a.name).join(', ') ?? '',
        uri: item.track.uri,
      }));

    setTracks(parsed);
    setLoading(false);
  }

  async function fetchPlaylistUrl() {
    const token = await getToken();
    if (!token) return;

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!response.ok) return;

    const data = await response.json();
    const url = data.external_urls?.spotify;
    if (url) setPlaylistUrl(url);
  }

  async function openPlaylist() {
    const spotifyDeepLink = `spotify://playlist/${playlistId}`;
    try {
      const canOpen = await Linking.canOpenURL(spotifyDeepLink);
      if (canOpen) {
        await Linking.openURL(spotifyDeepLink);
        return;
      }
    } catch {
      // TODO: Handle error (e.g. log it) - 
      // fallback to web URL if deep link fails
      // scheme not in LSApplicationQueriesSchemes or Spotify not installed
    }
    if (playlistUrl) {
      Linking.openURL(playlistUrl);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Loading tracks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.playlistLabel}>{playlistName} Playlist</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.trackRow}>
            <Text style={styles.trackNumber}>{index + 1}</Text>
            <View style={styles.trackInfo}>
              <Text style={styles.trackName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.trackArtist} numberOfLines={1}>
                {item.artist}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={openPlaylist}
        >
          <Text style={styles.playButtonText}>Open in Spotify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  centered: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: '#aaaaaa',
    fontSize: 14,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  playlistLabel: {
    color: '#888888',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#222244',
  },
  trackNumber: {
    color: '#555555',
    fontSize: 13,
    width: 28,
    textAlign: 'center',
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  trackArtist: {
    color: '#888888',
    fontSize: 13,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#222244',
  },
  playButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
