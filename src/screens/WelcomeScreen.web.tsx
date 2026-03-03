import React from 'react';
import { Asset } from 'expo-asset';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../components/AppBackground';

type WelcomeScreenProps = {
  onStart: () => void;
  onLogin: () => void;
};

const TUTO_WEB_ALPHA_URI = Asset.fromModule(require('../../assets/TUTO_WEB_ALPHA.webm')).uri;

export default function WelcomeScreen({ onStart, onLogin }: WelcomeScreenProps) {
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
          <Text style={styles.descriptionText}>Safety est votre allie securite en soiree, festival ou concert.</Text>

          <View style={styles.tutoCard}>
            <video
              src={TUTO_WEB_ALPHA_URI}
              autoPlay
              loop
              muted
              playsInline
              style={styles.webVideo}
            />
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
    marginTop: 44,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  welcomeText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '600',
    lineHeight: 42,
    letterSpacing: 1.05,
    alignSelf: 'stretch',
  },
  brandText: {
    color: '#FFF',
    textAlign: 'center',
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
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 22,
    letterSpacing: 0.48,
    maxWidth: 320,
  },
  actions: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  tutoCard: {
    marginTop: 22,
    width: '100%',
    maxWidth: 343,
    minHeight: 270,
    height: '42%',
    maxHeight: 360,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  webVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    backgroundColor: 'transparent',
  },
  secondaryActions: {
    width: '100%',
    maxWidth: 260,
    paddingTop: 4,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'center',
  },
  signupButton: {
    width: '100%',
    maxWidth: 227,
    height: 53,
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
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.72,
  },
  rescuerBadge: {
    width: '100%',
    height: 30,
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
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.42,
  },
  loginButton: {
    width: '94%',
    maxWidth: 240,
    height: 30,
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
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.42,
  },
});
