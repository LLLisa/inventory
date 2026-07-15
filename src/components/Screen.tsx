import { type ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { Colors, Spacing } from '@/constants/theme';

interface ScreenProps {
  children: ReactNode;
  /** Fill height and disable scrolling (e.g. the menu, which lays itself out). */
  fill?: boolean;
  contentStyle?: ViewStyle;
  /** Native only: called on a left swipe (advance). */
  onSwipeLeft?: () => void;
  /** Native only: called on a right swipe (go back). */
  onSwipeRight?: () => void;
}

// A swipe counts once it clears this horizontal distance, or shorter with a flick.
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 500;

/**
 * Shared page body: an off-white, scrollable area with a centered, max-width
 * reading column. Mirrors the legacy `.content-container`.
 *
 * When swipe handlers are supplied (native only), a horizontal pan navigates
 * between pages. It activates only on clearly-horizontal drags so vertical
 * scrolling and text selection are unaffected; on web it is skipped entirely.
 */
export default function Screen({
  children,
  fill,
  contentStyle,
  onSwipeLeft,
  onSwipeRight,
}: ScreenProps) {
  if (fill) {
    return (
      <View style={styles.fillRoot}>
        <View style={[styles.column, styles.fillColumn, contentStyle]}>{children}</View>
      </View>
    );
  }

  const scroll = (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled">
      <View style={[styles.column, contentStyle]}>{children}</View>
    </ScrollView>
  );

  const swipeEnabled = Platform.OS !== 'web' && (onSwipeLeft || onSwipeRight);
  if (!swipeEnabled) return scroll;

  const swipe = Gesture.Pan()
    .runOnJS(true)
    // Only claim clearly-horizontal drags; let vertical scrolls fall through.
    .activeOffsetX([-24, 24])
    .failOffsetY([-18, 18])
    .onEnd((e) => {
      const left = e.translationX <= -SWIPE_DISTANCE || e.velocityX <= -SWIPE_VELOCITY;
      const right = e.translationX >= SWIPE_DISTANCE || e.velocityX >= SWIPE_VELOCITY;
      if (left) onSwipeLeft?.();
      else if (right) onSwipeRight?.();
    });

  return <GestureDetector gesture={swipe}>{scroll}</GestureDetector>;
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.bgOffWhite,
  },
  scrollContent: {
    flexGrow: 1,
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
