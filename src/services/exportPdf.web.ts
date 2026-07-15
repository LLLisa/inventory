/**
 * Web PDF export — builds a real, multi-page PDF in the browser with jsPDF and
 * downloads it directly (no print dialog). The document is a complete record:
 * every section, every question, and its response — including questions left
 * blank (shown with a dash).
 *
 * jsPDF is imported only here, so it is bundled for web only; the native export
 * (exportPdf.ts) uses expo-print instead.
 */

// Import the browser ESM build explicitly (see src/types/jspdf-dist.d.ts).
import { jsPDF } from 'jspdf/dist/jspdf.es.min.js';

import { fullText, promptType, type Answers } from '@/data/fullText';

const INK: [number, number, number] = [26, 26, 26];
const MUTED: [number, number, number] = [74, 74, 74];
const PLACEHOLDER: [number, number, number] = [150, 150, 150];

interface LineOpts {
  size?: number;
  style?: 'normal' | 'bold' | 'italic';
  gap?: number;
  color?: [number, number, number];
  align?: 'left' | 'center';
}

/** Builds the complete inventory PDF document (exported for testing). */
export function buildInventoryPdf(answers: Answers, date: string): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });

  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const write = (text: string, opts: LineOpts = {}) => {
    const { size = 11, style = 'normal', gap = 4, color = INK, align = 'left' } = opts;
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lineHeight = size * 1.35;
    const lines = doc.splitTextToSize(text.length ? text : ' ', contentWidth) as string[];
    for (const line of lines) {
      ensureSpace(lineHeight);
      const x = align === 'center' ? pageWidth / 2 : margin;
      doc.text(line, x, y, { align });
      y += lineHeight;
    }
    y += gap;
  };

  // Header
  write('Living the Program', { size: 20, style: 'bold', gap: 2, align: 'center' });
  write(date, { size: 10, color: MUTED, gap: 12, align: 'center' });

  const [intro, ...sections] = fullText;
  write(intro.title, { size: 14, style: 'bold', gap: 6 });
  write(
    intro.prompts.map((p) => p.text.trim()).join(' '),
    { size: 11, color: MUTED, gap: 14 },
  );

  // Each "Just for today…" section, then the closing Notes section.
  for (const page of sections) {
    ensureSpace(48);
    write(page.title, { size: 12, style: 'italic', gap: 8 });

    const prompts = page.prompts
      .flatMap((prompt) => (prompt.sub ? [prompt, prompt.sub] : [prompt]))
      .filter((prompt) => prompt.type !== promptType.plainText);

    for (const prompt of prompts) {
      const label = prompt.text === 'Notes' ? 'Notes:' : prompt.text;
      const response = (answers[prompt.text] ?? '').trim();
      write(label, { size: 11, style: 'bold', gap: 2 });
      write(response.length ? response : '—', {
        size: 11,
        color: response.length ? INK : PLACEHOLDER,
        gap: 10,
      });
    }
    y += 6;
  }

  // Attribution / copyright
  ensureSpace(48);
  write('Taken from the NA informational Pamphlet #9, "Living the Program".', {
    size: 8,
    color: MUTED,
    gap: 2,
  });
  write('Copyright © 1983 by Narcotics Anonymous World Services, Inc. All rights reserved.', {
    size: 8,
    color: MUTED,
  });

  return doc;
}

export async function exportInventoryPdf(answers: Answers): Promise<void> {
  const date = new Date().toDateString();
  const doc = buildInventoryPdf(answers, date);
  doc.save(`Daily Inventory for ${date}.pdf`);
}
