import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { type Entry } from '@/services/storage';

const mockRedirect = jest.fn();
jest.mock('expo-router', () => {
  const { Text } = require('react-native');
  return {
    useRouter: () => ({ push: jest.fn() }),
    useFocusEffect: (cb: () => void) => require('react').useEffect(cb, []),
    Redirect: (props: { href: string }) => {
      mockRedirect(props.href);
      return null;
    },
    Link: ({ children }: { children: unknown }) =>
      typeof children === 'string' ? <Text>{children}</Text> : children,
  };
});

const mockExport = jest.fn();
jest.mock('@/services/exportPdf', () => ({
  exportInventoryPdf: (...a: unknown[]) => mockExport(...a),
}));

jest.mock('@/services/storage', () => ({
  STORAGE_ENABLED: true,
  loadEntries: jest.fn(() => Promise.resolve([])),
  deleteEntry: jest.fn(() => Promise.resolve()),
}));
const mockStorage = jest.requireMock('@/services/storage') as {
  STORAGE_ENABLED: boolean;
  loadEntries: jest.Mock<Promise<Entry[]>, []>;
  deleteEntry: jest.Mock;
};

import HistoryScreen from '@/app/history';

const entry = (id: string, answers: Record<string, string>): Entry => ({
  id,
  savedAt: '2024-01-01T12:00:00.000Z',
  answers,
});

beforeEach(() => {
  jest.clearAllMocks();
  mockStorage.STORAGE_ENABLED = true;
  mockStorage.loadEntries.mockResolvedValue([]);
});

describe('history (web)', () => {
  it('redirects home when storage is disabled', () => {
    mockStorage.STORAGE_ENABLED = false;
    render(<HistoryScreen />);
    expect(mockRedirect).toHaveBeenCalledWith('/');
  });
});

describe('history (native)', () => {
  it('shows the empty state when there are no entries', async () => {
    mockStorage.loadEntries.mockResolvedValue([]);
    render(<HistoryScreen />);
    await waitFor(() =>
      expect(screen.getByText("You haven't saved any inventories yet.")).toBeTruthy(),
    );
  });

  it('lists saved entries with a response count and expands on tap', async () => {
    mockStorage.loadEntries.mockResolvedValue([
      entry('1', { 'Am I clean today?': 'yes', 'How have I acted differently?': 'Calmly' }),
    ]);
    render(<HistoryScreen />);

    await waitFor(() => expect(screen.getByText('2 responses')).toBeTruthy());

    // Collapsed: answers hidden until expanded.
    expect(screen.queryByText('Calmly')).toBeNull();
    fireEvent.press(screen.getByText('2 responses'));
    expect(screen.getByText('Calmly')).toBeTruthy();
  });

  it('deletes an entry', async () => {
    mockStorage.loadEntries.mockResolvedValue([entry('1', { 'Am I clean today?': 'yes' })]);
    render(<HistoryScreen />);

    await waitFor(() => expect(screen.getByText('1 response')).toBeTruthy());
    fireEvent.press(screen.getByText('1 response'));
    fireEvent.press(screen.getByText('Delete'));

    await waitFor(() => expect(mockStorage.deleteEntry).toHaveBeenCalledWith('1'));
  });

  it('exports a saved entry to PDF', async () => {
    const answers = { 'Am I clean today?': 'yes' };
    mockStorage.loadEntries.mockResolvedValue([entry('1', answers)]);
    mockExport.mockResolvedValue(undefined);
    render(<HistoryScreen />);

    await waitFor(() => expect(screen.getByText('1 response')).toBeTruthy());
    fireEvent.press(screen.getByText('1 response'));
    fireEvent.press(screen.getByText('Download PDF'));
    expect(mockExport).toHaveBeenCalledWith(answers);
  });
});
