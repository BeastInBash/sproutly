import { TabList, TabSlot, Tabs, TabTrigger } from 'expo-router/ui';
import { BookOpen, House, Map, Stethoscope } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabButton } from '@/components/tab-button';
import { colors, spacing } from '@/constants/theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs style={styles.root}>
      <TabSlot />
      <TabList style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon={House} label="Today" />
        </TabTrigger>
        <TabTrigger name="garden" href="/garden" asChild>
          <TabButton icon={Map} label="My garden" />
        </TabTrigger>
        <TabTrigger name="doctor" href="/doctor" asChild>
          <TabButton icon={Stethoscope} label="Plant doctor" />
        </TabTrigger>
        <TabTrigger name="guide" href="/guide" asChild>
          <TabButton icon={BookOpen} label="Grow guide" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  bar: {
    flexDirection: 'row',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
