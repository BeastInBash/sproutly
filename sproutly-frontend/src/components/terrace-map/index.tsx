import { useState } from 'react';
import { Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { PlantPhoto } from '@/components/plant-photo';
import { colors, fonts, palette, radius as radii } from '@/constants/theme';
import type { Plant, SunHours, Terrace } from '@/data/garden';

export type TerraceMapProps = {
  terrace: Terrace;
  plants: Plant[];
  /** Surface radius: 28 when the map is the screen's hero, 16 for a preview card. */
  radius?: number;
  /** Pot diameter in feet. */
  potFt?: number;
  onPotPress?: (plant: Plant) => void;
  /** Rotate the terrace 90° clockwise so its long side runs down the screen. */
  portrait?: boolean;
};

const rotateParapet = { top: 'right', right: 'bottom', bottom: 'left', left: 'top' } as const;

/** Rotates the layout 90° clockwise: (x, y) in W×D becomes (D − y, x) in D×W. */
function toPortrait(terrace: Terrace, plants: Plant[]) {
  const D = terrace.depthFt;
  return {
    terrace: {
      widthFt: D,
      depthFt: terrace.widthFt,
      parapet: rotateParapet[terrace.parapet],
      northDeg: terrace.northDeg - 90,
      zones: terrace.zones.map((z) => ({ ...z, x: D - z.y - z.h, y: z.x, w: z.h, h: z.w })),
    },
    plants: plants.map((p) => ({ ...p, x: D - p.y, y: p.x })),
  };
}

export const zoneFill: Record<SunHours, string> = {
  '2-4': 'transparent',
  '4-6': palette.seedling,
  '6+': 'rgba(244, 196, 48, 0.45)', // Pollen glow, flat (no gradient)
};

/**
 * The signature element: a top-down grid of the user's terrace. Sunny zones are Seedling,
 * the brightest spots get a flat Pollen glow, pots are circles with plant photos inside.
 */
export function TerraceMap({
  terrace: source,
  plants: sourcePlants,
  radius = radii.hero,
  potFt = 1.3,
  onPotPress,
  portrait,
}: TerraceMapProps) {
  const { terrace, plants } = portrait
    ? toPortrait(source, sourcePlants)
    : { terrace: source, plants: sourcePlants };
  const [width, setWidth] = useState(0);
  const ft = width / terrace.widthFt;
  const height = ft * terrace.depthFt;
  const pot = Math.max(28, ft * potFt);
  const compass = Math.max(28, ft * 1.1);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  return (
    <View
      onLayout={onLayout}
      style={[styles.surface, { borderRadius: radius, height: height || undefined, aspectRatio: terrace.widthFt / terrace.depthFt }]}
      accessibilityLabel={`Terrace map, ${terrace.widthFt} by ${terrace.depthFt} feet, ${plants.length} pots`}>
      {width > 0 ? (
        <>
          <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
            {terrace.zones
              .filter((z) => z.hours !== '2-4')
              .map((z, i) => {
                const box = { x: z.x * ft, y: z.y * ft, width: z.w * ft, height: z.h * ft };
                return (
                  <G key={i}>
                    {/* Reset to Rainwash first so the Pollen glow never mixes with Seedling. */}
                    {z.hours === '6+' ? <Rect {...box} fill={colors.background} /> : null}
                    <Rect {...box} fill={zoneFill[z.hours]} />
                  </G>
                );
              })}
            <G stroke={colors.border} strokeWidth={1}>
              {Array.from({ length: terrace.widthFt - 1 }, (_, i) => (
                <Line key={`v${i}`} x1={(i + 1) * ft} y1={0} x2={(i + 1) * ft} y2={height} />
              ))}
              {Array.from({ length: terrace.depthFt - 1 }, (_, i) => (
                <Line key={`h${i}`} x1={0} y1={(i + 1) * ft} x2={width} y2={(i + 1) * ft} />
              ))}
            </G>
            <Parapet side={terrace.parapet} width={width} height={height} />
            <Compass
              x={portrait ? width - compass / 2 - 14 : compass / 2 + 14}
              y={compass / 2 + 14}
              size={compass}
              northDeg={terrace.northDeg}
            />
          </Svg>
          {plants.map((p) => (
            <Pressable
              key={p.id}
              onPress={onPotPress ? () => onPotPress(p) : undefined}
              disabled={!onPotPress}
              accessibilityRole={onPotPress ? 'button' : 'image'}
              accessibilityLabel={`${p.name}${p.thirsty ? ', needs water' : ''}`}
              hitSlop={Math.max(0, (48 - pot) / 2)}
              style={({ pressed }) => [
                styles.pot,
                { left: p.x * ft - pot / 2, top: p.y * ft - pot / 2 },
                pressed && styles.pressed,
              ]}>
              <PlantPhoto
                uri={p.photo}
                size={pot}
                shape="circle"
                ring={p.thirsty ? colors.urgent : colors.background}
              />
            </Pressable>
          ))}
        </>
      ) : null}
    </View>
  );
}

function Parapet({ side, width, height }: { side: Terrace['parapet']; width: number; height: number }) {
  const t = 6;
  const rect = {
    top: { x: 0, y: 0, w: width, h: t },
    bottom: { x: 0, y: height - t, w: width, h: t },
    left: { x: 0, y: 0, w: t, h: height },
    right: { x: width - t, y: 0, w: t, h: height },
  }[side];
  return <Rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill={colors.text} />;
}

/** Upright "N" with a Tomato needle pointing to north. */
function Compass({ x, y, size, northDeg }: { x: number; y: number; size: number; northDeg: number }) {
  const r = size / 2;
  return (
    // Plain transform strings: x/y/rotation props emit an invalid transform-origin on web.
    <G transform={`translate(${x} ${y})`}>
      <Circle r={r} fill={colors.background} stroke={colors.text} strokeWidth={2} />
      <G transform={`rotate(${-northDeg})`}>
        <Path d={`M 0 ${-r * 0.92} L ${r * 0.22} ${-r * 0.5} L ${-r * 0.22} ${-r * 0.5} Z`} fill={colors.urgent} />
      </G>
      <SvgText
        y={r * 0.26}
        fontSize={r * 0.72}
        fontFamily={fonts.heading}
        fill={colors.text}
        textAnchor="middle">
        N
      </SvgText>
    </G>
  );
}

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    overflow: 'hidden',
    borderCurve: 'continuous',
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  pot: { position: 'absolute' },
  pressed: { opacity: 0.8, transform: [{ scale: 0.96 }] },
});
