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
import { colors, radii } from '../constants/theme';

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
      // fallback to web URL if deep link fails
    }
    if (playlistUrl) {
      Linking.openURL(playlistUrl);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.amethyst} />
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
          activeOpacity={0.8}
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
    backgroundColor: colors.parchment,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.parchment,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onParchment3,
    fontSize: 14,
  },
  errorText: {
    fontFamily: 'Nunito_400Regular',
    color: colors.error,
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
    fontFamily: 'Nunito_700Bold',
    color: colors.onParchment3,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2.75,
    marginBottom: 20,
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.parchmentDeep,
  },
  trackNumber: {
    fontFamily: 'JetBrainsMono_400Regular',
    color: colors.onParchment4,
    fontSize: 12,
    width: 26,
    textAlign: 'center',
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackName: {
    fontFamily: 'Nunito_700Bold',
    color: colors.onParchment,
    fontSize: 14,
    marginBottom: 2,
  },
  trackArtist: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onParchment3,
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.parchment,
    borderTopWidth: 1,
    borderTopColor: colors.parchmentDeep,
  },
  playButton: {
    backgroundColor: colors.amethyst,
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  playButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: colors.onAmethyst,
    fontSize: 15,
  },
});
