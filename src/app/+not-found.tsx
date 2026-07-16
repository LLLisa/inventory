import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Screen from '@/components/Screen';
import Seo from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <Screen>
      <Seo path="/404" title="Page Not Found" description="This page could not be found." noindex />
      <View style={styles.container}>
        <Text style={styles.heading}>Page not found</Text>
        <Text style={styles.body}>The page you were looking for isn&apos;t here.</Text>
        <Link href="/" style={styles.link}>
          Go to the home page
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  body: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  link: {
    fontSize: 16,
    color: Colors.blue,
    fontWeight: '600',
  },
});
