import { Link } from 'expo-router';
import { CloudSun, Lightbulb, User } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { PlantPhoto } from '@/components/plant-photo';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { TerraceMap } from '@/components/terrace-map';
import { Text } from '@/components/text';
import { colors, radius, spacing, touch } from '@/constants/theme';
import { plants, terrace, thirstyPlants, tip, todaysJobs, weather } from '@/data/garden';
import { useMe } from '@/hooks/use-me';

import { JobRow } from './job-row';

function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function Today() {
  const { data: user, refetch, isRefetching } = useMe();
  const firstName = user?.name.split(' ')[0];
  const thirsty = thirstyPlants();

  return (
    <Screen refreshing={isRefetching} onRefresh={refetch}>
      <View style={styles.greeting}>
        <View style={styles.greetingText}>
          <Text variant="title" accessibilityRole="header">
            {firstName ? `${greeting()}, ${firstName}` : greeting()}
          </Text>
          <View style={styles.weather}>
            <Icon icon={CloudSun} size={22} />
            <Text variant="large" style={styles.flex}>
              {weather.tempC}°C, {weather.summary}. {weather.advice}
            </Text>
          </View>
        </View>
        <Link href="/settings" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Your account"
            style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
            <Icon icon={User} />
          </Pressable>
        </Link>
      </View>

      <View style={styles.hero}>
        <Text variant="heading" color="onPrimary">
          {thirsty.length} plants need water
        </Text>
        <View style={styles.heroPhotos}>
          {thirsty.slice(0, 5).map((p, i) => (
            <View key={p.id} style={[styles.heroPhoto, i > 0 && styles.overlap]}>
              <PlantPhoto uri={p.photo} size={44} shape="circle" ring={colors.primary} label={p.name} />
            </View>
          ))}
        </View>
        <Button title="Water now" variant="onPrimary" style={styles.heroButton} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Today's jobs" />
        <View style={styles.jobs}>
          {todaysJobs.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Your terrace" action={{ label: 'Open map', href: '/garden' }} />
        <TerraceMap terrace={terrace} plants={plants} radius={radius.card} potFt={1.1} />
      </View>

      <View style={styles.tip}>
        <Icon icon={Lightbulb} />
        <Text style={styles.flex}>{tip}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  greeting: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  greetingText: { flex: 1, gap: spacing.sm },
  weather: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: touch,
    height: touch,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.pressed },
  hero: {
    gap: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.hero,
    borderCurve: 'continuous',
    backgroundColor: colors.primary,
  },
  heroPhotos: { flexDirection: 'row' },
  heroPhoto: { borderRadius: radius.pill },
  overlap: { marginLeft: -spacing.md },
  heroButton: { alignSelf: 'flex-start' },
  section: { gap: spacing.lg },
  jobs: { gap: spacing.sm },
  tip: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.card,
    borderCurve: 'continuous',
    backgroundColor: colors.soft,
  },
});
