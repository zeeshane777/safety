import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import type { AlertRecord } from '../types/alert';

type HomeMapProps = {
  onAlertClosed?: (alert: AlertRecord) => void;
};

export default function HomeMap(_: HomeMapProps) {
  return (
    <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.bg} imageStyle={styles.bgImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Carte indisponible sur Web</Text>
        <Text style={styles.subtitle}>
          Cette fonctionnalite utilise react-native-maps et fonctionne sur mobile (Expo Go / Android / iOS).
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    color: '#D4DDFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});




