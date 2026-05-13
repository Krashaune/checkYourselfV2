import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { playlists } from '../constants/playlists';
import { colors, radii } from '../constants/theme';

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
          activeOpacity={0.85}
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
    backgroundColor: colors.parchment,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heading: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.onParchment,
    fontSize: 24,
    marginBottom: 6,
  },
  subheading: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onParchment3,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.cocoa,
    borderRadius: radii.lg,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 30,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.onCocoa,
    fontSize: 16,
    marginBottom: 3,
  },
  cardDescription: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onCocoa2,
    fontSize: 12,
  },
  arrow: {
    fontFamily: 'Nunito_700Bold',
    color: colors.tigerEye,
    fontSize: 26,
  },
});
