import React, { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import VectorIcon from '../../assets/Vector.svg';

type LoginScreenProps = {
  onBack: () => void;
  onValidate: () => void;
};

export default function LoginScreen({ onBack, onValidate }: LoginScreenProps) {
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

          <Text style={styles.title}>Connectez-vous à{'\n'}votre compte</Text>
          <Text style={styles.subtitle}>Afin de bénéficier de l'aide de Safety</Text>

          <View style={styles.form}>
            <Text style={styles.label}>E-mail * :</Text>
            <TextInput style={styles.input} keyboardType="email-address" autoCapitalize="none" />

            <Text style={styles.label}>Mot de passe * :</Text>
            <TextInput style={styles.input} secureTextEntry />
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </View>

          <Pressable style={styles.consentRow} onPress={() => setConsentChecked((prev) => !prev)}>
            <View style={[styles.checkbox, consentChecked ? styles.checkboxChecked : null]} />
            <Text style={styles.consentText}>
              Je reconnais transmettre mes informations à Safety. Vos données sont strictement confidentielles et
              utilisées uniquement en cas de besoin.
            </Text>
          </Pressable>

          <Pressable style={styles.validateButton} onPress={onValidate}>
            <Text style={styles.validateText}>Valider</Text>
          </Pressable>
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
    paddingBottom: 24,
  },
  backButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    marginBottom: 26,
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
  form: {
    marginTop: 46,
    gap: 10,
  },
  label: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 27,
  },
  input: {
    height: 40,
    borderRadius: 4,
    backgroundColor: 'rgba(58, 134, 255, 0.14)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFF',
    fontSize: 16,
    lineHeight: 20,
  },
  forgotText: {
    marginTop: -2,
    color: '#FF4DFF',
    fontSize: 16,
    fontWeight: '400',
  },
  consentRow: {
    marginTop: 26,
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
    fontWeight: '400',
    lineHeight: 18,
  },
  validateButton: {
    width: 227,
    height: 53,
    paddingBottom: 14,
    paddingHorizontal: 29,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 99,
    backgroundColor: '#FF4DFF',
    alignSelf: 'center',
    marginTop: 'auto',
  },
  validateText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.72,
  },
});





