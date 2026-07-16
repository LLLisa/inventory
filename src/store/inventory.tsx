import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { createEmptyAnswers, type Answers } from '@/data/fullText';
import { addEntry, clearDraft, loadDraft, saveDraft, STORAGE_ENABLED } from '@/services/storage';

interface InventoryContextValue {
  answers: Answers;
  setAnswer: (key: string, value: string) => void;
  /** Persist the current answers to on-device history, then clear the draft. */
  saveEntry: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

/**
 * Holds the in-progress inventory answers so they survive navigation between the
 * per-step routes, and transparently persists them on-device: the draft is
 * restored on load and autosaved as the user types (debounced).
 */
export function InventoryProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answers>(createEmptyAnswers);
  const [hydrated, setHydrated] = useState(false);

  // Restore any saved draft on first mount (native only — the web stores nothing).
  useEffect(() => {
    if (!STORAGE_ENABLED) return;
    let active = true;
    loadDraft().then((draft) => {
      if (active && draft) setAnswers((prev) => ({ ...prev, ...draft }));
      if (active) setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // Autosave the draft (debounced) once hydrated, so we never clobber a stored
  // draft with the empty initial state before it has loaded. Native only.
  useEffect(() => {
    if (!STORAGE_ENABLED || !hydrated) return;
    const timer = setTimeout(() => saveDraft(answers), 400);
    return () => clearTimeout(timer);
  }, [answers, hydrated]);

  const setAnswer = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveEntry = useCallback(async () => {
    await addEntry(answers);
    await clearDraft();
    setAnswers(createEmptyAnswers());
  }, [answers]);

  const value = useMemo(
    () => ({ answers, setAnswer, saveEntry }),
    [answers, setAnswer, saveEntry],
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory(): InventoryContextValue {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within an InventoryProvider');
  return ctx;
}
