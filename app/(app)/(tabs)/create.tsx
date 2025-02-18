import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, Card, useTheme } from 'react-native-paper';

const TRANSPORT_OPTIONS = [
  { label: 'Auto', value: 'auto', capacity: 3 },
  { label: 'Cab', value: 'cab', capacity: 4 },
  { label: 'XL Cab', value: 'xl', capacity: 6 },
];

export default function CreateRideScreen() {
  const [route, setRoute] = useState('62to128');
  const [transport, setTransport] = useState('auto');
  const [time, setTime] = useState('');
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>Create a Ride</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.label, { color: theme.colors.text }]}>Route</Text>
            <SegmentedButtons
              value={route}
              onValueChange={setRoute}
              buttons={[
                { value: '62to128', label: 'JIIT-62 → 128' },
                { value: '128to62', label: 'JIIT-128 → 62' },
              ]}
              style={styles.segmentedButton}
            />

            <Text variant="titleMedium" style={[styles.label, styles.spacing, { color: theme.colors.text }]}>Transport</Text>
            <SegmentedButtons
              value={transport}
              onValueChange={setTransport}
              buttons={TRANSPORT_OPTIONS.map(opt => ({
                value: opt.value,
                label: `${opt.label} (${opt.capacity})`
              }))}
              style={styles.segmentedButton}
            />

            <Text variant="titleMedium" style={[styles.label, styles.spacing, { color: theme.colors.text }]}>Time</Text>
            <TextInput
              mode="outlined"
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM"
              keyboardType="numbers-and-punctuation"
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              textColor={theme.colors.text}
            />

            <Button 
              mode="contained" 
              style={styles.createButton}
              onPress={() => {
                // TODO: Implement ride creation
              }}
            >
              Create Ride
            </Button>
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
  card: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  spacing: {
    marginTop: 24,
  },
  segmentedButton: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  createButton: {
    marginTop: 24,
  },
});