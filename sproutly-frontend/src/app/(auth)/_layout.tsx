import { Stack } from 'expo-router/stack';

import { colors, statusBarStyle } from '@/constants/theme';

export default function AuthLayout() {
  return (
    // Switching between sign in and sign up is a swap, not depth: crossfade instead of a push.
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        statusBarStyle,
        contentStyle: { backgroundColor: colors.background },
      }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
