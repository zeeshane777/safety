import React, { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import AppBackground from '../components/AppBackground';

type WelcomeScreenProps = {
  onStart: () => void;
  onLogin: () => void;
};

export default function WelcomeScreen({ onStart, onLogin }: WelcomeScreenProps) {
  const videoRef = useRef<Video>(null);
  const lastRecoveryAtRef = useRef(0);
  const [videoError, setVideoError] = useState(false);

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
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
      <Text style={styles.welcomeText}>Bienvenue sur</Text>
      <Text style={styles.brandText}>Safety</Text>
      <Text style={styles.descriptionText}>Safety est votre allié sécurité en soirée, festival ou concert.</Text>

      <View style={styles.tutoCard}>
        {videoError ? (
          <View style={styles.videoFallback}>
            <Text style={styles.videoFallbackText}>Vidéo non lisible. Vérifie le fichier vidéo dans assets.</Text>
          </View>
        ) : (
          <Video
            ref={videoRef}
            source={require('../../assets/TUTO.mov')}
            style={styles.tutoVideo}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isLooping
            isMuted
            progressUpdateIntervalMillis={500}
            onLoad={handleVideoLoad}
            onPlaybackStatusUpdate={handleVideoStatus}
            onError={() => setVideoError(true)}
          />
        )}
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.signupButton} onPress={onStart}>
          <Text style={styles.signupText}>S'inscrire</Text>
        </Pressable>

        <View style={styles.secondaryActions}>
          <Pressable style={styles.rescuerBadge}>
            <Text style={styles.rescuerText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
              S'inscrire en tant que sauveteur
            </Text>
          </Pressable>

          <Pressable style={styles.loginButton} onPress={onLogin}>
            <Text style={styles.loginText}>Connexion</Text>
          </Pressable>
        </View>
      </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  welcomeText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 35,
    fontWeight: '600',
    lineHeight: 42,
    letterSpacing: 1.05,
    alignSelf: 'stretch',
  },
  brandText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 45,
    fontWeight: '600',
    lineHeight: 52,
    letterSpacing: 1.35,
    alignSelf: 'stretch',
    marginTop: 4,
  },
  descriptionText: {
    marginTop: 14,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 22,
    letterSpacing: 0.48,
    maxWidth: 320,
  },
  actions: {
    marginTop: 24,
    alignItems: 'center',
    gap: 12,
  },
  tutoCard: {
    marginTop: 24,
    width: '100%',
    maxWidth: 343,
    height: 360,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  tutoVideo: {
    width: '100%',
    height: '100%',
  },
  videoFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  videoFallbackText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  secondaryActions: {
    display: 'flex',
    width: 260,
    paddingTop: 4,
    alignItems: 'center',
    gap: 14,
    alignSelf: 'center',
  },
  signupButton: {
    width: 227,
    height: 53,
    paddingTop: 0,
    paddingBottom: 14,
    paddingHorizontal: 29,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#FF4DFF',
  },
  signupText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '500',
    width: 169,
    height: 25,
    lineHeight: 25,
    letterSpacing: 0.72,
  },
  rescuerBadge: {
    width: 260,
    height: 28,
    minWidth: 260,
    maxWidth: 260,
    minHeight: 28,
    maxHeight: 28,
    paddingHorizontal: 10,
    backgroundColor: '#2F8DFF',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  rescuerText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.42,
  },
  loginButton: {
    width: 240,
    height: 28,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A337E',
    borderWidth: 1,
    borderColor: '#4C5BC6',
  },
  loginText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.42,
  },
});

