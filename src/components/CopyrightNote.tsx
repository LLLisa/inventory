import { StyleSheet, Text } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

/** Small, muted copyright line shown at the bottom of a section or reading. */
export default function CopyrightNote({ text }: { text: string }) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
});
