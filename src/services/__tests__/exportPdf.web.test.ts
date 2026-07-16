import { buildInventoryPdf } from '@/services/exportPdf.web';
import { answerKeys, createEmptyAnswers } from '@/data/fullText';

const date = 'Mon Jan 01 2024';

describe('buildInventoryPdf', () => {
  it('builds a multi-page document from empty answers', () => {
    const doc = buildInventoryPdf(createEmptyAnswers(), date);
    expect(doc.getNumberOfPages()).toBeGreaterThan(1);
  });

  it('builds without throwing when every question is answered', () => {
    const answers = createEmptyAnswers();
    for (const key of answerKeys) answers[key] = 'A reasonably long response. '.repeat(4);
    expect(() => buildInventoryPdf(answers, date)).not.toThrow();
    const doc = buildInventoryPdf(answers, date);
    expect(doc.getNumberOfPages()).toBeGreaterThan(1);
  });

  it('produces a non-empty PDF blob', () => {
    const doc = buildInventoryPdf(createEmptyAnswers(), date);
    const out = doc.output('arraybuffer');
    expect(out.byteLength).toBeGreaterThan(0);
  });
});
