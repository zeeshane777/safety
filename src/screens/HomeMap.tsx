import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import type { AlertRecord } from '../types/alert';
import UserIcon from '../components/UserIcon';
import MapIcon from '../components/MapIcon';
import HomeIcon from '../components/HomeIcon';
import HelpIcon from '../components/HelpIcon';

const PARIS_REGION = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

type HomeMapProps = {
  onAlertClosed?: (alert: AlertRecord) => void;
  onGoDashboard?: () => void;
  onGoHelp?: () => void;
  onOpenAccount?: () => void;
};

export default function HomeMap({ onGoDashboard, onGoHelp, onOpenAccount }: HomeMapProps) {
  return (
    <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.bg} imageStyle={styles.bgImage}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View style={styles.logoRow}>
            <Image source={require('../../assets/SAFETY_BLANC.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText}>afety</Text>
          </View>
          <Pressable onPress={onOpenAccount}>
            <UserIcon size={40} />
          </Pressable>
        </View>

        <View style={styles.mapCard}>
          <MapView style={styles.map} initialRegion={PARIS_REGION} />
        </View>

        <View style={styles.numbersSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Les numéros d'urgence</Text>
          </View>

          <Text style={styles.numberTitle}>15 - SAMU</Text>
          <Text style={styles.numberDesc}>Urgence médicale (malaise, douleur thoracique, perte de connaissance, etc.)</Text>

          <Text style={styles.numberTitle}>17 - Police / Gendarmerie :</Text>
          <Text style={styles.numberDesc}>Danger, agression, vol, accident de la route</Text>

          <Text style={styles.numberTitle}>18 - Pompiers :</Text>
          <Text style={styles.numberDesc}>Incendie, accident, danger immédiat</Text>
        </View>

        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem} onPress={onGoDashboard}>
            <HomeIcon size={16} />
            <Text style={styles.navLabel}>Accueil</Text>
          </Pressable>
          <Pressable style={[styles.navItem, styles.navItemActive]}>
            <MapIcon size={18} />
            <Text style={styles.navLabel}>Carte</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={onGoHelp}>
            <HelpIcon size={20} />
            <Text style={styles.navLabel}>Aide</Text>
          </Pressable>
        </View>
      </ScrollView>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 45,
    paddingBottom: 20,
  },
  scroll: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 72,
    height: 82,
  },
  logoText: {
    marginLeft: -15,
    marginTop: 20,
    color: '#FFF',
    fontSize: 33,
    fontWeight: '900',
    lineHeight: 33,
  },
  mapCard: {
    marginTop: 20,
    borderRadius: 18,
    overflow: 'hidden',
    height: 250,
  },
  map: {
    flex: 1,
  },
  numbersSection: {
    marginTop: 30,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE225',
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 30,
    justifyContent: 'center',
    marginBottom: 14,
  },
  badgeText: {
    color: '#2B258E',
    fontSize: 20,
    fontWeight: '500',
  },
  numberTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    marginTop: 14,
  },
  numberDesc: {
    color: '#D9E2FF',
    fontSize: 20,
    lineHeight: 26,
    marginTop: 4,
    marginBottom: 10,
  },
  bottomNav: {
    marginTop: 24,
    marginBottom: 20,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#25398B',
    borderWidth: 1,
    borderColor: '#4C5BC6',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    width: '32%',
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: '#4A4FB0',
  },
  navIcon: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 18,
  },
  navLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },
});






