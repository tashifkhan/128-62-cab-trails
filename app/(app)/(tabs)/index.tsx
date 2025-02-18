import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Text, Card, Button, useTheme, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FindRideScreen() {
  const theme = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

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
});
