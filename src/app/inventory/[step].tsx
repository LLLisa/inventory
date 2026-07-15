import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import FinishActions from '@/components/FinishActions';
import PromptField from '@/components/PromptField';
import Screen from '@/components/Screen';
import Seo from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';
import { fullText, LAST_PAGE } from '@/data/fullText';

/** Pre-render each inventory step (0…LAST_PAGE) to its own static HTML file. */
export function generateStaticParams(): { step: string }[] {
  return Array.from({ length: LAST_PAGE + 1 }, (_, i) => ({ step: String(i) }));
}

export default function InventoryStep() {
  const router = useRouter();
  const { step: stepParam } = useLocalSearchParams<{ step: string }>();
  const step = Number(stepParam);

  const isValid = /^\d+$/.test(stepParam ?? '') && step >= 0 && step <= LAST_PAGE;
  if (!isValid) {
    return (
      <Screen>
        <View style={styles.invalid}>
          <Text style={styles.invalidText}>That inventory page doesn&apos;t exist.</Text>
          <Link href="/inventory/0" style={styles.invalidLink}>
            Start the inventory
          </Link>
        </View>
      </Screen>
    );
  }

  const page = fullText[step];
  const isIntro = step === 0;
  const isLast = step === LAST_PAGE;

  return (
    <Screen>
      <Seo
        path={`/inventory/${step}`}
        title={isIntro ? 'Begin a Daily Inventory' : `Daily Inventory — Part ${step}`}
        description="Work through a private daily 10th-step inventory based on NA IP #9, 'Living the Program'. Your answers stay on your device."
      />

      <Text
        style={[styles.title, isIntro && styles.introTitle]}
        role="heading"
        aria-level={1}>
        {page.title}
      </Text>

      <View style={styles.form}>
        {page.prompts.map((prompt) => (
          <PromptField key={prompt.text} prompt={prompt} />
        ))}
      </View>

      {isIntro ? (
        <Button label="Begin" onPress={() => router.push('/inventory/1')} style={styles.begin} />
      ) : isLast ? (
        <FinishActions onBack={() => router.push(`/inventory/${step - 1}`)} />
      ) : (
        <View style={styles.navRow}>
          <Button
            label="Back"
            variant="outline"
            onPress={() => router.push(step === 1 ? '/' : `/inventory/${step - 1}`)}
            style={styles.navButton}
          />
          <Button
            label="Next"
            onPress={() => router.push(`/inventory/${step + 1}`)}
            style={styles.navButton}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  introTitle: {
    fontStyle: 'normal',
    fontSize: 22,
  },
  form: {
    marginTop: Spacing.sm,
  },
  begin: {
    alignSelf: 'center',
    minWidth: 200,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  navButton: {
    flex: 1,
  },
  invalid: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  invalidText: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  invalidLink: {
    fontSize: 16,
    color: Colors.blue,
    fontWeight: '600',
  },
});
