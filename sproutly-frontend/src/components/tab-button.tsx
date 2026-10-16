import type { LucideIcon } from 'lucide-react-native';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Text } from '@/components/text';
import { colors, radius, spacing, touch } from '@/constants/theme';

export type TabButtonProps = TabTriggerSlotProps & {
  icon: LucideIcon;
  label: string;
};

/** Icon plus label. The active tab gets a Seedling pill behind its icon. */
export function TabButton({ icon, label, isFocused, ...rest }: TabButtonProps) {
  return (
    <Pressable
      {...rest}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!isFocused }}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <View style={[styles.pill, isFocused && styles.pillActive]}>
        <Icon icon={icon} size={24} />
      </View>
      {/* Same weight in both states so labels never truncate; the Seedling pill marks the active tab. */}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
        style={styles.label}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minHeight: touch + 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  pill: {
    width: 64,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: { backgroundColor: colors.soft },
  label: { textAlign: 'center' },
  pressed: { opacity: 0.8 },
});
