import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, HeaderHeight, MaxContentWidth } from '@/constants/theme';
import { LAST_PAGE } from '@/data/fullText';

/**
 * Reads the current inventory step from the pathname (e.g. /inventory/3 -> 3).
 * Returns null on any non-inventory route.
 */
function useStep(): number | null {
  const pathname = usePathname();
  const match = pathname.match(/^\/inventory\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

export default function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const step = useStep();

  const showBack = step !== null && step > 0;
  const showNext = step !== null && step > 0 && step < LAST_PAGE;

  return (
    <View
      style={[styles.header, { paddingTop: insets.top, height: HeaderHeight + insets.top }]}
      role="banner">
      <View style={styles.nav}>
        <View pointerEvents="box-none" style={styles.titleWrap}>
          <Link href="/" accessibilityLabel="Home">
            <Text style={styles.homeTitle} role="heading" aria-level={1}>
              Living the Program
            </Text>
          </Link>
        </View>

        <View style={styles.side}>
          {showBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous page"
              onPress={() => router.push(`/inventory/${step - 1}`)}
              style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]}>
              <Ionicons name="chevron-back" size={26} color={Colors.textWhite} />
            </Pressable>
          ) : (
            <View style={styles.navButton} />
          )}
        </View>

        <View style={styles.side}>
          {showNext ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next page"
              onPress={() => router.push(`/inventory/${step + 1}`)}
              style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]}>
              <Ionicons name="chevron-forward" size={26} color={Colors.textWhite} />
            </Pressable>
          ) : (
            <View style={styles.navButton} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.blue,
    width: '100%',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  nav: {
    width: '100%',
    maxWidth: MaxContentWidth,
    marginHorizontal: 'auto',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: HeaderHeight,
  },
  side: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    width: 56,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonPressed: {
    backgroundColor: Colors.lightBlue,
  },
  titleWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeTitle: {
    color: Colors.textWhite,
    fontSize: Platform.OS === 'web' ? 28 : 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
