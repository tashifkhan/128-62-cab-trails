import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  Text,
  Button,
  SegmentedButtons,
  Card,
  useTheme,
  Surface,
  Portal,
  Modal,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TRANSPORT_OPTIONS = [
  { label: 'Auto', value: 'auto', capacity: 3 },
  { label: 'Cab', value: 'cab', capacity: 4 },
  { label: 'XL Cab', value: 'xl', capacity: 6 },
];

export default function CreateRideScreen() {
  const [route, setRoute] = useState('62to128');
  const [transport, setTransport] = useState('auto');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [vacancy, setVacancy] = useState(1);
  const theme = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const currentTransport = TRANSPORT_OPTIONS.find((t) => t.value === transport);
  const maxVacancy = currentTransport ? currentTransport.capacity - 1 : 0;

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <View style={styles.header}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Create Ride
          </Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.outline }}>
            Share your journey with others
          </Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Surface style={styles.formContainer} elevation={1}>
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Route Details
              </Text>
              <SegmentedButtons
                value={route}
                onValueChange={setRoute}
                buttons={[
                  {
                    value: '62to128',
                    label: 'JIIT-62 → 128',
                    icon: 'arrow-right',
                  },
                  {
                    value: '128to62',
                    label: 'JIIT-128 → 62',
                    icon: 'arrow-left',
                  },
                ]}
                style={styles.segmentedButton}
              />
            </View>

            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Transport Type
              </Text>
              <View style={styles.transportContainer}>
                {TRANSPORT_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setTransport(opt.value)}
                    style={[
                      styles.transportOption,
                      transport === opt.value && styles.transportOptionSelected,
                      { borderColor: theme.colors.primary },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={opt.value === 'auto' ? 'rickshaw' : 'car'}
                      size={24}
                      color={
                        transport === opt.value
                          ? theme.colors.primary
                          : theme.colors.outline
                      }
                    />
                    <Text
                      style={[
                        styles.transportText,
                        {
                          color:
                            transport === opt.value
                              ? theme.colors.primary
                              : theme.colors.onSurface,
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                    <Text style={styles.capacityText}>
                      {opt.capacity} seats
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Time & Vacancy
              </Text>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={styles.timeSelector}
              >
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color={theme.colors.primary}
                />
                <Text
                  variant="headlineSmall"
                  style={{ color: theme.colors.onSurface }}
                >
                  {time.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </TouchableOpacity>

              <View style={styles.vacancySelector}>
                <Text variant="bodyLarge">Available Seats</Text>
                <View style={styles.vacancyControls}>
                  <Button
                    mode="outlined"
                    onPress={() => setVacancy(Math.max(1, vacancy - 1))}
                    disabled={vacancy <= 1}
                    icon="minus"
                    style={styles.vacancyButton}
                    children={undefined}
                  />
                  <Text variant="headlineMedium" style={styles.vacancyNumber}>
                    {vacancy}
                  </Text>
                  <Button
                    mode="outlined"
                    onPress={() =>
                      setVacancy(Math.min(maxVacancy, vacancy + 1))
                    }
                    disabled={vacancy >= maxVacancy}
                    icon="plus"
                    style={styles.vacancyButton}
                    children={undefined}
                  />
                </View>
              </View>
            </View>

            <Button
              mode="contained"
              style={styles.createButton}
              contentStyle={styles.createButtonContent}
              onPress={() => {
                // TODO: Implement ride creation
              }}
            >
              Create Ride
            </Button>
          </Surface>
        </ScrollView>

        {showTimePicker && (
          <Portal>
            <Modal
              visible={showTimePicker}
              onDismiss={() => setShowTimePicker(false)}
              contentContainerStyle={styles.timePickerModal}
            >
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={true}
                onChange={onTimeChange}
                display="spinner"
              />
            </Modal>
          </Portal>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedButton: {
    marginTop: 8,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  transportContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  transportOption: {
    flex: 1,
    minWidth: 100,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  transportOptionSelected: {
    borderWidth: 2,
  },
  transportText: {
    fontSize: 16,
    fontWeight: '500',
  },
  capacityText: {
    fontSize: 12,
    opacity: 0.7,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  vacancySelector: {
    marginTop: 16,
  },
  vacancyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 16,
  },
  vacancyButton: {
    borderRadius: 8,
  },
  vacancyNumber: {
    minWidth: 40,
    textAlign: 'center',
  },
  createButton: {
    borderRadius: 12,
  },
  createButtonContent: {
    paddingVertical: 8,
  },
  timePickerModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
});
