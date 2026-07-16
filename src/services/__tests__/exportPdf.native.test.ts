import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { createEmptyAnswers } from '@/data/fullText';
// Resolves to the native implementation (exportPdf.ts) under the default
// jest-expo platform; the web build is exportPdf.web.ts.
import { exportInventoryPdf } from '@/services/exportPdf';

const printMock = Print.printToFileAsync as jest.Mock;
const availableMock = Sharing.isAvailableAsync as jest.Mock;
const shareMock = Sharing.shareAsync as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  printMock.mockResolvedValue({ uri: 'file:///mock.pdf' });
  availableMock.mockResolvedValue(true);
  shareMock.mockResolvedValue(undefined);
});

describe('exportInventoryPdf (native)', () => {
  it('renders the inventory to a PDF file and opens the share sheet', async () => {
    await exportInventoryPdf(createEmptyAnswers());

    expect(printMock).toHaveBeenCalledTimes(1);
    const html = printMock.mock.calls[0][0].html as string;
    expect(html).toContain('Living the Program');

    expect(shareMock).toHaveBeenCalledTimes(1);
    const [uri, opts] = shareMock.mock.calls[0];
    expect(uri).toBe('file:///mock.pdf');
    expect(opts.mimeType).toBe('application/pdf');
  });

  it('throws (and does not share) when sharing is unavailable', async () => {
    availableMock.mockResolvedValue(false);

    await expect(exportInventoryPdf(createEmptyAnswers())).rejects.toThrow(
      /sharing is not available/i,
    );
    expect(shareMock).not.toHaveBeenCalled();
  });
});
