import { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { affirmations } from '../constants/affirmations';

const { width } = Dimensions.get('window');

const slideColors = ['#2c1654', '#1a3a5c', '#1a3a2a'];

export default function SulkScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const page = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(page);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {affirmations.map((item, index) => (
          <View
            key={index}
            style={[styles.slide, { backgroundColor: slideColors[index] ?? '#16213e' }]}
          >
            <Text style={styles.quoteMarks}>"</Text>
            <Text style={styles.affirmationText}>{item.text}</Text>
            {item.author && <Text style={styles.author}>{item.author}</Text>}
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {affirmations.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  quoteMarks: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 120,
    lineHeight: 100,
    alignSelf: 'flex-start',
    marginBottom: -20,
  },
  affirmationText: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 34,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  author: {
    color: '#aaaaaa',
    fontSize: 14,
    marginTop: 24,
    letterSpacing: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#ffffff',
  },
  dotInactive: {
    backgroundColor: '#444444',
  },
});
