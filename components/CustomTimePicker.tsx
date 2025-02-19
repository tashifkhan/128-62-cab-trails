import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import ScrollPicker from './ScrollPicker';

const START_HOUR = 7;
const END_HOUR = 18;
const MINUTE_STEP = 15;

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export default function CustomTimePicker({
  value,
  onChange,
  onClose,
}: TimePickerProps) {
  const theme = useTheme();
  const [hours, setHours] = React.useState(() => {
    const h = value.getHours();
    return h < START_HOUR ? START_HOUR : h > END_HOUR ? END_HOUR : h;
  });
  const [minutes, setMinutes] = React.useState(() => {
    const m = value.getMinutes();
    return Math.round(m / MINUTE_STEP) * MINUTE_STEP;
  });

  const updateTime = (newHours: number, newMinutes: number) => {
    if (newHours > END_HOUR || (newHours === END_HOUR && newMinutes > 30)) {
      newHours = END_HOUR;
      newMinutes = 30;
    }
    if (newHours < START_HOUR) {
      newHours = START_HOUR;
      newMinutes = 0;
    }

    const newDate = new Date(value);
    newDate.setHours(newHours);
    newDate.setMinutes(newMinutes);
    onChange(newDate);
  };

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={[styles.title, { color: theme.colors.primary }]}
      >
        Select Time
      </Text>
      <View style={styles.pickerContainer}>
        <ScrollPicker
          value={hours}
          onChange={(h) => {
            setHours(h);
            updateTime(h, minutes);
          }}
          min={START_HOUR}
          max={END_HOUR}
        />
        <Text style={[styles.separator, { color: theme.colors.primary }]}>
          :
        </Text>
        <ScrollPicker
          value={minutes}
          onChange={(m) => {
            setMinutes(m);
            updateTime(hours, m);
          }}
          min={0}
          max={hours === END_HOUR ? 30 : 59}
          steps={MINUTE_STEP}
        />
      </View>
      <Button mode="contained" onPress={onClose} style={styles.button}>
        Confirm
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 24,
    fontWeight: '600',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  separator: {
    fontSize: 36,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  button: {
    minWidth: 120,
    borderRadius: 12,
  },
  webTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    backgroundColor: 'transparent',
  },
});
