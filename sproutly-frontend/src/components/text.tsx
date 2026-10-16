import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { colors, type ColorToken, type TypeVariant, type as typeRamp } from '@/constants/theme';

export type TextProps = RNTextProps & {
  variant?: TypeVariant;
  color?: ColorToken;
};

export function Text({ variant = 'body', color = 'text', style, ...rest }: TextProps) {
  return <RNText style={[typeRamp[variant], { color: colors[color] }, style]} {...rest} />;
}
