import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

interface PrimaryLinkProps {
  href: string;
  title: string;
  description: string;
}

/** Large primary menu entry: bold heading + supporting line. */
export function PrimaryLink({ href, title, description }: PrimaryLinkProps) {
  return (
    <Link href={href as never} asChild>
      <Pressable
        accessibilityRole="link"
        style={({ pressed }) => [styles.primary, pressed && styles.primaryPressed]}>
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

  if (url) {
    return (
      <Pressable
        accessibilityRole="link"
        onPress={() => Linking.openURL(url)}
        style={({ pressed }) => [styles.meta, pressed && styles.metaPressed]}>
        {content}
      </Pressable>
    );
  }

  return (
    <Link href={href as never} asChild>
      <Pressable
        accessibilityRole="link"
        style={({ pressed }) => [styles.meta, pressed && styles.metaPressed]}>
        {content}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  primary: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
  },
  primaryPressed: {
    opacity: 0.6,
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
  },
  metaPressed: {
    opacity: 0.6,
  },
  metaText: {
    color: Colors.blue,
    fontSize: 15,
    fontWeight: '600',
  },
});
