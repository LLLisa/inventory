import { render, screen } from '@testing-library/react-native';

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));

import BasicTextScreen from '@/app/basic-text';
import ItWorksScreen from '@/app/it-works';
import { basicText, itWorks } from '@/data/readings';

describe('reading routes', () => {
  it('basic-text renders the Basic Text Step Ten passage', () => {
    render(<BasicTextScreen />);
    expect(screen.getByText(basicText.source)).toBeTruthy();
    expect(screen.getByText(basicText.paragraphs[0])).toBeTruthy();
  });

  it('it-works renders the It Works Step Ten passage', () => {
    render(<ItWorksScreen />);
    expect(screen.getByText(itWorks.source)).toBeTruthy();
    expect(screen.getByText(itWorks.paragraphs[0])).toBeTruthy();
  });
});
