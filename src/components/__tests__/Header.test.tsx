import { fireEvent, render, screen } from '@testing-library/react-native';

import Header from '@/components/Header';

const mockPush = jest.fn();
let mockPathname = '/';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  Link: ({ children }: { children: unknown }) => children,
}));

function renderAt(path: string) {
  mockPathname = path;
  return render(<Header />);
}

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('always shows the home title', () => {
    renderAt('/');
    expect(screen.getByText('Living the Program')).toBeTruthy();
  });

  it('hides both nav arrows off the inventory flow', () => {
    renderAt('/about');
    expect(screen.queryByLabelText('Previous page')).toBeNull();
    expect(screen.queryByLabelText('Next page')).toBeNull();
  });

  it('hides both arrows on the intro step (0)', () => {
    renderAt('/inventory/0');
    expect(screen.queryByLabelText('Previous page')).toBeNull();
    expect(screen.queryByLabelText('Next page')).toBeNull();
  });

  it('shows back and next on a middle step', () => {
    renderAt('/inventory/2');
    expect(screen.getByLabelText('Previous page')).toBeTruthy();
    expect(screen.getByLabelText('Next page')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Next page'));
    expect(mockPush).toHaveBeenCalledWith('/inventory/3');
    fireEvent.press(screen.getByLabelText('Previous page'));
    expect(mockPush).toHaveBeenCalledWith('/inventory/1');
  });

  it('shows back but not next on the last step', () => {
    renderAt('/inventory/6');
    expect(screen.getByLabelText('Previous page')).toBeTruthy();
    expect(screen.queryByLabelText('Next page')).toBeNull();
  });
});
