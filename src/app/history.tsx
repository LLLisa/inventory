import { Link, Redirect, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Screen from '@/components/Screen';
import Seo from '@/components/Seo';
import { Colors, Spacing } from '@/constants/theme';
import { answerKeys } from '@/data/fullText';
import { exportInventoryPdf } from '@/services/exportPdf';
import { deleteEntry, loadEntries, STORAGE_ENABLED, type Entry } from '@/services/storage';

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString()} · ${d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
}

function EntryCard({ entry, onDelete }: { entry: Entry; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const answered = answerKeys.filter((k) => entry.answers[k]?.trim());

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        onPress={() => setExpanded((v) => !v)}
        style={styles.cardHeader}>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardDate}>{formatDate(entry.savedAt)}</Text>
          <Text style={styles.cardMeta}>
            {answered.length} {answered.length === 1 ? 'response' : 'responses'}
          </Text>
        </View>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </Pressable>

      {expanded ? (
        <View style={styles.detail}>
          {answered.length === 0 ? (
            <Text style={styles.emptyDetail}>No responses recorded.</Text>
          ) : (
            answered.map((key) => (
              <View key={key} style={styles.qa}>
                <Text style={styles.question}>{key}</Text>
                <Text style={styles.answer}>{entry.answers[key]}</Text>
              </View>
            ))
          )}
          <View style={styles.cardActions}>
            <Button
              label="Download PDF"
              onPress={() =>
                exportInventoryPdf(entry.answers).catch(() =>
                  Alert.alert(
                    "Couldn't create the PDF",
                    'Your device was unable to generate or share the file. Please try again.',
                  ),
                )
              }
              style={styles.cardAction}
            />
            <Button
              label="Delete"
              variant="outline"
              onPress={() => onDelete(entry.id)}
              style={styles.cardAction}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default function HistoryScreen() {
  // The web keeps no history — nothing is stored there. Send users home.
  if (!STORAGE_ENABLED) {
    return <Redirect href="/" />;
  }
  return <HistoryList />;
}

function HistoryList() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    loadEntries().then((e) => {
      setEntries(e);
      setLoaded(true);
    });
  }, []);

  useFocusEffect(refresh);

  const handleDelete = useCallback(
    (id: string) => {
      // Swallow a failed delete (storage error) but still refresh from disk.
      deleteEntry(id)
        .catch(() => {})
        .then(refresh);
    },
    [refresh],
  );

  return (
    <Screen>
      <Seo
        path="/history"
        title="My Saved Inventories"
        description="Review the daily inventories you've saved on this device."
      />

      <Text
        style={styles.h1}
        role="heading"
        aria-level={1}>
        My saved inventories
      </Text>
      <Text style={styles.sub}>Stored only on this device. Nothing here is ever uploaded.</Text>

      {loaded && entries.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>You haven&apos;t saved any inventories yet.</Text>
          <Link href="/inventory/0" style={styles.emptyLink}>
            Begin one now
          </Link>
        </View>
      ) : (
        <View style={styles.list}>
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </View>
      )}
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
  sub: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  list: {
    gap: Spacing.md,
  },
  card: {
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 10,
    backgroundColor: Colors.bgWhite,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardDate: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  cardMeta: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  chevron: {
    fontSize: 12,
    color: Colors.textMuted,
    paddingLeft: Spacing.md,
  },
  detail: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
  },
  qa: {
    marginTop: Spacing.md,
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  answer: {
    fontSize: 15,
    color: Colors.textMuted,
    marginTop: 2,
  },
  emptyDetail: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: Spacing.md,
  },
  cardActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  cardAction: {
    flex: 1,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  emptyLink: {
    fontSize: 16,
    color: Colors.blue,
    fontWeight: '600',
  },
});
