import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

interface ScreenProps {
  children: ReactNode;
  /** Fill height and disable scrolling (e.g. the menu, which lays itself out). */
  fill?: boolean;
  contentStyle?: ViewStyle;
}

/**
 * Shared page body: an off-white, scrollable area with a centered, max-width
 * reading column. Mirrors the legacy `.content-container`.
 */
export default function Screen({ children, fill, contentStyle }: ScreenProps) {
  if (fill) {
    return (
      <View style={styles.fillRoot}>
        <View style={[styles.column, styles.fillColumn, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled">
      <View style={[styles.column, contentStyle]}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.bgOffWhite,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  fillRoot: {
    flex: 1,
    backgroundColor: Colors.bgOffWhite,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: 650,
  },
  fillColumn: {
    flex: 1,
  },
});
