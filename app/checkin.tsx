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
        style={[styles.continueButton, !selected && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!selected}
      >
        <Text style={styles.continueButtonText}>
          {selected ? `I feel ${selected}` : 'Select a feeling'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  heading: {
    color: '#cccccc',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
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
    height: 64,
    borderRadius: 8,
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
    color: '#1a1a2e',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#1DB954',
    marginHorizontal: 12,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#333333',
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
