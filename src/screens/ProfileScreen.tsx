import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import UserIcon from '../components/UserIcon';
import MapIcon from '../components/MapIcon';
import HomeIcon from '../components/HomeIcon';
import HelpIcon from '../components/HelpIcon';
import BreathIcon from '../components/BreathIcon';
import PlsIcon from '../components/PlsIcon';
import StayIcon from '../components/StayIcon';

type ProfileScreenProps = {
  onGoDashboard: () => void;
  onGoMap: () => void;
  onOpenAccount: () => void;
};

export default function ProfileScreen({ onGoDashboard, onGoMap, onOpenAccount }: ProfileScreenProps) {
  return (
    <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.bg} imageStyle={styles.bgImage}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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

        <Text style={styles.title}>Les gestes de secours essentiels</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.mediaScroll}
          contentContainerStyle={styles.mediaScroller}
        >
          <View style={styles.videoCard}>
            <Image source={require('../../assets/massage.jpg')} style={styles.mediaImage} resizeMode="cover" />
          </View>
          <View style={styles.videoCard}>
            <Image source={require('../../assets/massage.jpg')} style={styles.mediaImage} resizeMode="cover" />
          </View>
          <View style={styles.videoCard}>
            <Image source={require('../../assets/massage.jpg')} style={styles.mediaImage} resizeMode="cover" />
          </View>
        </ScrollView>

        <View style={styles.bottomBlock}>
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <Text style={styles.sectionTitle}>Position Latérale de Sécurité (PLS)</Text>

          <View style={styles.tag}>
            <Text style={styles.tagText}>Les gestes à adopter</Text>
          </View>

          <View style={styles.tipRow}>
            <View style={styles.tipIconWrap}>
              <BreathIcon size={24} />
            </View>
            <Text style={styles.tipText}>Verifier la respiration (regarder si la poitrine se souleve).</Text>
          </View>

          <View style={styles.tipRow}>
            <View style={styles.tipIconWrap}>
              <PlsIcon size={24} />
            </View>
            <Text style={styles.tipText}>La placer en Position Latérale de Sécurité (PLS).</Text>
          </View>

          <View style={styles.tipRow}>
            <View style={styles.tipIconWrap}>
              <StayIcon size={24} />
            </View>
            <Text style={styles.tipText}>Rester avec elle jusqu'à l'arrivée des secours.</Text>
          </View>
        </View>

        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem} onPress={onGoDashboard}>
            <HomeIcon size={16} />
            <Text style={styles.navLabel}>Accueil</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={onGoMap}>
            <MapIcon size={18} />
            <Text style={styles.navLabel}>Carte</Text>
          </Pressable>
          <Pressable style={[styles.navItem, styles.navItemActive]}>
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
  title: {
    marginTop: 20,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  mediaScroll: {
    marginTop: 18,
    height: 160,
    maxHeight: 160,
    alignSelf: 'center',
  },
  mediaScroller: {
    gap: 12,
    paddingRight: 4,
  },
  videoCard: {
    width: 343,
    height: 160,
    borderRadius: 18,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
    overflow: 'hidden',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoIcon: {
    fontSize: 30,
    color: '#273160',
  },
  videoLabel: {
    marginTop: 8,
    color: '#273160',
    fontSize: 16,
    fontWeight: '700',
  },
  pagination: {
    marginTop: 6,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bottomBlock: {
    marginTop: 24,
    width: 343,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  dotActive: {
    backgroundColor: '#FFEA00',
  },
  sectionTitle: {
    marginTop: 18,
    color: '#FFE225',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    textAlign: 'center',
  },
  tag: {
    marginTop: 18,
    alignSelf: 'center',
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFE225',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  tagText: {
    color: '#2B258E',
    fontSize: 20,
    fontWeight: '500',
  },
  tipRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  tipIcon: {
    color: '#FFE225',
    fontSize: 24,
    lineHeight: 24,
    width: 24,
    textAlign: 'center',
  },
  tipIconWrap: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    flex: 1,
    color: '#E2E8FF',
    fontSize: 20,
    lineHeight: 26,
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
  navLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },
});





