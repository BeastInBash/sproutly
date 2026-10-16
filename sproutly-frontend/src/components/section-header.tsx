import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/text';
import { spacing, touch } from '@/constants/theme';

export type SectionHeaderProps = {
  title: string;
  action?: { label: string; href: Href };
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text variant="subheading" accessibilityRole="header">
        {title}
      </Text>
      {action ? (
        <Link href={action.href} asChild>
          <Pressable hitSlop={8} style={styles.action} accessibilityRole="link">
            <Text variant="label" color="primary">
              {action.label}
            </Text>
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  action: { minHeight: touch, justifyContent: 'center' },
});
