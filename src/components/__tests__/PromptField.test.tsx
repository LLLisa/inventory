import { fireEvent, render, screen } from '@testing-library/react-native';
import { type ReactNode } from 'react';

import PromptField from '@/components/PromptField';
import { promptType, type Prompt } from '@/data/fullText';
import { InventoryProvider, useInventory } from '@/store/inventory';

function wrapper({ children }: { children: ReactNode }) {
  return <InventoryProvider>{children}</InventoryProvider>;
}

describe('PromptField', () => {
  it('renders plain text prompts as static copy', () => {
    const prompt: Prompt = { text: 'An instruction.', type: promptType.plainText };
    render(<PromptField prompt={prompt} />, { wrapper });
    expect(screen.getByText('An instruction.')).toBeTruthy();
  });

  it('renders a text input for bigText and writes answers', () => {
    const prompt: Prompt = { text: 'How have I acted differently?', type: promptType.bigText };
    render(<PromptField prompt={prompt} />, { wrapper });

    const input = screen.getByLabelText('How have I acted differently?');
    fireEvent.changeText(input, 'Calmer than usual.');
    expect(input.props.value).toBe('Calmer than usual.');
  });

  it('toggles a yes/no answer on and off', () => {
    const prompt: Prompt = { text: 'Am I clean today?', type: promptType.yesNo };
    // Read the live answer through a probe component sharing the provider.
    let current = '';
    function Probe() {
      current = useInventory().answers['Am I clean today?'];
      return null;
    }
    render(
      <>
        <PromptField prompt={prompt} />
        <Probe />
      </>,
      { wrapper },
    );

    const yes = screen.getByLabelText('Am I clean today? — yes');
    fireEvent.press(yes);
    expect(current).toBe('yes');

    // Pressing the selected option again clears it.
    fireEvent.press(yes);
    expect(current).toBe('');
  });

  it('renders a sub-prompt beneath its parent', () => {
    const prompt: Prompt = {
      text: 'Did my disease run my life today?',
      type: promptType.yesNo,
      sub: { text: 'If so, how?', type: promptType.bigText },
    };
    render(<PromptField prompt={prompt} />, { wrapper });
    expect(screen.getByText('If so, how?')).toBeTruthy();
    expect(screen.getByLabelText('If so, how?')).toBeTruthy();
  });
});
