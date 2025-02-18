import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const theme = useTheme();

  const handleLogin = () => {
    // TODO: Implement Firebase phone authentication
    router.push('/register');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>
        Welcome to CabTrails
      </Text>
      <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Connect with fellow commuters
      </Text>
      
      <View style={styles.form}>
        <TextInput
          mode="outlined"
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          textColor={theme.colors.text}
        />
        
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
        >
          Continue
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
    marginBottom: 10,
  },
  subtitle: {
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