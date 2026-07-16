import { createEmptyAnswers, fullText, promptType } from '@/data/fullText';
import { generateHTML } from '@/utils/generateHTML';

describe('generateHTML', () => {
  const date = 'Mon Jan 01 2024';

  it('includes the date and document scaffolding', () => {
    const html = generateHTML(createEmptyAnswers(), date);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Living the Program');
    expect(html).toContain(date);
  });

  it('escapes HTML special characters in user answers', () => {
    const answers = createEmptyAnswers();
    answers['How have I acted differently?'] = '<script>alert("x")</script> & more';
    const html = generateHTML(answers, date);
    expect(html).not.toContain('<script>alert');
    expect(html).toContain('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; more');
  });

  it('renders every answerable question label, even when left blank', () => {
    const html = generateHTML(createEmptyAnswers(), date);
    const questionTexts = fullText
      .slice(1)
      .flatMap((page) => page.prompts)
      .flatMap((p) => (p.sub ? [p, p.sub] : [p]))
      .filter((p) => p.type !== promptType.plainText)
      .map((p) => (p.text === 'Notes' ? 'Notes:' : p.text));

    for (const label of questionTexts) {
      // Labels themselves contain no HTML-special chars in the source content.
      expect(html).toContain(label);
    }
  });

  it('renders section titles from fullText', () => {
    const html = generateHTML(createEmptyAnswers(), date);
    for (const page of fullText.slice(1)) {
      expect(html).toContain(page.title);
    }
  });
});
