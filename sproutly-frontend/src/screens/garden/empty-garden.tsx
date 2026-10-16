import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Rect } from 'react-native-svg';

import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { colors, spacing } from '@/constants/theme';

export function EmptyGarden() {
  return (
    <View style={styles.container}>
      <Svg width="100%" height={180} viewBox="0 0 240 160">
        <G stroke={colors.border} strokeWidth={1.5} fill="none">
          <Rect x={8} y={8} width={224} height={144} rx={16} />
          {[48, 88, 128, 168, 208].map((x) => (
            <Line key={x} x1={x} y1={8} x2={x} y2={152} />
          ))}
          {[44, 80, 116].map((y) => (
            <Line key={y} x1={8} y1={y} x2={232} y2={y} />
          ))}
        </G>
        <Circle cx={148} cy={98} r={16} fill="none" stroke={colors.primary} strokeWidth={2} strokeDasharray="5 5" />
      </Svg>
      <Text variant="large">
        Your terrace is empty. Add your first plant and we&apos;ll work out its sun and water.
      </Text>
      <Button title="Add plant" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xl },
  button: { alignSelf: 'flex-start' },
});
