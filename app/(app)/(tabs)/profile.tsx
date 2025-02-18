import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Text, Avatar, Button, Surface, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
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
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <View style={styles.header}>
          <Text
            variant="displaySmall"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Profile
          </Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
            <Surface style={styles.profileCard} elevation={1}>
              <Avatar.Image
                size={80}
                source={{ uri: 'https://ui-avatars.com/api/?name=Tashif' }}
              />
              <Text
                variant="headlineMedium"
                style={[styles.name, { color: theme.colors.onSurface }]}
              >
                Tashif
              </Text>
              <View style={styles.contactInfo}>
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text
                  variant="bodyLarge"
                  style={{ color: theme.colors.outline }}
                >
                  +91 98765 43210
                </Text>
              </View>
            </Surface>

            <Text
              variant="titleLarge"
              style={[styles.sectionTitle, { color: theme.colors.primary }]}
            >
              Your Rides
            </Text>

            {[1, 2].map((_, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <Surface style={[styles.rideCard]} elevation={2}>
                  <View style={styles.rideHeader}>
                    <View
                      style={[
                        styles.rideIconContainer,
                        {
                          backgroundColor: theme.colors.primary + '15',
                          padding: 12,
                          borderRadius: 12,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={index === 0 ? 'calendar-clock' : 'calendar-check'}
                        size={28}
                        color={theme.colors.primary}
                      />
                    </View>
                    <View style={styles.rideHeaderText}>
                      <Text variant="titleMedium" style={[styles.rideTitle]}>
                        {index === 0 ? 'Upcoming Ride' : 'Completed Ride'}
                      </Text>
                      <Text variant="bodySmall" style={[styles.rideDate]}>
                        {index === 0 ? 'Today' : 'Yesterday'}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.rideDetails, { marginTop: 16 }]}>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color={theme.colors.secondary}
                      />
                      <Text variant="bodyMedium" style={styles.detailText}>
                        JIIT-62 → 128
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.detailItem,
                        {
                          backgroundColor: theme.colors.secondary + '15',
                          padding: 8,
                          borderRadius: 20,
                          position: 'absolute',
                          right: 1,
                          top: -11,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color={theme.colors.secondary}
                      />
                      <Text
                        variant="bodyMedium"
                        style={[styles.detailText, { textAlign: 'left' }]}
                      >
                        {`${9 + index}:30 AM`}
                      </Text>
                    </View>
                  </View>
                </Surface>
              </Animated.View>
            ))}

            <Button
              mode="outlined"
              style={styles.logoutButton}
              contentStyle={styles.logoutButtonContent}
              icon="logout"
              textColor={theme.colors.error}
            >
              Logout
            </Button>
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
    flex: 1,
    padding: 16,
  },
  profileCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  name: {
    marginTop: 16,
    fontWeight: '600',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
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
  rideIconContainer: {
    marginRight: 12,
  },
  rideHeaderText: {
    flex: 1,
  },
  rideTitle: {
    fontWeight: '600',
  },
  rideDate: {
    opacity: 0.7,
  },
  rideDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    opacity: 0.8,
  },
  logoutButton: {
    marginVertical: 24,
    borderRadius: 12,
    borderColor: 'transparent',
    backgroundColor: '#fef2f2',
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
});
