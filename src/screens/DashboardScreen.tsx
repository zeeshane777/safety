import React, { useCallback, useRef } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
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

export default function DashboardScreen({
  onOpenMap,
  onOpenHelp,
  onOpenAccount,
  onSignal,
}: DashboardScreenProps) {
  const videoRef = useRef<Video>(null);
  const lastRecoveryAtRef = useRef(0);

  const handleVideoStatus = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    if (status.didJustFinish) {
      videoRef.current?.replayAsync();
      return;
    }

    const shouldRecover = status.shouldPlay && !status.isPlaying && !status.isBuffering;
    if (!shouldRecover) {
      return;
    }

    const now = Date.now();
    if (now - lastRecoveryAtRef.current < 2000) {
      return;
    }

    lastRecoveryAtRef.current = now;
    if (!status.isPlaying && !status.isBuffering) {
      videoRef.current?.playAsync();
    }
  }, []);

  const handleVideoLoad = useCallback(() => {
    videoRef.current?.playFromPositionAsync(0);
  }, []);

  return (
    <AppBackground>
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

        <View style={styles.centerObject}>
          <Video
            ref={videoRef}
            source={require('../../assets/ANIM BOUCLIER.mov')}
            style={styles.centerVideo}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
            progressUpdateIntervalMillis={500}
            onLoad={handleVideoLoad}
            onPlaybackStatusUpdate={handleVideoStatus}
          />
        </View>

        <Text style={styles.subtitle}>Profiter de votre soirée !</Text>

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
  bg: {
    flex: 1,
    backgroundColor: '#04156B',
  },
  bgImage: { resizeMode: 'stretch', width: '100%', height: '100%' },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    marginTop: 45,
    paddingBottom: 24,
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
  centerObject: {
    width: 350,
    height: 300,
    alignSelf: 'center',
    marginTop: 42,
    borderRadius: 16,
    overflow: 'hidden',
  },
  centerVideo: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    marginTop: 26,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '400',
  },
  urgencyButton: {
    marginTop: 38,
    width: 295,
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
    marginTop: 28,
    width: 227,
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




