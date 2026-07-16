/**
 * Global Jest setup: mocks for the React Native / Expo ecosystem so component
 * and route tests can render without a native runtime. Pure-logic tests
 * (Tier 2) don't touch any of this, but it's here for Tiers 3–5.
 */

/* eslint-disable @typescript-eslint/no-require-imports */

import { TextDecoder as NodeTextDecoder } from 'node:util';

import '@testing-library/react-native';

// The Expo "winter" test runtime installs a TextDecoder polyfill that doesn't
// support 'latin1'; jspdf's PNG dependency (fast-png) needs it at import time.
// Node's built-in decoder does support it, so restore it here.
(globalThis as unknown as { TextDecoder: typeof NodeTextDecoder }).TextDecoder = NodeTextDecoder;

// Reanimated ships its own Jest mock.
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Gesture handler test setup (installs its own mocks/globals).
require('react-native-gesture-handler/jestSetup');

// AsyncStorage official in-memory mock.
jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Android-only navigation bar calls are no-ops in tests.
jest.mock('expo-navigation-bar', () => ({
  setButtonStyleAsync: jest.fn(() => Promise.resolve()),
  setBackgroundColorAsync: jest.fn(() => Promise.resolve()),
}));

// Native PDF pipeline — overridden per-test as needed.
jest.mock('expo-print', () => ({
  printToFileAsync: jest.fn(() => Promise.resolve({ uri: 'file:///mock.pdf' })),
}));
jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
  shareAsync: jest.fn(() => Promise.resolve()),
}));

// Silence the Reanimated "reduced motion" warning in test output.
jest.spyOn(console, 'warn').mockImplementation((msg?: unknown) => {
  if (typeof msg === 'string' && msg.includes('Reduced motion')) return;
});
