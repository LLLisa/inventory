/**
 * Cross-platform PDF export of a completed inventory.
 * - Native (iOS/Android): render HTML → PDF file via expo-print, then open the
 *   share sheet so the user can save or send it.
 * - Web: expo-print's printAsync opens the browser print dialog, from which the
 *   user can "Save as PDF".
 */

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

import { type Answers } from '@/data/fullText';
import { generateHTML } from '@/utils/generateHTML';

export async function exportInventoryPdf(answers: Answers): Promise<void> {
  const date = new Date().toDateString();
  const html = generateHTML(answers, date);

  if (Platform.OS === 'web') {
    await Print.printAsync({ html });
    return;
  }

  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: `Daily Inventory for ${date}`,
      UTI: 'com.adobe.pdf',
    });
  }
}
