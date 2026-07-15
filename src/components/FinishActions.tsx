import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import { Colors, Spacing } from '@/constants/theme';
import { exportInventoryPdf } from '@/services/exportPdf';
import { STORAGE_ENABLED } from '@/services/storage';
import { useInventory } from '@/store/inventory';

/**
 * Actions on the final inventory page: download a PDF of the responses and
 * optionally save the entry to on-device history. Nothing leaves the device.
 */
export default function FinishActions({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const { answers, saveEntry } = useInventory();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleDownload = async () => {
    try {
      await exportInventoryPdf(answers);
    } catch {
      // Print/share dismissed or unavailable — nothing to recover.
    }
  };

  const handleSave = async () => {
    setBusy(true);
    try {
      await saveEntry();
      setSaved(true);
      router.push('/history');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button label="Download PDF" onPress={handleDownload} style={styles.button} />
      {STORAGE_ENABLED ? (
        <>
          <Button
            label={saved ? 'Saved ✓' : 'Save to my history'}
            variant="outline"
            onPress={handleSave}
            disabled={busy || saved}
            style={styles.button}
          />
          <Text style={styles.note}>
            Saving keeps this entry on your device only. It is never uploaded anywhere.
          </Text>
        </>
      ) : (
        <Text style={styles.note}>
          Nothing you enter is saved anywhere. Download a PDF to keep a copy of your responses.
        </Text>
      )}
      <Button label="Back" variant="outline" onPress={onBack} style={styles.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  button: {
    alignSelf: 'stretch',
  },
  note: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  back: {
    alignSelf: 'center',
    minWidth: 140,
    marginTop: Spacing.sm,
  },
});
