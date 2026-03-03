import React, { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import VectorIcon from '../../assets/Vector.svg';

type CreateAccountScreenProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function CreateAccountScreen({ onBack, onNext }: CreateAccountScreenProps) {
  const [consentChecked, setConsentChecked] = useState(false);

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

        <Text style={styles.title}>Créer votre compte</Text>
        <Text style={styles.subtitle}>En cas de malaise, danger ou situation inquiétante</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nom* :</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Téléphone* :</Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />

          <Text style={styles.label}>Prénom* :</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>E-mail * :</Text>
          <TextInput style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        </View>

        <Pressable style={styles.consentRow} onPress={() => setConsentChecked((prev) => !prev)}>
          <View style={[styles.checkbox, consentChecked ? styles.checkboxChecked : null]} />
          <Text style={styles.consentText}>
            Je reconnais transmettre mes informations à Safety. Vos données sont strictement confidentielles et
            utilisées uniquement en cas de besoin.
          </Text>
        </Pressable>

        <Pressable style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>Suivant</Text>
        </Pressable>

        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
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
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 64,
    paddingBottom: 28,
  },
  backButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 35,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 42,
    letterSpacing: 1.05,
    alignSelf: 'stretch',
  },
  subtitle: {
    marginTop: 6,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 22,
    letterSpacing: 0.48,
    alignSelf: 'stretch',
  },
  form: {
    marginTop: 22,
    gap: 8,
  },
  label: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 27,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(58, 134, 255, 0.14)',
    color: '#FFF',
    fontSize: 16,
    lineHeight: 20,
  },
  consentRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#FFEA00',
    borderColor: '#FFEA00',
  },
  consentText: {
    width: 303,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
  },
  nextButton: {
    display: 'flex',
    width: 227,
    height: 53,
    paddingTop: 0,
    paddingBottom: 14,
    paddingHorizontal: 29,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    borderRadius: 99,
    backgroundColor: '#FF4DFF',
    alignSelf: 'center',
    marginTop: 34,
  },
  nextText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.72,
    width: 169,
    height: 25,
  },
  pagination: {
    marginTop: 20,
    alignSelf: 'center',
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





