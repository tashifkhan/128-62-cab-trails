import React, { useState } from 'react';
import { Platform } from 'react-native';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomTimePicker from '../../../components/CustomTimePicker';

const TRANSPORT_OPTIONS = [
  { label: 'Auto', value: 'auto', capacity: 3 },
  { label: 'Cab', value: 'cab', capacity: 4 },
  { label: 'XL Cab', value: 'xl', capacity: 6 },
];

const START_HOUR = 7; // 7 AM
const END_HOUR = 18; // 6 PM
const MINUTE_STEP = 15;

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

  const validateTime = (selectedTime: Date) => {
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();

    // Round minutes to nearest 15
    const roundedMinutes = Math.round(minutes / MINUTE_STEP) * MINUTE_STEP;

    let newTime = new Date(selectedTime);
    newTime.setMinutes(roundedMinutes);

    // Validate time constraints
    if (hours < START_HOUR) {
      newTime.setHours(START_HOUR, 0);
    } else if (hours > END_HOUR || (hours === END_HOUR && minutes > 30)) {
      newTime.setHours(END_HOUR, 30);
    }

    return newTime;
  };

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
              <View style={styles.routeContainer}>
                {[
                  {
                    value: '62to128',
                    label: '62 to 128',
                    icon: 'arrow-right-bold' as const,
                  },
                  {
                    value: '128to62',
                    label: '128 to 62',
                    icon: 'arrow-left-bold' as const,
                  },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    onPress={() => setRoute(item.value)}
                    style={[
                      styles.routeOption,
                      {
                        backgroundColor:
                          route === item.value
                            ? theme.colors.primary + '15'
                            : 'transparent',
                        borderColor:
                          route === item.value
                            ? theme.colors.primary
                            : theme.colors.outline,
                        transform: [{ scale: route === item.value ? 1.02 : 1 }],
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={24}
                      color={
                        route === item.value
                          ? theme.colors.primary
                          : theme.colors.outline
                      }
                    />
                    <Text
                      style={[
                        styles.routeText,
                        {
                          color:
                            route === item.value
                              ? theme.colors.primary
                              : theme.colors.onSurface,
                          fontWeight: route === item.value ? '600' : '400',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
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
                      {
                        backgroundColor:
                          transport === opt.value
                            ? theme.colors.primary + '15' // 15 is hex for 10% opacity
                            : 'transparent',
                        borderColor:
                          transport === opt.value
                            ? theme.colors.primary
                            : theme.colors.outline,
                        transform: [
                          { scale: transport === opt.value ? 1.02 : 1 },
                        ],
                      },
                    ]}
                  >
                    <View>
                      <MaterialCommunityIcons
                        name={opt.value === 'auto' ? 'rickshaw' : 'car'}
                        size={20}
                        color={
                          transport === opt.value
                            ? theme.colors.primary
                            : theme.colors.outline
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.transportText,
                        {
                          color:
                            transport === opt.value
                              ? theme.colors.primary
                              : theme.colors.onSurface,
                          fontWeight: transport === opt.value ? '600' : '400',
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                    <Text
                      style={[
                        styles.capacityText,
                        { color: theme.colors.outline },
                      ]}
                    >
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
                  style={{
                    color: theme.colors.onSurface,
                  }}
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
              contentContainerStyle={[
                styles.timePickerModal,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <CustomTimePicker
                value={time}
                onChange={(newTime) => {
                  const validTime = validateTime(newTime);
                  setTime(validTime);
                }}
                onClose={() => setShowTimePicker(false)}
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
  routeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  routeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  routeOption: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
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
