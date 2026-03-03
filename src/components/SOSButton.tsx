import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type SOSButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

export default function SOSButton({ onPress, disabled }: SOSButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled ? styles.disabled : null]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>SOS</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 96,
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FF356D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
