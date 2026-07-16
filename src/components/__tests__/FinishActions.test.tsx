import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

import FinishActions from '@/components/FinishActions';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush }) }));

const mockExport = jest.fn();
jest.mock('@/services/exportPdf', () => ({
  exportInventoryPdf: (...args: unknown[]) => mockExport(...args),
}));

const mockSaveEntry = jest.fn();
jest.mock('@/store/inventory', () => ({
  useInventory: () => ({ answers: { x: 'y' }, saveEntry: mockSaveEntry, setAnswer: jest.fn() }),
}));

// STORAGE_ENABLED is a live ES binding read at render time, so mutating this
// (cached) mock object flips the web/native branch per test without re-importing.
jest.mock('@/services/storage', () => ({ STORAGE_ENABLED: true }));
const mockStorage = jest.requireMock<{ STORAGE_ENABLED: boolean }>('@/services/storage');

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  mockStorage.STORAGE_ENABLED = true;
});

describe('FinishActions — native (storage enabled)', () => {
  it('saves to history and navigates on success', async () => {
    mockSaveEntry.mockResolvedValue(undefined);
    render(<FinishActions onBack={() => {}} />);

    fireEvent.press(screen.getByText('Save to my history'));

    await waitFor(() => expect(mockSaveEntry).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledWith('/history');
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('alerts and does not navigate when saving fails', async () => {
    mockSaveEntry.mockRejectedValue(new Error('disk full'));
    render(<FinishActions onBack={() => {}} />);

    fireEvent.press(screen.getByText('Save to my history'));

    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does not offer a PDF download on native', () => {
    render(<FinishActions onBack={() => {}} />);
    expect(screen.queryByText('Download PDF')).toBeNull();
  });
});

describe('FinishActions — web (storage disabled)', () => {
  beforeEach(() => {
    mockStorage.STORAGE_ENABLED = false;
  });

  it('offers a PDF download and calls the exporter', async () => {
    mockExport.mockResolvedValue(undefined);
    render(<FinishActions onBack={() => {}} />);

    fireEvent.press(screen.getByText('Download PDF'));
    await waitFor(() => expect(mockExport).toHaveBeenCalledWith({ x: 'y' }));
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('alerts when the PDF export fails', async () => {
    mockExport.mockRejectedValue(new Error('no sharing'));
    render(<FinishActions onBack={() => {}} />);

    fireEvent.press(screen.getByText('Download PDF'));
    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
  });

  it('does not offer save-to-history on web', () => {
    render(<FinishActions onBack={() => {}} />);
    expect(screen.queryByText('Save to my history')).toBeNull();
  });
});
