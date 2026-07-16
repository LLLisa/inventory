import {
  answerKeys,
  createEmptyAnswers,
  fullText,
  LAST_PAGE,
  promptType,
} from '@/data/fullText';

describe('fullText data', () => {
  it('has an intro page, question pages, and a Notes page', () => {
    expect(fullText.length).toBeGreaterThan(2);
    expect(LAST_PAGE).toBe(fullText.length - 1);
    // Intro page is plain text only.
    expect(fullText[0].prompts.every((p) => p.type === promptType.plainText)).toBe(true);
    // Last page holds the free-form Notes field.
    expect(fullText[LAST_PAGE].prompts.some((p) => p.text === 'Notes')).toBe(true);
  });

  describe('answerKeys', () => {
    it('excludes plain-text intro lines', () => {
      const introTexts = fullText[0].prompts.map((p) => p.text);
      for (const t of introTexts) expect(answerKeys).not.toContain(t);
    });

    it('includes every answerable prompt and its sub-prompt', () => {
      const expected = fullText
        .flatMap((page) => page.prompts)
        .flatMap((p) =>
          p.type === promptType.plainText ? [] : p.sub ? [p.text, p.sub.text] : [p.text],
        );
      expect(answerKeys).toEqual(expected);
    });

    it('has NO duplicate keys (answers are keyed by prompt text)', () => {
      const seen = new Set<string>();
      const dupes: string[] = [];
      for (const key of answerKeys) {
        if (seen.has(key)) dupes.push(key);
        seen.add(key);
      }
      expect(dupes).toEqual([]);
    });
  });

  describe('createEmptyAnswers', () => {
    it('seeds every answer key with an empty string', () => {
      const empty = createEmptyAnswers();
      expect(Object.keys(empty).sort()).toEqual([...answerKeys].sort());
      expect(Object.values(empty).every((v) => v === '')).toBe(true);
    });

    it('returns a fresh object each call', () => {
      const a = createEmptyAnswers();
      const b = createEmptyAnswers();
      expect(a).not.toBe(b);
      a['Am I clean today?'] = 'yes';
      expect(b['Am I clean today?']).toBe('');
    });
  });
});
