import { render } from '@testing-library/react-native';

import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders a structural contentinfo bar', () => {
    const { toJSON } = render(<Footer />);
    const node = toJSON();
    expect(node).toBeTruthy();
    expect((node as { props: Record<string, unknown> }).props.role).toBe('contentinfo');
  });
});
