import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { fireGestureHandler, getByGestureTestId } from 'react-native-gesture-handler/jest-utils';
import { type PanGesture } from 'react-native-gesture-handler';

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
    render(
      <Screen onSwipeLeft={() => {}} onSwipeRight={() => {}}>
        <Text>Swipeable</Text>
      </Screen>,
    );
    expect(screen.getByText('Swipeable')).toBeTruthy();
  });

  it('fires onSwipeLeft for a clear left drag', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeRight = jest.fn();
    render(
      <Screen onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <Text>Body</Text>
      </Screen>,
    );
    fireGestureHandler<PanGesture>(getByGestureTestId('screen-swipe'), [
      { translationX: -120, velocityX: -600 },
    ]);
    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  it('fires onSwipeRight for a clear right drag', () => {
    const onSwipeLeft = jest.fn();
    const onSwipeRight = jest.fn();
    render(
      <Screen onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
        <Text>Body</Text>
      </Screen>,
    );
    fireGestureHandler<PanGesture>(getByGestureTestId('screen-swipe'), [
      { translationX: 120, velocityX: 600 },
    ]);
    expect(onSwipeRight).toHaveBeenCalledTimes(1);
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });
});
