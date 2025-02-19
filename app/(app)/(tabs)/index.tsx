import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  useTheme,
  Surface,
  Portal,
  Modal,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTimePicker from '../../../components/CustomTimePicker';

const TRANSPORT_OPTIONS: Array<{
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}> = [
  { label: 'Auto', value: 'auto', icon: 'rickshaw' },
  { label: 'Cab', value: 'cab', icon: 'car' },
  { label: 'XL Cab', value: 'xl', icon: 'car-estate' },
];

export default function FindRideScreen() {
  const theme = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [showQuickMatch, setShowQuickMatch] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [selectedTransports, setSelectedTransports] = useState(['auto']);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<
    '128to62' | '62to128'
  >('128to62');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <View style={styles.header}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Find a Ride
          </Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.outline }}>
            Join others on their journey
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
            <Surface style={styles.quickMatchContainer} elevation={1}>
              <MaterialCommunityIcons
                name="flash"
                size={32}
                color={theme.colors.primary}
              />
              <View style={styles.quickMatchContent}>
                <Text
                  variant="titleLarge"
                  style={{ color: theme.colors.primary, fontWeight: '700' }}
                >
                  Quick Match
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.outline }}
                >
                  Find the perfect ride instantly
                </Text>
              </View>
              <Button
                mode="contained"
                style={styles.matchButton}
                icon="lightning-bolt"
                contentStyle={styles.matchButtonContent}
                onPress={() => setShowQuickMatch(true)}
              >
                Match Now
              </Button>
            </Surface>

            <Text
              variant="titleLarge"
              style={[styles.sectionTitle, { color: theme.colors.primary }]}
            >
              Available Rides
            </Text>

            {[1, 2, 3].map((_, index) => (
              <Surface key={index} style={styles.rideCard} elevation={1}>
                <View style={styles.rideHeader}>
                  <MaterialCommunityIcons
                    name={index % 2 === 0 ? 'car' : 'rickshaw'}
                    size={24}
                    color={theme.colors.primary}
                  />
                  <Text
                    variant="titleMedium"
                    style={{ color: theme.colors.onSurface, marginLeft: 8 }}
                  >
                    {index % 2 === 0 ? 'JIIT-62 → 128' : 'JIIT-128 → 62'}
                  </Text>
                </View>

                <View style={styles.rideDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={20}
                      color={theme.colors.outline}
                    />
                    <Text
                      variant="bodyMedium"
                      style={{ color: theme.colors.outline, marginLeft: 4 }}
                    >
                      {`${9 + index}:30 AM`}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons
                      name="account-group"
                      size={20}
                      color={theme.colors.outline}
                    />
                    <Text
                      variant="bodyMedium"
                      style={{ color: theme.colors.outline, marginLeft: 4 }}
                    >
                      2/4 seats
                    </Text>
                  </View>
                </View>

                <Button
                  mode="contained-tonal"
                  style={styles.joinButton}
                  contentStyle={styles.joinButtonContent}
                  icon="arrow-right"
                >
                  Join Ride
                </Button>
              </Surface>
            ))}
          </Animated.View>
        </ScrollView>
      </Animated.View>

      <Portal>
        <Modal
          visible={showQuickMatch}
          onDismiss={() => setShowQuickMatch(false)}
          contentContainerStyle={[
            styles.modalContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Quick Match Preferences
          </Text>

          <View style={styles.modalSection}>
            <Text variant="bodyLarge">Destination</Text>
            <View style={[styles.destinationOptions, { flexDirection: 'row' }]}>
              {[
                { id: '128to62', label: 'JIIT-128 → 62' },
                { id: '62to128', label: 'JIIT-62 → 128' },
              ].map(({ id, label }) => (
                <TouchableOpacity
                  key={id}
                  style={[
                    styles.destinationOption,
                    {
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedDestination === id
                          ? theme.colors.primary + '15'
                          : 'transparent',
                      borderColor:
                        selectedDestination === id
                          ? theme.colors.primary
                          : theme.colors.outline,
                    },
                  ]}
                  onPress={() =>
                    setSelectedDestination(id as '128to62' | '62to128')
                  }
                >
                  <Text
                    style={{ color: theme.colors.onSurface, marginLeft: 4 }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.modalSection}>
            <Text variant="bodyLarge">Preferred Time</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={[styles.timeSelector, { justifyContent: 'center' }]}
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
          </View>

          <View style={styles.modalSection}>
            <Text variant="bodyLarge">Number of Passengers</Text>
            <View style={styles.passengerControls}>
              <Button
                mode="outlined"
                onPress={() => setPassengers(Math.max(1, passengers - 1))}
                disabled={passengers <= 1}
                icon="minus"
                style={styles.controlButton}
                children={undefined}
              />
              <Text variant="headlineMedium" style={styles.passengerCount}>
                {passengers}
              </Text>
              <Button
                mode="outlined"
                onPress={() => setPassengers(Math.min(4, passengers + 1))}
                disabled={passengers >= 4}
                icon="plus"
                style={styles.controlButton}
                children={undefined}
              />
            </View>
          </View>

          <View style={styles.modalSection}>
            <Text variant="bodyLarge">Preferred Transport</Text>
            <View style={styles.transportOptions}>
              {TRANSPORT_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    setSelectedTransports((prev) =>
                      prev.includes(opt.value)
                        ? prev.filter((t) => t !== opt.value)
                        : [...prev, opt.value]
                    );
                  }}
                  style={[
                    styles.transportOption,
                    {
                      backgroundColor: selectedTransports.includes(opt.value)
                        ? theme.colors.primary + '15'
                        : 'transparent',
                      borderColor: selectedTransports.includes(opt.value)
                        ? theme.colors.primary
                        : theme.colors.outline,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={opt.icon}
                    size={24}
                    color={
                      selectedTransports.includes(opt.value)
                        ? theme.colors.primary
                        : theme.colors.outline
                    }
                  />
                  <Text
                    style={[
                      styles.transportText,
                      {
                        color: selectedTransports.includes(opt.value)
                          ? theme.colors.primary
                          : theme.colors.onSurface,
                      },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              // TODO: Implement matching logic
              setShowQuickMatch(false);
            }}
            style={styles.findButton}
          >
            Find Matches
          </Button>
        </Modal>

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
                onChange={(newTime) => setTime(newTime)}
                onClose={() => setShowTimePicker(false)}
              />
            </Modal>
          </Portal>
        )}
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  quickMatchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  quickMatchContent: {
    flex: 1,
    marginLeft: 12,
  },
  matchButton: {
    borderRadius: 12,
  },
  matchButtonContent: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '700',
  },
  rideCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  rideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rideDetails: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    borderRadius: 12,
  },
  joinButtonContent: {
    paddingVertical: 8,
  },
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: {
    marginBottom: 20,
    fontWeight: '600',
  },
  modalSection: {
    marginBottom: 24,
  },
  passengerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 16,
  },
  controlButton: {
    borderRadius: 8,
  },
  passengerCount: {
    minWidth: 40,
    textAlign: 'center',
  },
  transportOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  transportOption: {
    flex: 1,
    minWidth: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  transportText: {
    fontSize: 16,
    fontWeight: '500',
  },
  findButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
  timePickerModal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
  destinationOptions: {
    marginTop: 12,
    gap: 12,
  },
  destinationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
});
