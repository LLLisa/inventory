import { fireEvent, render, screen } from '@testing-library/react-native';
import { type ReactNode } from 'react';

import { LAST_PAGE } from '@/data/fullText';
import { InventoryProvider } from '@/store/inventory';

const mockPush = jest.fn();
let mockParams: { step?: string } = { step: '0' };
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useLocalSearchParams: () => mockParams,
  Link: ({ href, children }: { href: string; children: unknown }) => children,
}));

import InventoryStep, { generateStaticParams } from '@/app/inventory/[step]';

function renderStep(step: string) {
  mockParams = { step };
  return render(<InventoryStep />, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <InventoryProvider>{children}</InventoryProvider>
    ),
  });
}

describe('inventory/[step]', () => {
  beforeEach(() => mockPush.mockClear());

  it('pre-renders one param per page', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(LAST_PAGE + 1);
    expect(params[0]).toEqual({ step: '0' });
    expect(params[LAST_PAGE]).toEqual({ step: String(LAST_PAGE) });
  });

  it('shows a fallback for an invalid step', () => {
    renderStep('nope');
    expect(screen.getByText("That inventory page doesn't exist.")).toBeTruthy();
  });

  it('shows a fallback for an out-of-range step', () => {
    renderStep(String(LAST_PAGE + 1));
    expect(screen.getByText("That inventory page doesn't exist.")).toBeTruthy();
  });

  it('renders the intro with a Begin button on step 0', () => {
    renderStep('0');
    fireEvent.press(screen.getByText('Begin'));
    expect(mockPush).toHaveBeenCalledWith('/inventory/1');
  });

  it('renders Back/Next on a middle step', () => {
    renderStep('2');
    fireEvent.press(screen.getByText('Next'));
    expect(mockPush).toHaveBeenCalledWith('/inventory/3');
    fireEvent.press(screen.getByText('Back'));
    expect(mockPush).toHaveBeenCalledWith('/inventory/1');
  });

  it('sends Back to the menu from step 1', () => {
    renderStep('1');
    fireEvent.press(screen.getByText('Back'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders the finish actions on the last step', () => {
    renderStep(String(LAST_PAGE));
    // Native default → save-to-history branch of FinishActions.
    expect(screen.getByText('Save to my history')).toBeTruthy();
  });
});
