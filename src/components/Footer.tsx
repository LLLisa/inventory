import { usePathname } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, MaxContentWidth } from '@/constants/theme';
import { basicText, itWorks } from '@/data/readings';

const INVENTORY_COPYRIGHT =
  'Copyright © 1983 by Narcotics Anonymous World Services, Inc. All rights reserved.';

/** Chooses the copyright line appropriate to the current route. */
function copyrightFor(pathname: string): string | null {
  if (pathname.startsWith('/inventory')) return INVENTORY_COPYRIGHT;
  if (pathname === `/${basicText.slug}`) return basicText.copyright;
  if (pathname === `/${itWorks.slug}`) return itWorks.copyright;
  return null;
}

export default function Footer() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const text = copyrightFor(pathname);

  return (
    <View
      style={[styles.footer, { paddingBottom: insets.bottom }]}
      role="contentinfo">
      {text ? (
        <View style={styles.inner}>
          <Text style={styles.text}>{text}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.blue,
    width: '100%',
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    color: Colors.textWhite,
    fontSize: 12,
    textAlign: 'center',
  },
});
