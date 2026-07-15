import { StyleSheet, Text, View } from 'react-native';

import Screen from '@/components/Screen';
import Seo, { SITE_URL } from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <View style={styles.step}>
      <Text style={styles.stepLabel}>Step {n}</Text>
      <Text style={styles.stepBody}>{children}</Text>
    </View>
  );
}

export default function InstallScreen() {
  return (
    <Screen>
      <Seo
        path="/install"
        title="Install on Your Phone"
        description="Install NA Daily Inventory on your phone's home screen so you can work your daily 10th step anytime, even offline."
      />

      <Text
        style={styles.h1}
        role="heading"
        aria-level={1}>
        Install this app on your phone
      </Text>

      <View style={styles.body}>
        <Step n={1}>
          <Text style={styles.bold}>iPhone: </Text>
          Open {SITE_URL.replace('https://', '')} in Safari and tap the Share button (the square with
          an up arrow) at the bottom of the screen.
          {'\n\n'}
          <Text style={styles.bold}>Android: </Text>
          Open {SITE_URL.replace('https://', '')} in Chrome and tap the menu button (three dots) in
          the top-right corner.
        </Step>
        <Step n={2}>Scroll down and tap &quot;Add to Home Screen.&quot;</Step>
        <Step n={3}>Edit the title to whatever you&apos;d like and tap &quot;Add.&quot;</Step>
        <Step n={4}>Enjoy this app on mobile!</Step>
      </View>

      <Text style={styles.note}>
        A dedicated iOS and Android app is on the way to the App Store and Google Play.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  body: {
    marginTop: Spacing.lg,
  },
  step: {
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blue,
    marginBottom: Spacing.xs,
  },
  stepBody: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    textAlign: 'center',
    maxWidth: 520,
  },
  bold: {
    fontWeight: 'bold',
  },
  note: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
