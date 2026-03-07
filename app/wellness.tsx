import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { playlists } from '../constants/playlists';

export default function WellnessScreen() {
  const { emotion } = useLocalSearchParams<{ emotion: string }>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Choose your vibe</Text>
      {emotion && (
        <Text style={styles.subheading}>
          A little music for when you feel {emotion?.toLowerCase()}
        </Text>
      )}

      {playlists.map((playlist) => (
        <TouchableOpacity
          key={playlist.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/music',
              params: { playlistId: playlist.id, playlistName: playlist.label },
            })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.cardEmoji}>{playlist.emoji}</Text>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{playlist.label}</Text>
            <Text style={styles.cardDescription}>{playlist.description}</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heading: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    color: '#aaaaaa',
    fontSize: 14,
    marginBottom: 32,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 36,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#888888',
    fontSize: 13,
  },
  arrow: {
    color: '#1DB954',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
