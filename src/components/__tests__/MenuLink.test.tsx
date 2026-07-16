import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';

import { MetaLink } from '@/components/MenuLink';

const mockLink = jest.fn();
jest.mock('expo-router', () => ({
  Link: ({ href, children }: { href: string; children: unknown }) => {
    mockLink(href);
    return children;
  },
}));

describe('MetaLink', () => {
  beforeEach(() => {
    mockLink.mockClear();
    jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined as never);
  });

  it('opens an external URL via Linking', () => {
    render(<MetaLink title="Visit NA.org" icon="globe-outline" url="https://www.na.org" />);
    fireEvent.press(screen.getByText('Visit NA.org'));
    expect(Linking.openURL).toHaveBeenCalledWith('https://www.na.org');
  });

  it('routes internal links through expo-router Link', () => {
    render(<MetaLink title="About" icon="information-circle-outline" href="/about" />);
    expect(screen.getByText('About')).toBeTruthy();
    expect(mockLink).toHaveBeenCalledWith('/about');
  });
});
