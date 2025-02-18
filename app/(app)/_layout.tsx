import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
  // TODO: Add authentication check
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}