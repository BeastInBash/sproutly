import type { ReactNode } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/text';
import { colors, MaxContentWidth, spacing } from '@/constants/theme';

export type ScreenProps = Pick<ScrollViewProps, 'children'> & {
  /** Large left-aligned Inter title. */
  title?: string;
  /** Element shown on the right of the title row (e.g. profile button). */
  headerRight?: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  /** Extra space at the bottom, e.g. to clear a floating button. */
  bottomInset?: number;
};

/** Standard tab screen: Rainwash background, 20px gutters, generous vertical rhythm. */
export function Screen({ title, headerRight, refreshing, onRefresh, bottomInset = 0, children }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg, paddingBottom: spacing.xxl + bottomInset },
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : undefined
      }>
      {title || headerRight ? (
        <View style={styles.header}>
          {title ? (
            <Text variant="title" accessibilityRole="header" style={styles.title}>
              {title}
            </Text>
          ) : (
            <View style={styles.title} />
          )}
          {headerRight}
        </View>
      ) : null}
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: {
    gap: spacing.xxl,
    paddingHorizontal: spacing.gutter,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  title: { flex: 1 },
});
