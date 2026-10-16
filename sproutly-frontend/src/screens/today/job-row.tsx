import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PlantPhoto } from '@/components/plant-photo';
import { Text } from '@/components/text';
import { colors, radius, spacing, touch } from '@/constants/theme';
import { plantById, type Job } from '@/data/garden';

export function JobRow({ job }: { job: Job }) {
  const [done, setDone] = useState(false);
  const plant = plantById(job.plantId);
  const title = job.detail ? `${job.title} (${job.detail.toLowerCase()})` : job.title;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      accessibilityLabel={`${title}, ${job.timing}`}
      onPress={() => setDone((d) => !d)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <PlantPhoto uri={plant?.photo} size={52} />
      <View style={styles.text}>
        <Text variant="bodyBold" style={done && styles.done}>
          {title}
        </Text>
        <Text color="textMuted">{job.timing}</Text>
      </View>
      <View style={[styles.check, done && styles.checkDone]}>
        {done ? <Icon icon={Check} size={20} color="onPrimary" /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: touch + 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  pressed: { backgroundColor: colors.pressed },
  text: { flex: 1, gap: 2 },
  done: { textDecorationLine: 'line-through', color: colors.textMuted },
  check: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: { backgroundColor: colors.primary },
});
