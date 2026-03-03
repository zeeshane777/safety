import React, { useMemo } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import type { AlertRecord } from '../types/alert';

type HistoryScreenProps = {
  alerts: AlertRecord[];
};

function formatDate(ts: number) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(ts);
}

export default function HistoryScreen({ alerts }: HistoryScreenProps) {
  const orderedAlerts = useMemo(() => {
    return [...alerts].sort((a, b) => b.createdAt - a.createdAt);
  }, [alerts]);

  if (orderedAlerts.length === 0) {
    return (
      <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.bg} imageStyle={styles.bgImage}>
        <View style={[styles.container, styles.center]}>
          <Text style={styles.emptyTitle}>Aucune alerte</Text>
          <Text style={styles.emptySubtitle}>Déclenche une alerte SOS depuis la carte pour la voir ici.</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.bg} imageStyle={styles.bgImage}>
      <View style={styles.container}>
        <FlatList
          data={orderedAlerts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.status === 'CANCELLED' ? 'Alerte annulee' : 'Alerte resolue'}</Text>
              <Text style={styles.cardLine}>Creee: {formatDate(item.createdAt)}</Text>
              <Text style={styles.cardLine}>Fermee: {formatDate(item.closedAt)}</Text>
              <Text style={styles.cardLine}>
                Position: {item.location.latitude.toFixed(5)}, {item.location.longitude.toFixed(5)}
              </Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#04156B',
  },
  bgImage: { resizeMode: 'stretch', width: '100%', height: '100%' },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#121735',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#53618B',
    textAlign: 'center',
  },
  listContent: {
    padding: 14,
    gap: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DEE3F3',
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#10183D',
  },
  cardLine: {
    color: '#4B5984',
    fontSize: 13,
  },
});





