import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar, Card, Button, List, useTheme } from 'react-native-paper';

export default function ProfileScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Avatar.Text size={80} label="JD" />
          <Text variant="headlineSmall" style={[styles.name, { color: theme.colors.text }]}>John Doe</Text>
          <Text variant="bodyLarge" style={[styles.phone, { color: theme.colors.textSecondary }]}>+91 98765 43210</Text>
        </View>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming Rides</Text>
            
            <List.Item
              title="JIIT-62 → JIIT-128"
              description="Today at 09:30 AM • Auto Rickshaw"
              left={props => <List.Icon {...props} icon="car" />}
              titleStyle={{ color: theme.colors.text }}
              descriptionStyle={{ color: theme.colors.textSecondary }}
            />
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.text }]}>Ride History</Text>
            
            <List.Item
              title="JIIT-128 → JIIT-62"
              description="Yesterday at 02:30 PM • Regular Cab"
              left={props => <List.Icon {...props} icon="car" />}
              titleStyle={{ color: theme.colors.text }}
              descriptionStyle={{ color: theme.colors.textSecondary }}
            />
            
            <List.Item
              title="JIIT-62 → JIIT-128"
              description="Yesterday at 09:00 AM • Auto Rickshaw"
              left={props => <List.Icon {...props} icon="car" />}
              titleStyle={{ color: theme.colors.text }}
              descriptionStyle={{ color: theme.colors.textSecondary }}
            />
          </Card.Content>
        </Card>

        <Button 
          mode="outlined" 
          style={styles.logoutButton}
          textColor={theme.colors.error}
          onPress={() => {
            // TODO: Implement logout
          }}
        >
          Logout
        </Button>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    marginTop: 16,
    fontWeight: '600',
  },
  phone: {
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
    borderColor: '#ef4444',
  },
});