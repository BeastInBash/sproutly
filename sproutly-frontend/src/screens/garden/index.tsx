import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { PlantPhoto } from '@/components/plant-photo';
import { Screen } from '@/components/screen';
import { TerraceMap } from '@/components/terrace-map';
import { SunLegend } from '@/components/terrace-map/sun-legend';
import { Text } from '@/components/text';
import { colors, radius, spacing, touch } from '@/constants/theme';
import { plants, sunLabel, terrace } from '@/data/garden';

import { EmptyGarden } from './empty-garden';
import { SegmentedToggle } from './segmented-toggle';

type GardenView = 'Map' | 'List';

export function Garden() {
  const [view, setView] = useState<GardenView>('Map');
  const openPot = (id: string) => router.push({ pathname: '/pot/[id]', params: { id } });

  if (plants.length === 0) {
    return (
      <Screen title="My garden">
        <EmptyGarden />
      </Screen>
    );
  }

  return (
    <View style={styles.flex}>
      <Screen title="My garden" bottomInset={touch + spacing.xl}>
        <SegmentedToggle options={['Map', 'List']} value={view} onChange={setView} />

        {view === 'Map' ? (
          <View style={styles.mapBlock}>
            <TerraceMap
              terrace={terrace}
              plants={plants}
              portrait
              onPotPress={(p) => openPot(p.id)}
            />
            <SunLegend />
          </View>
        ) : (
          <View style={styles.list}>
            {plants.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => openPot(p.id)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
                <PlantPhoto uri={p.photo} size={52} ring={p.thirsty ? colors.urgent : undefined} />
                <View style={styles.flex}>
                  <Text variant="bodyBold">{p.name}</Text>
                  <Text variant={p.thirsty ? 'bodyBold' : 'body'} color={p.thirsty ? 'urgent' : 'textMuted'}>
                    {p.thirsty ? 'Thirsty' : sunLabel(p.sunHours)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </Screen>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add plant"
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}>
        <Icon icon={Plus} color="onPrimary" />
        <Text variant="label" color="onPrimary">
          Add plant
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mapBlock: { gap: spacing.lg },
  list: { gap: spacing.sm },
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
  fab: {
    position: 'absolute',
    right: spacing.gutter,
    bottom: spacing.lg,
    minHeight: touch + 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  fabPressed: { opacity: 0.85 },
});
