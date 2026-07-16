import { fireEvent, render, screen } from '@testing-library/react-native';

import ReadingView from '@/components/ReadingView';
import { type Reading } from '@/data/readings';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const reading: Reading = {
  slug: 'demo',
  source: 'Demo Source',
  title: 'Step Ten',
  epigraph: '“An epigraph.”',
  paragraphs: ['First paragraph.', 'Second paragraph.'],
  pageReference: 'Page 42',
  copyright: 'Copyright © 1983 NAWS',
};

describe('ReadingView', () => {
  beforeEach(() => mockPush.mockClear());

  it('renders the title, source, epigraph, paragraphs and page reference', () => {
    render(<ReadingView reading={reading} description="d" />);
    expect(screen.getByText('Step Ten')).toBeTruthy();
    expect(screen.getByText('Demo Source')).toBeTruthy();
    expect(screen.getByText('“An epigraph.”')).toBeTruthy();
    expect(screen.getByText('First paragraph.')).toBeTruthy();
    expect(screen.getByText('Second paragraph.')).toBeTruthy();
    expect(screen.getByText('Page 42')).toBeTruthy();
    expect(screen.getByText('Copyright © 1983 NAWS')).toBeTruthy();
  });

  it('emits Article JSON-LD for the reading', () => {
    const json = render(<ReadingView reading={reading} description="d" />).toJSON();
    const flat = JSON.stringify(json);
    expect(flat).toContain('application/ld+json');
    expect(flat).toContain('https://nadailyinventory.com/demo');
  });

  it('navigates home from the Back button', () => {
    render(<ReadingView reading={reading} description="d" />);
    fireEvent.press(screen.getByRole('button', { name: 'Back' }));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
