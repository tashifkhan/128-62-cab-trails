import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

interface ScrollPickerProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  steps?: number;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

export default function ScrollPicker({
  value,
  onChange,
  min,
  max,
  steps = 1,
}: ScrollPickerProps) {
  const theme = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrolling, setScrolling] = useState(false);

  const numbers = React.useMemo(() => {
    const count = Math.floor((max - min) / steps) + 1;
    return Array.from({ length: count }, (_, i) => min + i * steps);
  }, [min, max, steps]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const newValue = numbers[index];

    if (newValue !== value && !scrolling) {
      onChange(newValue);
      if (Platform.OS !== 'web') {
        Haptics.selectionAsync();
      }
    }
  };

  const handleScrollBegin = () => setScrolling(true);
  const handleScrollEnd = () => setScrolling(false);

  React.useEffect(() => {
    if (!scrolling && scrollViewRef.current) {
      const index = numbers.indexOf(value);
      scrollViewRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
    }
  }, [value, scrolling]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.highlight,
          {
            borderColor: theme.colors.primary,
            backgroundColor: theme.colors.primary + '10',
          },
        ]}
      />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * ((VISIBLE_ITEMS - 1) / 2),
        }}
      >
        {numbers.map((num) => (
          <View key={num} style={styles.item}>
            <Text
              style={[
                styles.number,
                {
                  color:
                    num === value
                      ? theme.colors.primary
                      : theme.colors.onSurface + '80',
                  fontWeight: num === value ? '600' : '400',
                },
              ]}
            >
              {num.toString().padStart(2, '0')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: 60,
  },
  highlight: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderRadius: 8,
    borderWidth: 2,
    zIndex: -1,
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 24,
  },
});
