/**
 * Native (iOS/Android) PDF export: render the full inventory HTML to a real PDF
 * file with expo-print, then open the share sheet to save or send it. The web
 * counterpart lives in exportPdf.web.ts (Metro picks the right one per platform).
 *
 * The generated document is a complete record — every question and response,
 * including questions left blank.
 */

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { type Answers } from '@/data/fullText';
import { generateHTML } from '@/utils/generateHTML';

export async function exportInventoryPdf(answers: Answers): Promise<void> {
  const date = new Date().toDateString();
  const html = generateHTML(answers, date);

  const { uri } = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: `Daily Inventory for ${date}`,
      UTI: 'com.adobe.pdf',
    });
  }
}
