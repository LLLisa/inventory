/**
 * Brand palette + layout tokens for NA Daily Inventory.
 * Ported from the legacy `public/theme.css` :root variables so the visual
 * identity (NA blue on off-white) carries over unchanged.
 */

export const Colors = {
  /** Primary NA blue — header, buttons, links */
  blue: 'rgb(0, 0, 255)',
  lightBlue: 'rgb(66, 126, 255)',
  textWhite: 'rgb(255, 255, 255)',
  bgWhite: 'rgb(255, 255, 255)',
  /** App background */
  bgOffWhite: '#eeeeee',
  darkGray: '#6e6e6e',
  borderGray: '#dddddd',
  text: '#1a1a1a',
  textMuted: '#4a4a4a',
} as const;

/** Consistent spacing scale (in px) */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Caps the readable column width on wide screens (matches legacy 775px nav width). */
export const MaxContentWidth = 775;

export const HeaderHeight = 72;

export const FontFamily = 'Arial, Helvetica, sans-serif';
