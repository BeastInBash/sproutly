import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, type PressableProps } from 'react-native';
import Animated, { useReducedMotion } from 'react-native-reanimated';

import { Text } from '@/components/text';
import { colors, radius, spacing, touch, type ColorToken } from '@/constants/theme';
import { cssEaseOut, duration } from '@/constants/motion';

const variants = {
  /** Chlorophyll pill: the main action on a screen. */
  primary: { background: colors.primary, border: colors.primary, text: 'onPrimary' },
  /** Outline pill for secondary actions. */
  secondary: { background: 'transparent', border: colors.primary, text: 'primary' },
  /** Neutral outline, e.g. third-party sign-in. */
  outline: { background: colors.background, border: colors.border, text: 'text' },
  /** Rainwash pill for actions placed on a Chlorophyll hero. */
  onPrimary: { background: colors.onPrimary, border: colors.onPrimary, text: 'text' },
  /** Quiet text-only action. */
  ghost: { background: 'transparent', border: 'transparent', text: 'primary' },
  /** Only for destructive or urgent actions. */
  urgent: { background: 'transparent', border: colors.urgent, text: 'urgent' },
} as const satisfies Record<string, { background: string; border: string; text: ColorToken }>;

export type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: keyof typeof variants;
  loading?: boolean;
  /** Stretch to the container width. */
  block?: boolean;
  /** Leading mark, e.g. a provider logo. */
  leading?: ReactNode;
};

/**
 * Fully rounded pill, 52px tall. Title is the exact action ("Water now"), no trailing arrows.
 * Press feedback: scale to 0.97 over 120ms on press-in (opacity only with reduced motion).
 */
export function Button({
  title,
  variant = 'primary',
  loading,
  disabled,
  block,
  leading,
  style,
  ...rest
}: ButtonProps) {
  const v = variants[variant];
  const inactive = disabled || loading;
  const reducedMotion = useReducedMotion();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      disabled={inactive}
      pressRetentionOffset={16}
      style={(state) => [block && styles.block, typeof style === 'function' ? style(state) : style]}
      {...rest}>
      {({ pressed }) => (
        <Animated.View
          style={[
            styles.base,
            { backgroundColor: v.background, borderColor: v.border },
            {
              opacity: inactive ? 0.5 : pressed && reducedMotion ? 0.8 : 1,
              transform: [{ scale: pressed && !reducedMotion ? 0.97 : 1 }],
              transitionProperty: ['transform', 'opacity'],
              transitionDuration: duration.press,
              transitionTimingFunction: cssEaseOut,
            },
          ]}>
          {loading ? (
            <ActivityIndicator color={colors[v.text]} />
          ) : (
            <>
              {leading}
              <Text variant="label" color={v.text}>
                {title}
              </Text>
            </>
          )}
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: touch + 4,
    minWidth: touch,
    flexDirection: 'row',
    gap: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  block: { alignSelf: 'stretch' },
});
