import { Stack } from 'expo-router/stack';

import { colors, fonts, statusBarStyle } from '@/constants/theme';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle,
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontFamily: fonts.heading, color: colors.text },
        headerBackButtonDisplayMode: 'minimal',
      }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" options={{ headerShown: true, title: 'Your account' }} />
      <Stack.Screen
        name="pot/[id]"
        options={{
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.42],
          sheetCornerRadius: 28,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack>
  );
}
