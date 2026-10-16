import type { LucideIcon } from 'lucide-react-native';

import { colors, iconStroke, type ColorToken } from '@/constants/theme';

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  color?: ColorToken;
};

/** Rounded 2px-stroke line icons, Aubergine by default. Decorative: label the parent control. */
export function Icon({ icon: Glyph, size = 24, color = 'icon' }: IconProps) {
  return (
    <Glyph
      size={size}
      color={colors[color]}
      strokeWidth={iconStroke}
      absoluteStrokeWidth
    />
  );
}
