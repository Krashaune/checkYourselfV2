import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radii } from '../constants/theme';

export default function ReliefScreen() {
  const { emotion } = useLocalSearchParams<{ emotion: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.emotionBadge}>
        <Text style={styles.emotionEyebrow}>YOU FEEL</Text>
        <Text style={styles.emotionText}>{emotion}</Text>
      </View>

      <Text style={styles.prompt}>What would help you right now?</Text>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push({ pathname: '/wellness', params: { emotion } })}
          activeOpacity={0.85}
        >
          <Text style={styles.optionEmoji}>🎵</Text>
          <Text style={styles.optionTitle}>Music</Text>
          <Text style={styles.optionDescription}>
            Let me pick a playlist that matches your mood
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push('/sulk')}
          activeOpacity={0.85}
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
    backgroundColor: colors.parchment,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  emotionBadge: {
    backgroundColor: colors.cocoaDeep,
    borderRadius: radii.lg,
    paddingVertical: 18,
    paddingHorizontal: 22,
    alignItems: 'center',
    marginBottom: 24,
  },
  emotionEyebrow: {
    fontFamily: 'Nunito_600SemiBold',
    color: colors.onCocoa2,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2.75,
    marginBottom: 6,
  },
  emotionText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.onCocoa,
    fontSize: 30,
  },
  prompt: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onParchment2,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  options: {
    flex: 1,
    gap: 14,
  },
  optionCard: {
    flex: 1,
    backgroundColor: colors.cocoa,
    borderRadius: radii.xl,
    padding: 22,
    justifyContent: 'center',
  },
  optionEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  optionTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    color: colors.onCocoa,
    fontSize: 20,
    marginBottom: 6,
  },
  optionDescription: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onCocoa2,
    fontSize: 13,
    lineHeight: 19,
  },
});
