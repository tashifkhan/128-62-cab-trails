import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const lightColors = {
  ...MD3LightTheme.colors,
  primary: '#002884',
  secondary: '#4f46e5',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  background: '#f5f5f5',
  surface: '#ffffff',
  surfaceVariant: '#fffbeb',
  text: '#000000',
  textSecondary: '#666666',
  border: '#e0e0e0',
};

const darkColors = {
  ...MD3DarkTheme.colors,
  primary: '#8AB8E8',
  secondary: '#818cf8',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  background: '#121212',
  surface: '#1e1e1e',
  surfaceVariant: '#2d2815',
  text: '#ffffff',
  textSecondary: '#a1a1a1',
  border: '#2e2e2e',
};

export const getTheme = (colorScheme: 'light' | 'dark') => ({
  ...(colorScheme === 'light' ? MD3LightTheme : MD3DarkTheme),
  colors: colorScheme === 'light' ? lightColors : darkColors,
});