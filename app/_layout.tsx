import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, useTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { getTheme } from '../constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme ?? 'light');

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </PaperProvider>
  );
}