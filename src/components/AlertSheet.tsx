import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AlertStatus } from '../types/alert';

type AlertSheetProps = {
  visible: boolean;
  status: AlertStatus;
  createdAt: number | null;
  onCancel: () => void;
  onCountdownEnd: () => void;
};

const COUNTDOWN_SECONDS = 10;

export default function AlertSheet({
  visible,
  status,
  createdAt,
  onCancel,
  onCountdownEnd,
}: AlertSheetProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!visible || !createdAt || status !== 'OPEN') {
      setSecondsLeft(COUNTDOWN_SECONDS);
      return;
    }

    const tick = () => {
      const elapsed = Math.floor((Date.now() - createdAt) / 1000);
      const next = Math.max(COUNTDOWN_SECONDS - elapsed, 0);
      setSecondsLeft(next);
      if (next === 0) {
        onCountdownEnd();
      }
    };

    tick();
    const interval = setInterval(tick, 300);
    return () => clearInterval(interval);
  }, [createdAt, onCountdownEnd, status, visible]);

  const subtitle = useMemo(() => {
    if (secondsLeft > 0) {
      return `Annulation possible pendant ${secondsLeft}s`;
    }

    return 'Traitement en cours...';
  }, [secondsLeft]);

  if (!visible) return null;

  return (
    <View style={styles.backdrop} pointerEvents="box-none">
      <View style={styles.sheet}>
        <Text style={styles.title}>Alerte envoyee</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <Pressable style={styles.cancelButton} onPress={onCancel} disabled={secondsLeft === 0}>
          <Text style={styles.cancelText}>Annuler</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  sheet: {
    margin: 12,
    marginBottom: 16,
    borderRadius: 20,
    padding: 18,
    backgroundColor: 'rgba(3, 11, 92, 0.96)',
    borderWidth: 1,
    borderColor: '#2D3AC1',
    gap: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: '#D6DCFF',
    fontSize: 14,
  },
  cancelButton: {
    marginTop: 6,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF35D6',
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
