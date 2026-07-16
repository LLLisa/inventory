import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking, Platform } from 'react-native';

const mockLink = jest.fn();
jest.mock('expo-router', () => {
  const { Text } = require('react-native');
  return {
    Link: ({ href, children }: { href: string; children: unknown }) => {
      mockLink(href);
      // Menu cards pass a function child (render-prop); readable links pass strings.
      if (typeof children === 'function') return children({ pressed: false, hovered: false });
      return typeof children === 'string' ? <Text>{children}</Text> : children;
    },
  };
});

jest.mock('@/services/storage', () => ({ STORAGE_ENABLED: true }));
const mockStorage = jest.requireMock('@/services/storage') as { STORAGE_ENABLED: boolean };

import MenuScreen from '@/app/index';

beforeEach(() => {
  jest.clearAllMocks();
  mockStorage.STORAGE_ENABLED = true;
  jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined as never);
});

describe('menu (index)', () => {
  it('renders the three primary cards', () => {
    render(<MenuScreen />);
    expect(screen.getByText('Begin Inventory')).toBeTruthy();
    expect(screen.getByText('Step Ten — Basic Text')).toBeTruthy();
    expect(screen.getByText('Step Ten — It Works: How & Why')).toBeTruthy();
    expect(mockLink).toHaveBeenCalledWith('/inventory/0');
    expect(mockLink).toHaveBeenCalledWith('/basic-text');
    expect(mockLink).toHaveBeenCalledWith('/it-works');
  });

  it('opens external meeting/website links', () => {
    render(<MenuScreen />);
    fireEvent.press(screen.getByText('Find a Meeting'));
    expect(Linking.openURL).toHaveBeenCalledWith('https://www.na.org/meetingsearch/');
  });

  it('shows the History link when storage is enabled (native)', () => {
    mockStorage.STORAGE_ENABLED = true;
    render(<MenuScreen />);
    expect(mockLink).toHaveBeenCalledWith('/history');
  });

  it('hides the History link when storage is disabled (web)', () => {
    mockStorage.STORAGE_ENABLED = false;
    render(<MenuScreen />);
    expect(mockLink).not.toHaveBeenCalledWith('/history');
  });

  describe('web layout', () => {
    const originalOS = Platform.OS;
    beforeEach(() => {
      (Platform as { OS: string }).OS = 'web';
      mockStorage.STORAGE_ENABLED = false;
    });
    afterEach(() => {
      (Platform as { OS: string }).OS = originalOS;
    });

    it('shows the tagline hero and app-store badges on web', () => {
      render(<MenuScreen />);
      expect(
        screen.getByText(/private, anonymous daily tenth-step inventory/i),
      ).toBeTruthy();
      expect(screen.getByText('App Store')).toBeTruthy();
      expect(screen.getByText('Google Play')).toBeTruthy();
    });
  });
});
