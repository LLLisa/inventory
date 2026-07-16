import { fireEvent, render, screen } from '@testing-library/react-native';

import Button from '@/components/Button';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button label="Begin" onPress={() => {}} />);
    expect(screen.getByText('Begin')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button label="Next" onPress={onPress} />);
    fireEvent.press(screen.getByText('Next'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    render(<Button label="Save" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('exposes an accessible button role', () => {
    render(<Button label="Back" onPress={() => {}} variant="outline" />);
    expect(screen.getByRole('button', { name: 'Back' })).toBeTruthy();
  });
});
