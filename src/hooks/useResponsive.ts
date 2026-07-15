import { useWindowDimensions } from 'react-native';

/** Width (px) at/above which we switch to the roomier large-screen layout. */
export const LARGE_BREAKPOINT = 700;

/** True when the viewport is wide enough for the large-screen treatment. */
export function useIsLarge(): boolean {
  const { width } = useWindowDimensions();
  return width >= LARGE_BREAKPOINT;
}
