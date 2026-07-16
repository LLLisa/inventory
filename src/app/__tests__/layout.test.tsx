import { render, screen } from '@testing-library/react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

jest.mock('expo-router', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Slot: () => React.createElement(Text, null, 'SLOT'),
    useRouter: () => ({ push: jest.fn() }),
    usePathname: () => '/',
    Link: ({ children }: { children: unknown }) => children,
  };
});

import RootLayout from '@/app/_layout';

const originalOS = Platform.OS;

afterEach(() => {
  (Platform as { OS: string }).OS = originalOS;
  jest.clearAllMocks();
});

describe('RootLayout', () => {
  it('renders the header, routed content, and footer shell', () => {
    render(<RootLayout />);
    expect(screen.getByText('Living the Program')).toBeTruthy();
    expect(screen.getByText('SLOT')).toBeTruthy();
  });

  it('does not touch the Android navigation bar on non-Android platforms', () => {
    (Platform as { OS: string }).OS = 'ios';
    render(<RootLayout />);
    expect(NavigationBar.setButtonStyleAsync).not.toHaveBeenCalled();
  });

  it('styles the Android navigation bar to match the footer', () => {
    (Platform as { OS: string }).OS = 'android';
    render(<RootLayout />);
    expect(NavigationBar.setButtonStyleAsync).toHaveBeenCalledWith('light');
    expect(NavigationBar.setBackgroundColorAsync).toHaveBeenCalled();
  });
});
