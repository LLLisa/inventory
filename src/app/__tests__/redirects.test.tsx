import { render } from '@testing-library/react-native';

const mockRedirect = jest.fn();
jest.mock('expo-router', () => ({
  Redirect: (props: { href: string }) => {
    mockRedirect(props.href);
    return null;
  },
}));

const Bt = require('@/app/bt').default;
const Gg = require('@/app/gg').default;

describe('legacy redirects', () => {
  beforeEach(() => mockRedirect.mockClear());

  it('/bt redirects to /basic-text', () => {
    render(<Bt />);
    expect(mockRedirect).toHaveBeenCalledWith('/basic-text');
  });

  it('/gg redirects to /it-works', () => {
    render(<Gg />);
    expect(mockRedirect).toHaveBeenCalledWith('/it-works');
  });
});
