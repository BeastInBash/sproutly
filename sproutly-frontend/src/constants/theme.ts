/**
 * Sproutly design tokens. The source of truth is Sproutly-screen-design.md:
 * "kitchen garden in full sun". Light only, flat fills, no shadows, no gradients.
 * Typography override (requested 2026-10-16): Inter for headlines, Roboto for body,
 * replacing the file's Bricolage Grotesque / Atkinson Hyperlegible.
 */
import type { TextStyle } from 'react-native';

/** The six palette colors, exactly as specified. */
export const palette = {
  rainwash: '#F7F9F4',
  aubergine: '#2E1A2B',
  chlorophyll: '#2F7D3A',
  seedling: '#DDEFC9',
  pollen: '#F4C430',
  tomato: '#E2462F',
} as const;

/** Semantic roles. Screens and components use these, never raw hex values. */
export const colors = {
  background: palette.rainwash,
  text: palette.aubergine,
  /** Aubergine at reduced strength for secondary copy. Still Aubergine, never grey. */
  textMuted: 'rgba(46, 26, 43, 0.72)',
  icon: palette.aubergine,
  primary: palette.chlorophyll,
  onPrimary: palette.rainwash,
  soft: palette.seedling,
  sun: palette.pollen,
  urgent: palette.tomato,
  urgentSoft: 'rgba(226, 70, 47, 0.14)',
  /** Hairlines and outlines: Aubergine at low strength. */
  border: 'rgba(46, 26, 43, 0.16)',
  pressed: 'rgba(46, 26, 43, 0.06)',
} as const;

export type ColorToken = keyof typeof colors;

/** 4-point grid. `gutter` is the 20px side margin. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  gutter: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Radius follows hierarchy: hero 28, cards and rows 16, pills fully round. */
export const radius = {
  hero: 28,
  card: 16,
  thumb: 12,
  pill: 9999,
} as const;

/** Minimum touch target. */
export const touch = 48;

export const fonts = {
  display: 'Inter_800ExtraBold',
  heading: 'Inter_700Bold',
  body: 'Roboto_400Regular',
  bodyMedium: 'Roboto_500Medium',
  bodyBold: 'Roboto_700Bold',
} as const;

/** Inter for headlines (tight tracking), Roboto at 16px+ for everything else. */
export const type = {
  display: { fontFamily: fonts.display, fontSize: 44, lineHeight: 48, letterSpacing: -1.3 },
  title: { fontFamily: fonts.heading, fontSize: 32, lineHeight: 38, letterSpacing: -0.8 },
  heading: { fontFamily: fonts.heading, fontSize: 24, lineHeight: 30, letterSpacing: -0.5 },
  subheading: { fontFamily: fonts.heading, fontSize: 20, lineHeight: 26, letterSpacing: -0.3 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24 },
  bodyBold: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 24 },
  label: { fontFamily: fonts.bodyMedium, fontSize: 16, lineHeight: 20, letterSpacing: 0.1 },
  large: { fontFamily: fonts.body, fontSize: 18, lineHeight: 26 },
} as const satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof type;

export const iconStroke = 2;

/**
 * Dark status bar text and icons everywhere: every screen sits on the light Rainwash
 * background (the app is light-only).
 */
export const statusBarStyle = 'dark' as const;
export const MaxContentWidth = 640;
