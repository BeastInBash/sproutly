import { Eye, EyeOff } from 'lucide-react-native';
import { forwardRef, useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { Icon } from '@/components/icon';
import { Text } from '@/components/text';
import { colors, radius, spacing, touch, type, type ColorToken } from '@/constants/theme';
import { cssEaseOut, duration } from '@/constants/motion';

export type FieldMessage = { text: string; tone: 'muted' | 'success' | 'error' };

export type TextFieldProps = TextInputProps & {
  label: string;
  /** Shorthand for an error message. */
  error?: string;
  /** Helper or status line under the field. `error` wins when both are set. */
  message?: FieldMessage;
  /** Element inside the field on the right, e.g. an availability mark. */
  trailing?: ReactNode;
};

const toneColor: Record<FieldMessage['tone'], ColorToken> = {
  muted: 'textMuted',
  success: 'primary',
  error: 'urgent',
};

/**
 * Text input with a label above. Border eases to Chlorophyll on focus (Tomato on error) over
 * 180ms; the message below fades between states. Password fields get a show/hide toggle.
 */
export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, message, trailing, secureTextEntry, onFocus, onBlur, style, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const shown: FieldMessage | undefined = error ? { text: error, tone: 'error' } : message;
  const isError = shown?.tone === 'error';
  const borderColor = isError ? colors.urgent : focused ? colors.primary : colors.border;

  return (
    <View style={styles.container}>
      <Text variant="bodyBold">{label}</Text>
      <Animated.View
        style={[
          styles.box,
          {
            borderColor,
            transitionProperty: 'borderColor',
            transitionDuration: duration.state,
            transitionTimingFunction: cssEaseOut,
          },
        ]}>
        <TextInput
          ref={ref}
          accessibilityLabel={label}
          accessibilityHint={shown?.text}
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.primary}
          secureTextEntry={secureTextEntry && !revealed}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, style]}
          {...rest}
        />
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={revealed ? 'Hide password' : 'Show password'}
            onPress={() => setRevealed((r) => !r)}
            style={styles.reveal}>
            <Icon icon={revealed ? EyeOff : Eye} size={22} color="textMuted" />
          </Pressable>
        ) : null}
      </Animated.View>
      {shown ? (
        // Fade in only: an exit fade would overlap the next message while both are visible.
        <Animated.View key={`${shown.tone}:${shown.text}`} entering={FadeIn.duration(duration.state)}>
          <Text
            variant={shown.tone === 'muted' ? 'body' : 'bodyBold'}
            color={toneColor[shown.tone]}
            accessibilityLiveRegion="polite">
            {shown.text}
          </Text>
        </Animated.View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  box: {
    minHeight: touch + 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.card,
    borderCurve: 'continuous',
    borderWidth: 1.5,
    backgroundColor: colors.background,
  },
  input: {
    ...type.body,
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: spacing.lg,
    color: colors.text,
    backgroundColor: 'transparent',
    // The animated border is the focus indicator; drop the browser's default outline.
    ...Platform.select({ web: { outlineWidth: 0, outlineColor: 'transparent' } }),
  },
  trailing: { paddingRight: spacing.md },
  reveal: { width: touch, height: touch, alignItems: 'center', justifyContent: 'center' },
});
