import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import Screen from '@/components/Screen';

describe('Screen', () => {
  it('renders its children in the scroll layout', () => {
    render(
      <Screen>
        <Text>Body content</Text>
      </Screen>,
    );
    expect(screen.getByText('Body content')).toBeTruthy();
  });

  it('renders children in fill mode', () => {
    render(
      <Screen fill>
        <Text>Filled</Text>
      </Screen>,
    );
    expect(screen.getByText('Filled')).toBeTruthy();
  });

  it('renders children even when swipe handlers are supplied', () => {
    // Gesture behavior itself is native-only and not simulated here; we just
    // verify the gesture wrapper doesn't break rendering.
    render(
      <Screen onSwipeLeft={() => {}} onSwipeRight={() => {}}>
        <Text>Swipeable</Text>
      </Screen>,
    );
    expect(screen.getByText('Swipeable')).toBeTruthy();
  });
});
