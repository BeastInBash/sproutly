/**
 * Motion tokens. Subtle and quick: state changes 120–180ms, entrances ~320ms, ease-out only.
 * Reduced motion keeps opacity and color, drops movement.
 */
import { cubicBezier, Easing, FadeIn, Keyframe, ReduceMotion } from 'react-native-reanimated';

export const duration = {
  press: 120,
  state: 180,
  enter: 320,
} as const;

/** For CSS transitions (`transitionTimingFunction`). */
export const cssEaseOut = cubicBezier(0.23, 1, 0.32, 1);
/** For withTiming / layout animations. */
export const easeOut = Easing.bezier(0.23, 1, 0.32, 1);

/** Fade up 8px. Pass an index to stagger groups by 60ms. */
export function riseIn(index = 0, reducedMotion = false) {
  if (reducedMotion) return FadeIn.duration(duration.state).reduceMotion(ReduceMotion.Never);
  return new Keyframe({
    0: { opacity: 0, transform: [{ translateY: 8 }] },
    100: { opacity: 1, transform: [{ translateY: 0 }], easing: easeOut },
  })
    .duration(duration.enter)
    .delay(index * 60);
}

/** Small status marks (check, cross): fade in from 90% scale. */
export function popIn(reducedMotion = false) {
  if (reducedMotion) return FadeIn.duration(duration.state).reduceMotion(ReduceMotion.Never);
  return new Keyframe({
    0: { opacity: 0, transform: [{ scale: 0.9 }] },
    100: { opacity: 1, transform: [{ scale: 1 }], easing: easeOut },
  }).duration(duration.state);
}
