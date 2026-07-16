import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Colors, Shadows, Spacing } from '@/constants/theme';
import { promptType, type Prompt } from '@/data/fullText';
import { useInventory } from '@/store/inventory';

// react-native-web adds `hovered`/`focused` to the Pressable state; not in the
// core RN types, so widen it here.
type PressState = { pressed: boolean; hovered?: boolean; focused?: boolean };

function YesNo({ promptKey, style }: { promptKey: string; style?: StyleProp<ViewStyle> }) {
  const { answers, setAnswer } = useInventory();
  const value = answers[promptKey];

  return (
    <View style={[styles.yesNoRow, style]}>
      {(['yes', 'no'] as const).map((option) => {
        const selected = value === option;
        return (
          <Pressable
            key={option}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={`${promptKey} — ${option}`}
            onPress={() => setAnswer(promptKey, selected ? '' : option)}
            style={(state) => [
              styles.yesNoButton,
              (state as PressState).hovered && !selected && styles.yesNoButtonHover,
              selected && styles.yesNoButtonSelected,
            ]}>
            <Text style={[styles.yesNoText, selected && styles.yesNoTextSelected]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function TextField({ promptKey, big, tall }: { promptKey: string; big?: boolean; tall?: boolean }) {
  const { answers, setAnswer } = useInventory();
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      style={[
        styles.input,
        big && styles.inputBig,
        big && tall && styles.inputTall,
        focused && styles.inputFocused,
      ]}
      value={answers[promptKey]}
      onChangeText={(text) => setAnswer(promptKey, text)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
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

  const isYesNo = prompt.type === promptType.yesNo;

  return (
    <View style={styles.card}>
      {isYesNo ? (
        // Question and answer share a row at every width; the label wraps as
        // needed while the buttons stay right-aligned. Keeps short yes/no cards
        // compact instead of leaving dead space above a dropped-down answer row.
        <View style={styles.yesNoInline}>
          <Text style={[styles.label, styles.labelInline]}>{prompt.text}</Text>
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
          <TextField promptKey={prompt.sub.text} big={prompt.sub.type === promptType.bigText} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgWhite,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  sub: {
    marginTop: Spacing.md,
  },
  label: {
    fontSize: 19,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  labelInline: {
    // `flexBasis: 'auto'` (not `flex: 1`, which forces basis 0) lets a long
    // question claim the full row and drop the buttons to a right-aligned line
    // below, instead of wrapping into a cramped column beside them.
    //
    // `flexShrink: 0` is required for parity on native: web breaks the flex
    // line from the label's max-content basis, but Yoga would otherwise shrink
    // the text in place (never overflowing, never wrapping the row) and leave
    // the question boxed beside the buttons. Forbidding the shrink forces the
    // same wrap-to-full-width behavior on both platforms.
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    marginBottom: 0,
  },
  plain: {
    fontSize: 18,
    lineHeight: 26,
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
    fontSize: 18,
    color: Colors.text,
  },
  inputBig: {
    minHeight: 110,
  },
  inputTall: {
    minHeight: 220,
  },
  inputFocused: {
    borderColor: Colors.blue,
    ...Platform.select({
      web: { boxShadow: '0 0 0 3px rgba(0,0,255,0.15)' },
      default: {},
    }),
  },
  yesNoInline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // flex-end keeps the buttons right-aligned whether they share the
    // question's line or wrap onto their own line beneath it.
    justifyContent: 'flex-end',
    rowGap: Spacing.sm,
    columnGap: Spacing.md,
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
  yesNoButtonHover: {
    backgroundColor: Colors.borderGray,
  },
  yesNoButtonSelected: {
    backgroundColor: Colors.blue,
  },
  yesNoText: {
    fontSize: 18,
    color: Colors.blue,
    fontWeight: '600',
  },
  yesNoTextSelected: {
    color: Colors.textWhite,
  },
});
