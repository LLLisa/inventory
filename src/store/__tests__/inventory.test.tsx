import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { type ReactNode } from 'react';

import { createEmptyAnswers } from '@/data/fullText';
import { addEntry, loadDraft, loadEntries, saveDraft } from '@/services/storage';
import { InventoryProvider, useInventory } from '@/store/inventory';

const KEY = 'Am I clean today?';

function wrapper({ children }: { children: ReactNode }) {
  return <InventoryProvider>{children}</InventoryProvider>;
}

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('InventoryProvider (native)', () => {
  it('starts with a fully-empty answers object', () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    expect(result.current.answers).toEqual(createEmptyAnswers());
  });

  it('setAnswer updates a single key', () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    act(() => result.current.setAnswer(KEY, 'yes'));
    expect(result.current.answers[KEY]).toBe('yes');
  });

  it('autosaves the draft (debounced) after a change', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });
    act(() => result.current.setAnswer(KEY, 'yes'));

    await waitFor(async () => {
      const draft = await loadDraft();
      expect(draft?.[KEY]).toBe('yes');
    });
  });

  it('hydrates from a previously saved draft', async () => {
    const seeded = createEmptyAnswers();
    seeded[KEY] = 'no';
    await saveDraft(seeded);

    const { result } = renderHook(() => useInventory(), { wrapper });
    await waitFor(() => expect(result.current.answers[KEY]).toBe('no'));
  });

  it('saveEntry persists an entry, clears the draft, and resets answers', async () => {
    const { result } = renderHook(() => useInventory(), { wrapper });

    act(() => result.current.setAnswer(KEY, 'yes'));
    await waitFor(async () => expect((await loadDraft())?.[KEY]).toBe('yes'));

    await act(async () => {
      await result.current.saveEntry();
    });

    const entries = await loadEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].answers[KEY]).toBe('yes');

    expect(await loadDraft()).toBeNull();
    expect(result.current.answers).toEqual(createEmptyAnswers());
  });

  it('does not clobber a stored draft before hydration completes', async () => {
    // A pre-existing entry + draft; mounting must not wipe the draft with the
    // empty initial state (autosave is gated on `hydrated`).
    await addEntry(createEmptyAnswers());
    const seeded = createEmptyAnswers();
    seeded[KEY] = 'yes';
    await saveDraft(seeded);

    renderHook(() => useInventory(), { wrapper });
    await waitFor(async () => expect((await loadDraft())?.[KEY]).toBe('yes'));
  });
});
