import { render, screen } from '@testing-library/react-native';

import CopyrightNote from '@/components/CopyrightNote';

describe('CopyrightNote', () => {
  it('renders the provided text', () => {
    render(<CopyrightNote text="Copyright © 1983 NAWS" />);
    expect(screen.getByText('Copyright © 1983 NAWS')).toBeTruthy();
  });
});
