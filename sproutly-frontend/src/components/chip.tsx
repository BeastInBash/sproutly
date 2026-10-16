import { Check } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

import { Icon } from '@/components/icon';
import { Text } from '@/components/text';
import { colors, radius, spacing, touch } from '@/constants/theme';

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

/** Pill chip. Selected chips get a Seedling fill and a check. */
export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.idle,
        pressed && styles.pressed,
      ]}>
      {selected ? <Icon icon={Check} size={18} color="primary" /> : null}
      <Text variant={selected ? 'bodyBold' : 'body'}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: touch - 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1.5,
  },
  idle: { borderColor: colors.border, backgroundColor: colors.background },
  selected: { borderColor: colors.soft, backgroundColor: colors.soft },
  pressed: { opacity: 0.85 },
});
