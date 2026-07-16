import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

// react-native-web adds `hovered` to the Pressable state (not in core RN types).
type PressState = { pressed: boolean; hovered?: boolean };

interface MetaLinkProps {
  title: string;
  /** Internal route path, mutually exclusive with `url`. */
  href?: string;
  /** External URL opened in the browser. */
  url?: string;
  icon: keyof typeof Ionicons.glyphMap;
}

/** Small secondary link used in the footer row of the menu. */
export function MetaLink({ title, href, url, icon }: MetaLinkProps) {
  // Render the row as an inner View via Pressable's function-child. A function
  // `style` on the Pressable is dropped when it's slotted into <Link asChild>,
  // which stripped `flex-direction: row` and stacked the icon above the text.
  const renderInner = (s: unknown) => {
    const { pressed, hovered } = s as PressState;
    return (
      <View style={[styles.meta, (pressed || hovered) && styles.metaActive]}>
        <Ionicons name={icon} size={18} color={Colors.blue} />
        <Text style={styles.metaText}>{title}</Text>
      </View>
    );
  };

  if (url) {
    return (
      <Pressable accessibilityRole="link" onPress={() => Linking.openURL(url)}>
        {renderInner}
      </Pressable>
    );
  }

  return (
    <Link href={href as never} asChild>
      <Pressable accessibilityRole="link">{renderInner}</Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
  },
  metaActive: {
    backgroundColor: Colors.borderGray,
  },
  metaText: {
    color: Colors.blue,
    fontSize: 15,
    fontWeight: '600',
  },
});
