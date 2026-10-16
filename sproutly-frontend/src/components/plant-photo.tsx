import { Image } from 'expo-image';
import { Sprout } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { colors, radius } from '@/constants/theme';

export type PlantPhotoProps = {
  uri?: string;
  size: number;
  /** Soft rounded square (default) or circle, e.g. pots on the map. */
  shape?: 'square' | 'circle';
  /** Ring color, e.g. Tomato for a thirsty plant. */
  ring?: string;
  label?: string;
};

/** Real plant photo cropped as a soft rounded square. Falls back to a Seedling tile with a sprout. */
export function PlantPhoto({ uri, size, shape = 'square', ring, label }: PlantPhotoProps) {
  const borderRadius = shape === 'circle' ? size / 2 : Math.min(radius.card, size * 0.28);
  const frame = {
    width: size,
    height: size,
    borderRadius,
    ...(ring && { borderWidth: 3, borderColor: ring }),
  };

  return (
    <View
      style={[styles.frame, frame]}
      accessible={!!label}
      accessibilityRole={label ? 'image' : undefined}
      accessibilityLabel={label}>
      {uri ? (
        <Image source={{ uri }} style={StyleSheet.absoluteFill} contentFit="cover" transition={150} />
      ) : (
        <Icon icon={Sprout} size={Math.round(size * 0.45)} color="primary" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    borderCurve: 'continuous',
    backgroundColor: colors.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
