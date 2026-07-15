import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

// Visible footer height on platforms that report no bottom inset (e.g. web).
const FOOTER_MIN_HEIGHT = 36;

/**
 * Structural footer bar. Copyright now lives at the bottom of each section /
 * reading (see CopyrightNote), so this is just the branded base of the layout.
 *
 * It sizes to `max(min, bottom inset)` rather than adding the inset on top of a
 * fixed height. Under Android edge-to-edge the bottom inset is the system nav
 * bar height, so the brand blue merges with the nav area instead of stacking a
 * second bar above it.
 */
export default function Footer() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.footer, { height: Math.max(FOOTER_MIN_HEIGHT, insets.bottom) }]}
      role="contentinfo"
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.blue,
    width: '100%',
  },
});
