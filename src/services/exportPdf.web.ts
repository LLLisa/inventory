/**
 * Web PDF export. expo-print's web build is just `window.print()`, which would
 * print the current app screen — not our document. Instead we render the full
 * generated inventory HTML into a hidden iframe and print that, so the output is
 * a complete record of every question and response (blank ones included). The
 * user chooses "Save as PDF" in the print dialog, matching the legacy download.
 */

import { type Answers } from '@/data/fullText';
import { generateHTML } from '@/utils/generateHTML';

export async function exportInventoryPdf(answers: Answers): Promise<void> {
  const html = generateHTML(answers, new Date().toDateString());

  const iframe = document.createElement('iframe');
  Object.assign(iframe.style, {
    position: 'fixed',
    right: '0',
    bottom: '0',
    width: '0',
    height: '0',
    border: '0',
  });
  iframe.setAttribute('aria-hidden', 'true');

  await new Promise<void>((resolve) => {
    let settled = false;
    const cleanup = () => {
      if (settled) return;
      settled = true;
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      resolve();
    };

    iframe.onload = () => {
      const win = iframe.contentWindow;
      if (!win) {
        cleanup();
        return;
      }
      win.onafterprint = cleanup;
      // Give the iframe a tick to lay out before printing.
      setTimeout(() => {
        win.focus();
        win.print();
        // Fallback cleanup in case `onafterprint` never fires (e.g. dialog cancelled).
        setTimeout(cleanup, 60000);
      }, 150);
    };

    document.body.appendChild(iframe);
    iframe.srcdoc = html;
  });
}
