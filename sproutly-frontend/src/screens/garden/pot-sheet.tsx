import { router } from 'expo-router';
import { Sun } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { PlantPhoto } from '@/components/plant-photo';
import { Text } from '@/components/text';
import { colors, spacing } from '@/constants/theme';
import { plantById, sunLabel } from '@/data/garden';

export function PotSheet({ id }: { id: string }) {
  const plant = plantById(id);

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text variant="subheading">This plant is no longer on your terrace.</Text>
        <Button title="Close" variant="secondary" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PlantPhoto uri={plant.photo} size={72} ring={plant.thirsty ? colors.urgent : undefined} />
        <View style={styles.flex}>
          <Text variant="heading">
            {plant.name}, {plant.ageDays} days old
          </Text>
          <View style={styles.sun}>
            <Icon icon={Sun} size={20} />
            <Text>{sunLabel(plant.sunHours)}</Text>
          </View>
          {plant.thirsty ? <Text variant="bodyBold" color="urgent">Thirsty</Text> : null}
        </View>
      </View>
      <View style={styles.actions}>
        <Button title="Water now" style={styles.flex} />
        <Button title="Open plant" variant="secondary" style={styles.flex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { gap: spacing.xl, padding: spacing.xl, paddingTop: spacing.xxl },
  header: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center' },
  sun: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
  actions: { flexDirection: 'row', gap: spacing.md },
});
