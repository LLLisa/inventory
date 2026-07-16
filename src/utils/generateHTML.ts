/**
 * Builds a self-contained HTML document from a completed inventory, used as the
 * source for the native PDF export (expo-print). The web export builds its PDF
 * directly with jsPDF instead (see exportPdf.web.ts).
 *
 * Iterates the `fullText` structure directly so section headings and question
 * order always match the on-screen form.
 */

import { fullText, promptType, type Answers } from '@/data/fullText';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function generateHTML(answers: Answers, date: string = new Date().toDateString()): string {
  const [intro, ...sections] = fullText;

  const introText = intro.prompts.map((p) => p.text.trim()).join(' ');

  const sectionsHtml = sections
    .map((page) => {
      const items = page.prompts
        .flatMap((prompt) => (prompt.sub ? [prompt, prompt.sub] : [prompt]))
        .filter((prompt) => prompt.type !== promptType.plainText)
        .map((prompt) => {
          const label = prompt.text === 'Notes' ? 'Notes:' : prompt.text;
          const response = escapeHtml(answers[prompt.text] ?? '');
          return `<li>
              <div class="prompt">${escapeHtml(label)}</div>
              <div class="response">${response}</div>
            </li>`;
        })
        .join('');
      return `<section>
          <h3>${escapeHtml(page.title)}</h3>
          <ul>${items}</ul>
        </section>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Daily Inventory for ${escapeHtml(date)}</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; line-height: 1.5; padding: 8px 16px; }
    h1 { margin-bottom: 4px; }
    h2 { margin-top: 0; }
    h3 { font-size: 1rem; font-style: italic; margin: 24px 0 8px; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 12px; page-break-inside: avoid; }
    .prompt { font-weight: bold; }
    .response { white-space: pre-wrap; margin-top: 2px; min-height: 1.2em; }
    .date { color: #4a4a4a; margin-bottom: 16px; }
    footer { margin-top: 32px; font-size: 0.8rem; color: #4a4a4a; }
    a { color: rgb(0, 0, 255); }
  </style>
</head>
<body>
  <h1>Living the Program</h1>
  <div class="date">${escapeHtml(date)}</div>
  <h2>${escapeHtml(intro.title)}</h2>
  <p>${escapeHtml(introText)}</p>
  ${sectionsHtml}
  <footer>
    <p>Taken from the NA informational Pamphlet #9, "Living the Program". A physical copy of this IP is available from <a href="https://www.na.org">the NA website</a> or <a href="https://www.na.org/meetingsearch/">find an NA meeting near you.</a></p>
    <p>Copyright © 1983 by Narcotics Anonymous World Services, Inc. All rights reserved.</p>
  </footer>
</body>
</html>`;
}
