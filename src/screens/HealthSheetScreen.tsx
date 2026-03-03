import React, { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import VectorIcon from '../../assets/Vector.svg';

type HealthSheetScreenProps = {
  onBack: () => void;
  onNext: () => void;
};

export default function HealthSheetScreen({ onBack, onNext }: HealthSheetScreenProps) {
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

          <Text style={styles.title}>Votre fiche santé</Text>
          <Text style={styles.subtitle}>
            En cas d'alerte, les équipes de secours pourront accéder à votre fiche santé afin de mieux comprendre votre
            situation.
          </Text>

          <View style={styles.form}>
            <Text style={styles.label}>Sexe* :</Text>
            <TextInput style={styles.input} placeholder="Sexe" placeholderTextColor="#8FA7E5" />

            <Text style={styles.label}>Age* :</Text>
            <TextInput style={styles.input} placeholder="JJ/MM/AAAA" placeholderTextColor="#8FA7E5" />

            <Text style={styles.label}>Taille* :</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Poids* :</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Contact d'urgence* :</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" />

            <Text style={styles.label}>Pathologie :</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Groupe sanguin :</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Allergies :</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Traitements :</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Grossesse :</Text>
            <TextInput style={styles.input} />

            <Text style={styles.label}>Notes :</Text>
            <TextInput style={[styles.input, styles.noteInput]} multiline />
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
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
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
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 16,
    letterSpacing: 0.36,
    alignSelf: 'stretch',
  },
  form: {
    marginTop: 16,
    gap: 8,
  },
  label: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 22,
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
  noteInput: {
    height: 40,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  consentRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2,
    marginTop: 3,
  },
  checkboxChecked: {
    backgroundColor: '#FFEA00',
    borderColor: '#FFEA00',
  },
  consentText: {
    width: 260,
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 9,
    fontWeight: '400',
    lineHeight: 13,
  },
  nextButton: {
    width: 227,
    height: 53,
    paddingBottom: 14,
    paddingHorizontal: 29,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#FF4DFF',
    alignSelf: 'center',
    marginTop: 18,
  },
  nextText: {
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
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFF',
    opacity: 0.9,
  },
  dotActive: {
    backgroundColor: '#FFEA00',
    opacity: 1,
  },
});





