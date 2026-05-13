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
import { colors } from '../constants/theme';

const { width } = Dimensions.get('window');

const slideColors = [colors.sulkAmethyst, colors.sulkRose, colors.sulkSage];

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
            style={[styles.slide, { backgroundColor: slideColors[index % slideColors.length] }]}
          >
            <Text style={styles.quoteMarks}>{'“'}</Text>
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
    backgroundColor: colors.parchment,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingVertical: 48,
  },
  quoteMarks: {
    color: 'rgba(244,230,210,0.18)',
    fontSize: 140,
    lineHeight: 120,
    alignSelf: 'flex-start',
    marginBottom: -24,
    fontFamily: 'CormorantGaramond_400Regular_Italic',
  },
  affirmationText: {
    fontFamily: 'CormorantGaramond_400Regular_Italic',
    color: colors.onCocoa,
    fontSize: 21,
    lineHeight: 32,
    textAlign: 'center',
  },
  author: {
    fontFamily: 'Nunito_400Regular',
    color: colors.onCocoa2,
    fontSize: 13,
    marginTop: 20,
    letterSpacing: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.parchment,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: colors.amethyst,
  },
  dotInactive: {
    backgroundColor: colors.parchmentDeep,
  },
});
