import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

// react-native-web adds `hovered` to the Pressable state (not in core RN types).
type PressState = { pressed: boolean; hovered?: boolean };

interface PrimaryLinkProps {
  href: string;
  title: string;
  description: string;
}

/** Primary menu entry: a distinct card with a bold heading + supporting line. */
export function PrimaryLink({ href, title, description }: PrimaryLinkProps) {
  return (
    <Link href={href as never} asChild>
      <Pressable
        accessibilityRole="link"
        style={(s) => {
          const { pressed, hovered } = s as PressState;
          return [styles.primaryCard, (pressed || hovered) && styles.primaryCardActive];
        }}>
        <Text style={styles.primaryTitle}>{title}</Text>
        <Text style={styles.primaryDesc}>{description}</Text>
      </Pressable>
    </Link>
  );
}

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
  const content = (
    <>
      <Ionicons name={icon} size={18} color={Colors.blue} />
      <Text style={styles.metaText}>{title}</Text>
    </>
  );

  const pressableStyle = (s: unknown) => {
    const { pressed, hovered } = s as PressState;
    return [styles.meta, (pressed || hovered) && styles.metaActive];
  };

  if (url) {
    return (
      <Pressable accessibilityRole="link" onPress={() => Linking.openURL(url)} style={pressableStyle}>
        {content}
      </Pressable>
    );
  }

  return (
    <Link href={href as never} asChild>
      <Pressable accessibilityRole="link" style={pressableStyle}>
        {content}
      </Pressable>
    </Link>
  );
}

const shadow = Platform.select({
  web: { boxShadow: '0 1px 3px rgba(0,0,0,0.07)' },
  default: {
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
});

const styles = StyleSheet.create({
  primaryCard: {
    backgroundColor: Colors.bgWhite,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 14,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.md,
    ...shadow,
  },
  primaryCardActive: {
    borderColor: Colors.blue,
  },
  primaryTitle: {
    color: Colors.blue,
    fontSize: 24,
    fontWeight: 'bold',
  },
  primaryDesc: {
    color: Colors.textMuted,
    fontSize: 15,
    marginTop: Spacing.xs,
  },
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
