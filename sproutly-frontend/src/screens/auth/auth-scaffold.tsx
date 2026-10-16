import { Link, type Href } from 'expo-router';
import { Sprout } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GoogleButton } from '@/components/google-button';
import { Icon } from '@/components/icon';
import { Text } from '@/components/text';
import { colors, MaxContentWidth, radius, spacing, touch } from '@/constants/theme';
import { duration, riseIn } from '@/constants/motion';

export type AuthScaffoldProps = {
  title: string;
  lead: string;
  /** The form fields. */
  children: ReactNode;
  /** Primary submit button. */
  submit: ReactNode;
  formError?: string;
  onGoogle: () => void;
  googleLoading: boolean;
  switchPrompt: string;
  switchLabel: string;
  switchHref: Href;
};

/**
 * Shared layout for sign in and sign up. Groups rise in once on mount, staggered by 60ms.
 * Messages fade in; layout shifts are instant (layout transitions glitch on web).
 */
export function AuthScaffold({
  title,
  lead,
  children,
  submit,
  formError,
  onGoogle,
  googleLoading,
  switchPrompt,
  switchLabel,
  switchHref,
}: AuthScaffoldProps) {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled">
        <Animated.View style={styles.header} entering={riseIn(0, reducedMotion)}>
          <View style={styles.mark}>
            <Icon icon={Sprout} size={32} color="onPrimary" />
          </View>
          <Text variant="title" accessibilityRole="header">
            {title}
          </Text>
          <Text variant="large">{lead}</Text>
        </Animated.View>

        <Animated.View style={styles.fields} entering={riseIn(1, reducedMotion)}>
          {children}
        </Animated.View>

        <Animated.View style={styles.actions} entering={riseIn(2, reducedMotion)}>
          {formError ? (
            <Animated.View style={styles.error} entering={FadeIn.duration(duration.state)}>
              <Text variant="bodyBold" color="urgent" selectable accessibilityLiveRegion="polite">
                {formError}
              </Text>
            </Animated.View>
          ) : null}
          {submit}
          <View style={styles.divider} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <View style={styles.rule} />
            <Text color="textMuted">or</Text>
            <View style={styles.rule} />
          </View>
          <GoogleButton onPress={onGoogle} loading={googleLoading} />
          <View style={styles.switch}>
            <Text>{switchPrompt}</Text>
            <Link href={switchHref} replace asChild>
              <Pressable hitSlop={8} style={styles.switchLink} accessibilityRole="link">
                <Text variant="label" color="primary">
                  {switchLabel}
                </Text>
              </Pressable>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scroll: {
    flexGrow: 1,
    gap: spacing.xxl,
    paddingHorizontal: spacing.gutter,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: { gap: spacing.md },
  mark: {
    width: 56,
    height: 56,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  fields: { gap: spacing.lg },
  // Main action sits low, within thumb reach.
  actions: { marginTop: 'auto', gap: spacing.lg },
  error: { padding: spacing.md, borderRadius: radius.card, backgroundColor: colors.urgentSoft },
  divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rule: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  switchLink: { minHeight: touch, justifyContent: 'center' },
});
