import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/text';
import { colors, radius, spacing } from '@/constants/theme';
import type { SunHours } from '@/data/garden';

import { zoneFill } from './index';

const items: { hours: SunHours; label: string }[] = [
  { hours: '2-4', label: '2–4h' },
  { hours: '4-6', label: '4–6h' },
  { hours: '6+', label: '6h+' },
];

export function SunLegend() {
  return (
    <View style={styles.row} accessibilityLabel="Sun hours: 2 to 4, 4 to 6, 6 or more">
      {items.map((item) => (
        <View key={item.hours} style={styles.item}>
          <View style={[styles.swatch, { backgroundColor: zoneFill[item.hours] }]} />
          <Text>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  swatch: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
