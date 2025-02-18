import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const theme = useTheme();

  const handleRegister = () => {
    // TODO: Implement user registration in Firebase
    router.push('/(app)/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>
        Complete Your Profile
      </Text>
      
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Full Name"
          value={name}
          onChangeText={setName}
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          textColor={theme.colors.text}
        />
        
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
        >
          Complete Registration
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 20,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    padding: 4,
  },
});