import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { promptType, type Prompt } from '@/data/fullText';
import { useInventory } from '@/store/inventory';

function YesNo({ promptKey }: { promptKey: string }) {
  const { answers, setAnswer } = useInventory();
  const value = answers[promptKey];

  return (
    <View style={styles.yesNoRow}>
      {(['yes', 'no'] as const).map((option) => {
        const selected = value === option;
        return (
          <Pressable
            key={option}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={`${promptKey} — ${option}`}
            onPress={() => setAnswer(promptKey, selected ? '' : option)}
            style={[styles.yesNoButton, selected && styles.yesNoButtonSelected]}>
            <Text style={[styles.yesNoText, selected && styles.yesNoTextSelected]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TextField({
  promptKey,
  big,
  tall,
}: {
  promptKey: string;
  big?: boolean;
  tall?: boolean;
}) {
  const { answers, setAnswer } = useInventory();
  return (
    <TextInput
      style={[styles.input, big && styles.inputBig, big && tall && styles.inputTall]}
      value={answers[promptKey]}
      onChangeText={(text) => setAnswer(promptKey, text)}
      multiline={big}
      maxLength={3000}
      accessibilityLabel={promptKey}
      textAlignVertical={big ? 'top' : 'center'}
    />
  );
}

/** Renders one prompt (and its optional follow-up) according to its type. */
export default function PromptField({ prompt, tall }: { prompt: Prompt; tall?: boolean }) {
  if (prompt.type === promptType.plainText) {
    return <Text style={styles.plain}>{prompt.text}</Text>;
  }

  return (
    <View style={styles.field}>
      {prompt.type === promptType.yesNo ? (
        <View style={styles.yesNoField}>
          <Text style={styles.label}>{prompt.text}</Text>
          <YesNo promptKey={prompt.text} />
        </View>
      ) : (
        <>
          <Text style={styles.label}>{prompt.text}</Text>
          <TextField promptKey={prompt.text} big={prompt.type === promptType.bigText} tall={tall} />
        </>
      )}

      {prompt.sub ? (
        <View style={styles.sub}>
          <Text style={styles.label}>{prompt.sub.text}</Text>
          <TextField
            promptKey={prompt.sub.text}
            big={prompt.sub.type === promptType.bigText}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: Spacing.lg,
  },
  sub: {
    marginTop: Spacing.md,
  },
  label: {
    fontSize: 17,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  plain: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 6,
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    color: Colors.text,
  },
  inputBig: {
    minHeight: 110,
  },
  inputTall: {
    minHeight: 220,
  },
  yesNoField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  yesNoRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  yesNoButton: {
    minWidth: 64,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.blue,
    alignItems: 'center',
  },
  yesNoButtonSelected: {
    backgroundColor: Colors.blue,
  },
  yesNoText: {
    fontSize: 16,
    color: Colors.blue,
    fontWeight: '600',
  },
  yesNoTextSelected: {
    color: Colors.textWhite,
  },
});
