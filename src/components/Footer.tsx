import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

/**
 * Structural footer bar. Copyright now lives at the bottom of each section /
 * reading (see CopyrightNote), so this is just the branded base of the layout.
 */
export default function Footer() {
  const insets = useSafeAreaInsets();
  return <View style={[styles.footer, { paddingBottom: insets.bottom }]} role="contentinfo" />;
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.blue,
    width: '100%',
    minHeight: 24,
  },
});
