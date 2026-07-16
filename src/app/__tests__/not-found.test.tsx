import { render, screen } from '@testing-library/react-native';

const mockLink = jest.fn();
jest.mock('expo-router', () => {
  const { Text } = require('react-native');
  return {
    Link: ({ href, children }: { href: string; children: unknown }) => {
      mockLink(href);
      return typeof children === 'string' ? <Text>{children}</Text> : children;
    },
  };
});

import NotFound from '@/app/+not-found';

describe('+not-found', () => {
  beforeEach(() => mockLink.mockClear());

  it('shows a not-found message and a link home', () => {
    render(<NotFound />);
    expect(screen.getByText('Page not found')).toBeTruthy();
    expect(screen.getByText('Go to the home page')).toBeTruthy();
    expect(mockLink).toHaveBeenCalledWith('/');
  });

  it('marks the page noindex', () => {
    const json = JSON.stringify(render(<NotFound />).toJSON());
    expect(json).toContain('noindex');
  });
});
