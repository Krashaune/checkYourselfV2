import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { emotionCellColors, emotions } from '../constants/emotions';
import { colors, radii } from '../constants/theme';

export default function CheckInScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(label: string) {
    setSelected(label);
  }

  function handleContinue() {
    if (!selected) return;
    router.push({ pathname: '/relief', params: { emotion: selected } });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tap how you feel right now.</Text>

      <FlatList
        data={emotions}
        keyExtractor={(item) => item.label}
        numColumns={4}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isSelected = selected === item.label;
          return (
            <TouchableOpacity
              style={[
                styles.cell,
                { backgroundColor: emotionCellColors[item.color] },
                isSelected && styles.cellSelected,
              ]}
              onPress={() => handleSelect(item.label)}
              activeOpacity={0.75}
            >
              <Text style={styles.cellText} numberOfLines={2}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={[styles.continueButton, selected ? styles.continueActive : styles.continueEmpty]}
        onPress={handleContinue}
        disabled={!selected}
        activeOpacity={0.85}
      >
        <Text style={[styles.continueButtonText, !selected && styles.continueTextEmpty]}>
          {selected ? `I feel ${selected}` : 'Select a feeling'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.parchment,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  heading: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onParchment3,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  grid: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cell: {
    flex: 1,
    marginHorizontal: 3,
    height: 54,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  cellSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
    transform: [{ scale: 1.05 }],
  },
  cellText: {
    fontFamily: 'Nunito_700Bold',
    color: colors.onMood,
    fontSize: 10,
    textAlign: 'center',
  },
  continueButton: {
    marginHorizontal: 12,
    marginBottom: 32,
    paddingVertical: 14,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  continueActive: {
    backgroundColor: colors.amethyst,
  },
  continueEmpty: {
    backgroundColor: colors.parchmentSoft,
  },
  continueButtonText: {
    fontFamily: 'Nunito_700Bold',
    color: colors.onAmethyst,
    fontSize: 16,
  },
  continueTextEmpty: {
    color: colors.onParchmentDis,
  },
});
