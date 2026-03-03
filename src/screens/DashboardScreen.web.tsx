import React, { useEffect, useRef, useState } from 'react';
import { Asset } from 'expo-asset';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import UserIcon from '../components/UserIcon';
import MapIcon from '../components/MapIcon';
import HomeIcon from '../components/HomeIcon';
import HelpIcon from '../components/HelpIcon';
import AppBackground from '../components/AppBackground';

type DashboardScreenProps = {
  onOpenMap: () => void;
  onOpenHelp: () => void;
  onOpenAccount: () => void;
  onSignal: () => void;
};

const ANIM_WEB_ALPHA_VP8_URI = Asset.fromModule(require('../../assets/ANIM_BOUCLIER_WEB_ALPHA.webm')).uri;
const ANIM_WEB_ALPHA_VP9_URI = Asset.fromModule(require('../../assets/ANIM_BOUCLIER_WEB_ALPHA_VP9.webm')).uri;

export default function DashboardScreen({
  onOpenMap,
  onOpenHelp,
  onOpenAccount,
  onSignal,
}: DashboardScreenProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) {
      return;
    }
    const tryPlay = () => {
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => setVideoError(true));
      }
    };

    tryPlay();
    el.addEventListener('loadeddata', tryPlay);
    el.addEventListener('canplay', tryPlay);
    const timer = setTimeout(() => {
      if (!videoStarted && !videoError) {
        setShowStartOverlay(true);
      }
    }, 1800);

    return () => {
      el.removeEventListener('loadeddata', tryPlay);
      el.removeEventListener('canplay', tryPlay);
      clearTimeout(timer);
    };
  }, [videoError, videoStarted]);

  return (
    <AppBackground>
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

        <View style={styles.centerObject}>
          {videoError ? (
            <View style={styles.videoFallback}>
              <Text style={styles.videoFallbackText}>Video indisponible sur ce navigateur.</Text>
            </View>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={styles.webVideo}
              onPlay={() => {
                setVideoStarted(true);
                setShowStartOverlay(false);
              }}
              onError={() => setVideoError(true)}
            >
              <source src={ANIM_WEB_ALPHA_VP8_URI} />
              <source src={ANIM_WEB_ALPHA_VP9_URI} />
            </video>
          )}
          {showStartOverlay && !videoError ? (
            <Pressable
              style={styles.startOverlay}
              onPress={() => {
                const el = videoRef.current;
                if (!el) return;
                const playPromise = el.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                  playPromise.catch(() => setVideoError(true));
                }
              }}
            >
              <Text style={styles.startOverlayText}>Lancer l'animation</Text>
            </Pressable>
          ) : null}
        </View>

        <Text style={styles.subtitle}>Profiter de votre soiree !</Text>

        <Pressable style={styles.signalButton} onPress={onSignal}>
          <View style={styles.signalOuter}>
            <View style={styles.signalMiddle}>
              <View style={styles.signalInner}>
                <View style={styles.signalInline}>
                  <MaterialIcons name="warning-amber" size={34} color="#FFFFFF" />
                  <Text style={styles.signalText}>Signaler</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.urgencyButton}>
          <Text style={styles.urgencyText}>Quelle est votre urgence?</Text>
        </Pressable>

        <View style={styles.bottomNav}>
          <Pressable style={[styles.navItem, styles.navItemActive]}>
            <HomeIcon size={16} />
            <Text style={styles.navLabel}>Accueil</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={onOpenMap}>
            <MapIcon size={18} />
            <Text style={styles.navLabel}>Carte</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={onOpenHelp}>
            <HelpIcon size={20} />
            <Text style={styles.navLabel}>Aide</Text>
          </Pressable>
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    marginTop: 36,
    paddingBottom: 18,
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
  centerObject: {
    width: '100%',
    maxWidth: 350,
    height: '35%',
    minHeight: 200,
    maxHeight: 300,
    alignSelf: 'center',
    marginTop: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  webVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundColor: 'transparent',
  },
  videoFallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 20, 80, 0.55)',
  },
  videoFallbackText: {
    color: '#DCE5FF',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  startOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    alignSelf: 'center',
    width: 180,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startOverlayText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 18,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '400',
  },
  urgencyButton: {
    marginTop: 24,
    width: '100%',
    maxWidth: 295,
    height: 43,
    alignSelf: 'center',
    borderRadius: 21.5,
    backgroundColor: 'rgba(194, 216, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    overflow: 'hidden',
    shadowColor: '#8DBBFF',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  urgencyText: {
    color: '#EAF1FF',
    fontSize: 15,
    fontWeight: '500',
  },
  signalButton: {
    marginTop: 18,
    width: '100%',
    maxWidth: 227,
    height: 90,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalOuter: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
    backgroundColor: '#6A00CC',
    padding: 6,
  },
  signalMiddle: {
    flex: 1,
    borderRadius: 99,
    backgroundColor: '#7A00E6',
    padding: 4,
  },
  signalInner: {
    flex: 1,
    borderRadius: 99,
    backgroundColor: '#A100FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  signalText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0.72,
  },
  bottomNav: {
    marginTop: 24,
    marginBottom: 8,
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

