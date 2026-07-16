import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';

import AboutScreen from '@/app/about';

describe('about', () => {
  beforeEach(() => {
    jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined as never);
  });

  it('renders the heading and the anonymity statement', () => {
    render(<AboutScreen />);
    expect(screen.getByText('About this application')).toBeTruthy();
    expect(screen.getByText(/are ever sent to a server/)).toBeTruthy();
    expect(screen.getByText('Keep Coming Back')).toBeTruthy();
  });

  it('opens the NA website via an external link', () => {
    render(<AboutScreen />);
    fireEvent.press(screen.getByText('the NA website'));
    expect(Linking.openURL).toHaveBeenCalledWith('https://www.na.org');
  });
});
