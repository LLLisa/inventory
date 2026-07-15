import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

// react-native-web adds `hovered` to the Pressable state (not in core RN types).
type PressState = { pressed: boolean; hovered?: boolean };

export default function Button({ label, onPress, variant = 'solid', style, disabled }: ButtonProps) {
  const outline = variant === 'outline';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={(s) => {
        const { pressed, hovered } = s as PressState;
        const active = (pressed || hovered) && !disabled;
        return [
          styles.base,
          outline ? styles.outline : styles.solid,
          active && (outline ? styles.outlinePressed : styles.solidPressed),
          disabled && styles.disabled,
          style,
        ];
      }}>
      <Text style={[styles.label, outline ? styles.labelOutline : styles.labelSolid]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: Colors.blue,
  },
  solidPressed: {
    backgroundColor: Colors.lightBlue,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: 'transparent',
  },
  outlinePressed: {
    backgroundColor: Colors.borderGray,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  labelSolid: {
    color: Colors.textWhite,
  },
  labelOutline: {
    color: Colors.blue,
  },
});
