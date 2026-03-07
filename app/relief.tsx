import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReliefScreen() {
  const { emotion } = useLocalSearchParams<{ emotion: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.emotionBadge}>
        <Text style={styles.emotionLabel}>You feel</Text>
        <Text style={styles.emotionText}>{emotion}</Text>
      </View>

      <Text style={styles.prompt}>What would help you right now?</Text>

      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.optionCard, styles.wellnessCard]}
          onPress={() => router.push({ pathname: '/wellness', params: { emotion } })}
        >
          <Text style={styles.optionEmoji}>🎵</Text>
          <Text style={styles.optionTitle}>Music</Text>
          <Text style={styles.optionDescription}>
            Let me pick a playlist that matches your mood
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, styles.sulkCard]}
          onPress={() => router.push('/sulk')}
        >
          <Text style={styles.optionEmoji}>💭</Text>
          <Text style={styles.optionTitle}>Affirmations</Text>
          <Text style={styles.optionDescription}>
            Sometimes you just need a moment with yourself
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  emotionBadge: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  emotionLabel: {
    color: '#888888',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },
  emotionText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  prompt: {
    color: '#cccccc',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  options: {
    flex: 1,
    gap: 16,
  },
  optionCard: {
    flex: 1,
    borderRadius: 20,
    padding: 28,
    justifyContent: 'center',
  },
  wellnessCard: {
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  sulkCard: {
    backgroundColor: '#16213e',
    borderWidth: 1,
    borderColor: '#9b59b6',
  },
  optionEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  optionTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionDescription: {
    color: '#aaaaaa',
    fontSize: 14,
    lineHeight: 22,
  },
});
