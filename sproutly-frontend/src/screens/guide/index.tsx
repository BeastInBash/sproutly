import { Clock, Sun, SunDim } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Chip } from '@/components/chip';
import { Icon } from '@/components/icon';
import { PlantPhoto } from '@/components/plant-photo';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { Text } from '@/components/text';
import { colors, radius, spacing, touch } from '@/constants/theme';
import { guideFilters, guides, sowThisMonth, type SowCard } from '@/data/guide';

const sunLabel: Record<SowCard['sun'], string> = {
  full: 'Full sun',
  part: 'Part sun',
  shade: 'Shade',
};

export function GrowGuide() {
  const [filters, setFilters] = useState<string[]>([]);
  const month = new Date().toLocaleString('en', { month: 'long' });
  const toggle = (f: string) =>
    setFilters((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  return (
    <Screen title="Grow guide">
      <View style={styles.hero}>
        <Text variant="heading" color="onPrimary" style={styles.heroTitle}>
          Sow this month: {month}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}>
          {sowThisMonth.map((card) => (
            <View key={card.id} style={styles.sowCard}>
              <PlantPhoto size={120} label={card.name} />
              <Text variant="subheading">{card.name}</Text>
              <Text>Ready in {card.readyInDays} days</Text>
              <View style={styles.inline}>
                <Icon icon={card.sun === 'full' ? Sun : SunDim} size={20} />
                <Text color="textMuted">{sunLabel[card.sun]}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bleed}
        contentContainerStyle={styles.chips}>
        {guideFilters.map((f) => (
          <Chip key={f} label={f} selected={filters.includes(f)} onPress={() => toggle(f)} />
        ))}
      </ScrollView>

      <View style={styles.section}>
        <SectionHeader title="Guides" />
        <View style={styles.list}>
          {guides.map((g) => (
            <Pressable
              key={g.id}
              accessibilityRole="button"
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
              <PlantPhoto size={64} />
              <View style={styles.rowText}>
                <Text variant="bodyBold">{g.title}</Text>
                <View style={styles.inline}>
                  <Icon icon={Clock} size={18} color="textMuted" />
                  <Text color="textMuted">{g.readMinutes} min read</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.lg,
    paddingVertical: spacing.xl,
    borderRadius: radius.hero,
    borderCurve: 'continuous',
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  heroTitle: { paddingHorizontal: spacing.xl },
  carousel: { gap: spacing.md, paddingHorizontal: spacing.xl },
  sowCard: {
    width: 152,
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    backgroundColor: colors.background,
  },
  inline: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  bleed: { marginHorizontal: -spacing.gutter },
  chips: { gap: spacing.sm, paddingHorizontal: spacing.gutter },
  section: { gap: spacing.lg },
  list: { gap: spacing.sm },
  row: {
    minHeight: touch + 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  rowText: { flex: 1, gap: spacing.xs },
  pressed: { backgroundColor: colors.pressed },
});
