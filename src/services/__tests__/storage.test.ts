import AsyncStorage from '@react-native-async-storage/async-storage';

import { createEmptyAnswers } from '@/data/fullText';
// Default test platform is native (ios), so the top-level import exercises the
// storage-enabled path against the shared in-memory AsyncStorage mock.
import * as storage from '@/services/storage';

const DRAFT_KEY = 'inventory:draft:v1';
const ENTRIES_KEY = 'inventory:entries:v1';

/** Re-import storage as web (STORAGE_ENABLED is decided at module load). */
function loadWebStorage() {
  let mod!: typeof import('@/services/storage');
  jest.isolateModules(() => {
    jest.doMock('react-native', () => ({
      Platform: { OS: 'web', select: (o: Record<string, unknown>) => o.web ?? o.default },
    }));
    mod = require('@/services/storage');
  });
  return mod;
}

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('storage (native)', () => {
  it('reports storage as enabled', () => {
    expect(storage.STORAGE_ENABLED).toBe(true);
  });

  it('round-trips a draft', async () => {
    const answers = createEmptyAnswers();
    answers['Am I clean today?'] = 'yes';
    await storage.saveDraft(answers);
    expect(await storage.loadDraft()).toEqual(answers);
  });

  it('clears a draft', async () => {
    await storage.saveDraft(createEmptyAnswers());
    await storage.clearDraft();
    expect(await storage.loadDraft()).toBeNull();
  });

  it('returns null for a corrupt draft', async () => {
    await AsyncStorage.setItem(DRAFT_KEY, '{not valid json');
    expect(await storage.loadDraft()).toBeNull();
  });

  it('adds and loads entries', async () => {
    const answers = createEmptyAnswers();
    answers['Am I clean today?'] = 'yes';

    const entry = await storage.addEntry(answers);
    const entries = await storage.loadEntries();

    expect(entries).toHaveLength(1);
    expect(entries[0].id).toBe(entry.id);
    expect(entries[0].answers['Am I clean today?']).toBe('yes');
    expect(typeof entries[0].savedAt).toBe('string');
  });

  it('loads entries newest-first', async () => {
    await AsyncStorage.setItem(
      ENTRIES_KEY,
      JSON.stringify([
        { id: 'a', savedAt: '2024-01-01T00:00:00.000Z', answers: {} },
        { id: 'c', savedAt: '2024-03-01T00:00:00.000Z', answers: {} },
        { id: 'b', savedAt: '2024-02-01T00:00:00.000Z', answers: {} },
      ]),
    );
    expect((await storage.loadEntries()).map((e) => e.id)).toEqual(['c', 'b', 'a']);
  });

  it('returns [] for corrupt entries', async () => {
    await AsyncStorage.setItem(ENTRIES_KEY, 'nope');
    expect(await storage.loadEntries()).toEqual([]);
  });

  it('deletes an entry by id', async () => {
    const first = await storage.addEntry(createEmptyAnswers());
    await storage.addEntry(createEmptyAnswers());

    await storage.deleteEntry(first.id);
    const remaining = await storage.loadEntries();

    expect(remaining).toHaveLength(1);
    expect(remaining.find((e) => e.id === first.id)).toBeUndefined();
  });
});

describe('storage (web)', () => {
  it('reports storage as disabled', () => {
    expect(loadWebStorage().STORAGE_ENABLED).toBe(false);
  });

  it('never persists a draft', async () => {
    const web = loadWebStorage();
    await web.saveDraft(createEmptyAnswers());
    expect(await web.loadDraft()).toBeNull();
  });

  it('never persists entries and always loads []', async () => {
    const web = loadWebStorage();
    await web.addEntry(createEmptyAnswers());
    expect(await web.loadEntries()).toEqual([]);
  });

  it('addEntry still returns an entry object (not persisted)', async () => {
    const entry = await loadWebStorage().addEntry(createEmptyAnswers());
    expect(entry.id).toEqual(expect.any(String));
    expect(entry.savedAt).toEqual(expect.any(String));
  });
});
