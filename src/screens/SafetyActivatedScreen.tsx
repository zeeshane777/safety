import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import VectorIcon from '../../assets/Vector.svg';

type SafetyActivatedScreenProps = {
  onBack: () => void;
  onWelcome: () => void;
};

export default function SafetyActivatedScreen({ onBack, onWelcome }: SafetyActivatedScreenProps) {
  return (
    <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.bg} imageStyle={styles.bgImage}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={onBack} style={styles.backButton} hitSlop={12}>
            <VectorIcon width={20} height={20} />
          </Pressable>

          <Text style={styles.title}>Votre Safety est maintenant activée.</Text>
          <Text style={styles.subtitle}>Passez une soirée l'esprit tranquille</Text>

          <Image source={require('../../assets/image1.webp')} style={styles.heroImage} />

          <Pressable style={styles.welcomeButton} onPress={onWelcome}>
            <Text style={styles.welcomeText}>Bienvenue</Text>
          </Pressable>

          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
        </ScrollView>
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
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 28,
    height: 28,
    justifyContent: 'center',
    marginBottom: 22,
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 35,
    fontWeight: '600',
    lineHeight: 42,
    letterSpacing: 1.05,
  },
  subtitle: {
    marginTop: 10,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 22,
    letterSpacing: 0.48,
  },
  heroImage: {
    marginTop: 22,
    width: '100%',
    height: 392,
    borderRadius: 16,
  },
  welcomeButton: {
    marginTop: 26,
    width: 227,
    height: 53,
    paddingBottom: 14,
    paddingHorizontal: 29,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#FF4DFF',
  },
  welcomeText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.72,
    width: 169,
    height: 25,
  },
  pagination: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    opacity: 0.9,
  },
  dotActive: {
    backgroundColor: '#FFEA00',
    opacity: 1,
  },
});





