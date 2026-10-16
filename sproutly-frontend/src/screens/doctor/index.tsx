import { Camera } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PlantPhoto } from '@/components/plant-photo';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { Text } from '@/components/text';
import { colors, radius, spacing } from '@/constants/theme';
import { plantById } from '@/data/garden';
import { recentChecks } from '@/data/guide';

export function PlantDoctor() {
  const startCheck = () =>
    Alert.alert('Plant doctor', 'Photo diagnosis is being built. It will open the camera here.');

  return (
    <Screen title="Plant doctor">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Photograph the problem leaf"
        onPress={startCheck}
        style={({ pressed }) => [styles.hero, pressed && styles.pressed]}>
        <View style={styles.cameraCircle}>
          <Icon icon={Camera} size={36} color="onPrimary" />
        </View>
        <Text variant="heading">Photograph the problem leaf</Text>
        <Text>Fit one leaf in the frame, in daylight. We&apos;ll tell you what&apos;s wrong and what to do.</Text>
      </Pressable>

      <View style={styles.section}>
        <SectionHeader title="Recent checks" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.checks}
          style={styles.bleed}>
          {recentChecks.map((check) => {
            const plant = plantById(check.plantId);
            return (
              <View key={check.id} style={styles.check}>
                <PlantPhoto uri={plant?.photo} size={120} label={plant?.name} />
                <Text variant="bodyBold">{plant?.name}</Text>
                <View style={[styles.badge, check.urgent ? styles.badgeUrgent : styles.badgeOk]}>
                  <Text variant="label" color={check.urgent ? 'urgent' : 'primary'}>
                    {check.result}
                  </Text>
                </View>
                <Text color="textMuted">{check.when}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radius.hero,
    borderCurve: 'continuous',
    backgroundColor: colors.soft,
  },
  pressed: { opacity: 0.9 },
  cameraCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  section: { gap: spacing.lg },
  bleed: { marginHorizontal: -spacing.gutter },
  checks: { gap: spacing.lg, paddingHorizontal: spacing.gutter },
  check: { width: 140, gap: spacing.sm },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  badgeUrgent: { backgroundColor: colors.urgentSoft },
  badgeOk: { backgroundColor: colors.soft },
});
