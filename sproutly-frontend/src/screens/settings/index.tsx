import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { colors, MaxContentWidth, radius, spacing } from '@/constants/theme';
import { signOut, useSession } from '@/lib/auth-client';
import { env } from '@/lib/env';

export function Settings() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [signingOut, setSigningOut] = useState(false);

  async function onSignOut() {
    setSigningOut(true);
    await signOut();
    queryClient.clear();
    setSigningOut(false);
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.card}>
        <Row label="Name" value={session?.user.name} />
        <View style={styles.divider} />
        <Row label="Email" value={session?.user.email} />
        {__DEV__ ? (
          <>
            <View style={styles.divider} />
            <Row label="API" value={env.apiUrl} />
          </>
        ) : null}
      </View>

      <Button title="Sign out" variant="urgent" loading={signingOut} onPress={onSignOut} block />
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.row}>
      <Text color="textMuted">{label}</Text>
      <Text variant="bodyBold" selectable numberOfLines={1} style={styles.value}>
        {value ?? 'Not set'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: {
    gap: spacing.xxl,
    padding: spacing.gutter,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  card: {
    paddingHorizontal: spacing.lg,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  value: { flexShrink: 1, textAlign: 'right' },
});
