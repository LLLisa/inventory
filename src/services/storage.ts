/**
 * On-device persistence. Everything here stays local to the user's device
 * (localStorage on web, native key–value store on iOS/Android) and is never
 * transmitted anywhere — preserving the app's anonymity guarantee.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import { type Answers } from '@/data/fullText';

const DRAFT_KEY = 'inventory:draft:v1';
const ENTRIES_KEY = 'inventory:entries:v1';

export interface Entry {
  id: string;
  /** ISO timestamp of when the entry was saved. */
  savedAt: string;
  answers: Answers;
}

// --- Draft (the in-progress inventory) ---

export async function loadDraft(): Promise<Answers | null> {
  try {
    const raw = await AsyncStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Answers) : null;
  } catch {
    return null;
  }
}

export async function saveDraft(answers: Answers): Promise<void> {
  try {
    await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
  } catch {
    // Storage full or unavailable — fail silently; the draft is a convenience.
  }
}

export async function clearDraft(): Promise<void> {
  try {
    await AsyncStorage.removeItem(DRAFT_KEY);
  } catch {
    /* no-op */
  }
}

// --- Saved entries (the user's history) ---

export async function loadEntries(): Promise<Entry[]> {
  try {
    const raw = await AsyncStorage.getItem(ENTRIES_KEY);
    const entries = raw ? (JSON.parse(raw) as Entry[]) : [];
    // Newest first.
    return entries.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
  } catch {
    return [];
  }
}

export async function addEntry(answers: Answers): Promise<Entry> {
  const entry: Entry = {
    id: `${Date.now()}-${Math.round(Math.random() * 1e6)}`,
    savedAt: new Date().toISOString(),
    answers,
  };
  const entries = await loadEntries();
  await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify([entry, ...entries]));
  return entry;
}

export async function deleteEntry(id: string): Promise<void> {
  const entries = await loadEntries();
  await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries.filter((e) => e.id !== id)));
}
