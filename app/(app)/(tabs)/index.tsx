import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FindRideScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>Available Rides</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Card style={[styles.quickMatchCard, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Card.Content>
            <View style={styles.quickMatchHeader}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color={theme.colors.warning} />
              <Text variant="titleMedium" style={[styles.quickMatchTitle, { color: theme.colors.text }]}>Quick Match</Text>
            </View>
            <Text variant="bodyMedium" style={[styles.quickMatchDescription, { color: theme.colors.textSecondary }]}>
              Let us find the perfect ride for you instantly
            </Text>
            <Button 
              mode="contained" 
              style={styles.quickMatchButton}
              buttonColor={theme.colors.warning}
              onPress={() => {
                // TODO: Implement random matching
              }}
            >
              Match Me Now
            </Button>
          </Card.Content>
        </Card>

        <Divider style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        
        <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>Browse Available Rides</Text>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.text }}>JIIT-62 → JIIT-128</Text>
            <Text variant="bodyMedium" style={[styles.time, { color: theme.colors.textSecondary }]}>09:30 AM</Text>
            <View style={styles.details}>
              <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary }}>Auto Rickshaw • 2/3 seats filled</Text>
              <Button mode="contained" style={styles.joinButton}>
                Join
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.text }}>JIIT-128 → JIIT-62</Text>
            <Text variant="bodyMedium" style={[styles.time, { color: theme.colors.textSecondary }]}>10:00 AM</Text>
            <View style={styles.details}>
              <Text variant="bodyMedium" style={{ color: theme.colors.textSecondary }}>Regular Cab • 3/4 seats filled</Text>
              <Button mode="contained" style={styles.joinButton}>
                Join
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  quickMatchCard: {
    marginBottom: 16,
  },
  quickMatchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickMatchTitle: {
    marginLeft: 8,
    fontWeight: '600',
  },
  quickMatchDescription: {
    marginBottom: 16,
  },
  quickMatchButton: {
    borderRadius: 8,
  },
  divider: {
    marginVertical: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  card: {
    marginBottom: 16,
  },
  time: {
    marginTop: 4,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinButton: {
    marginLeft: 16,
  },
});