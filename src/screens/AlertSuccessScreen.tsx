import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import UserIcon from '../components/UserIcon';
import HomeIcon from '../components/HomeIcon';
import MapIcon from '../components/MapIcon';
import HelpIcon from '../components/HelpIcon';
import PhoneIcon from '../components/PhoneIcon';

type AlertSuccessScreenProps = {
  onGoDashboard: () => void;
  onGoMap: () => void;
  onGoHelp: () => void;
  onOpenAccount: () => void;
};

const USER_POINT = { latitude: 48.8567, longitude: 2.3523 };
const RESPONDER_POINT = { latitude: 48.8576, longitude: 2.3531 };
const MAP_REGION = {
  latitude: (USER_POINT.latitude + RESPONDER_POINT.latitude) / 2,
  longitude: (USER_POINT.longitude + RESPONDER_POINT.longitude) / 2,
  latitudeDelta: Math.max(Math.abs(USER_POINT.latitude - RESPONDER_POINT.latitude) * 1.8, 0.003),
  longitudeDelta: Math.max(Math.abs(USER_POINT.longitude - RESPONDER_POINT.longitude) * 1.8, 0.003),
};
const REASSURING_MESSAGES = [
  "Votre signalement est bien pris en compte.",
  "Une equipe est en train d'etre mobilisee.",
  "Restez calme, vous n'etes pas seul(e).",
  "Conservez votre telephone pres de vous.",
];

export default function AlertSuccessScreen({
  onGoDashboard,
  onGoMap,
  onGoHelp,
  onOpenAccount,
}: AlertSuccessScreenProps) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [messageIndex, setMessageIndex] = useState(0);
  useEffect(() => {
    setStep(0);
    const toTreatment = setTimeout(() => setStep(1), 10000);
    const toHandled = setTimeout(() => setStep(2), 20000);

    return () => {
      clearTimeout(toTreatment);
      clearTimeout(toHandled);
    };
  }, []);

  useEffect(() => {
    if (step !== 0) {
      return;
    }
    const rotatingMessage = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % REASSURING_MESSAGES.length);
    }, 2400);
    return () => clearInterval(rotatingMessage);
  }, [step]);

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

        <View style={styles.stepTabs}>
          <Pressable style={[styles.stepTab, step >= 0 ? styles.stepTabActive : styles.stepTabIdle]} onPress={() => setStep(0)}>
            <Text style={[styles.stepTabText, step >= 0 ? styles.stepTabTextActive : styles.stepTabTextIdle]}>Signalement</Text>
          </Pressable>
          <Pressable style={[styles.stepTab, step >= 1 ? styles.stepTabActive : styles.stepTabIdle]} onPress={() => setStep(1)}>
            <Text style={[styles.stepTabText, step >= 1 ? styles.stepTabTextActive : styles.stepTabTextIdle]}>Traitement</Text>
          </Pressable>
          <Pressable style={[styles.stepTab, step >= 2 ? styles.stepTabActive : styles.stepTabIdle]} onPress={() => setStep(2)}>
            <Text style={[styles.stepTabText, step >= 2 ? styles.stepTabTextActive : styles.stepTabTextIdle]}>Prise en charge</Text>
          </Pressable>
        </View>

        {step === 0 ? (
          <View style={styles.messageCard}>
            <Text style={styles.title}>Alerte envoyée avec succès.</Text>
            <Text style={styles.subtitle}>Prise en charge dans{'\n'}moins de 5min.</Text>
            <View style={styles.reassureBox}>
              <Text style={styles.reassureText}>{REASSURING_MESSAGES[messageIndex]}</Text>
            </View>
          </View>
        ) : null}

        {step === 1 ? (
          <View style={[styles.messageCard, styles.treatmentCard]}>
            <View style={styles.mapCard}>
              <MapView style={styles.map} initialRegion={MAP_REGION}>
                <Polyline
                  coordinates={[RESPONDER_POINT, USER_POINT]}
                  strokeColor="#1A1A1A"
                  strokeWidth={3}
                />
                <Marker coordinate={RESPONDER_POINT}>
                  <View style={styles.blackDot} />
                </Marker>
                <Marker coordinate={USER_POINT}>
                  <View style={styles.blackDot} />
                </Marker>
              </MapView>
            </View>
            <Text style={styles.timeText}>a 500m - 3min</Text>
            <View style={styles.agentRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>S</Text>
              </View>
              <View>
                <Text style={styles.agentName}>Samir</Text>
                <Text style={styles.agentRole}>chef de la sécurité</Text>
              </View>
            </View>
            <Text style={styles.titleLeft}>Assistance en cours</Text>
            <Text style={styles.bodyText}>Samir est en route vers votre position{'\n'}Restez où vous êtes si possible.</Text>
            <Pressable style={styles.callBtnInCard}>
              <View style={styles.callInline}>
                <PhoneIcon size={22} />
                <Text style={styles.callText}>Appeler</Text>
              </View>
            </Pressable>
          </View>
        ) : null}

        {step === 2 ? (
          <View style={styles.messageCard}>
            <Text style={styles.arrivedText}>Arrivé</Text>
            <View style={styles.agentRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>S</Text>
              </View>
              <View>
                <Text style={styles.agentName}>Samir</Text>
                <Text style={styles.agentRole}>chef de la sécurité</Text>
              </View>
            </View>
            <Text style={styles.titleLeft}>Intervenant arrivé</Text>
            <Text style={styles.bodyText}>Samir est arrivé à votre position.{'\n'}Vous êtes maintenant pris en charge.</Text>
          </View>
        ) : null}

        <View style={styles.actionZone}>
          {step === 0 ? (
            <View style={[styles.actionBtn, styles.waitBtn]}>
              <View style={styles.waitInline}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.waitText}>Patientez</Text>
              </View>
            </View>
          ) : null}

          {step === 2 ? (
            <Pressable style={[styles.actionBtn, styles.successBtn]}>
              <View style={styles.successInline}>
                <MaterialIcons name="check-circle" size={32} color="#FFFFFF" />
                <Text style={styles.successText}>Signalée</Text>
              </View>
            </Pressable>
          ) : null}
        </View>

        <View style={styles.bottomNav}>
          <Pressable style={[styles.navItem, styles.navItemActive]} onPress={onGoDashboard}>
            <HomeIcon size={16} />
            <Text style={styles.navLabel}>Accueil</Text>
          </Pressable>
          <Pressable style={styles.navItem} onPress={onGoMap}>
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
  bg: { flex: 1, backgroundColor: '#04156B' },
  bgImage: { resizeMode: 'stretch', width: '100%', height: '100%' },
  scroll: { flex: 1 },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 45, paddingBottom: 20 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 72, height: 82 },
  logoText: { marginLeft: -15, marginTop: 20, color: '#FFF', fontSize: 33, fontWeight: '900', lineHeight: 33 },
  stepTabs: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  stepTab: {
    flex: 1,
    height: 29,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTabActive: {
    backgroundColor: '#FFEA00',
  },
  stepTabIdle: {
    backgroundColor: '#37479B',
  },
  stepTabText: {
    fontSize: 15,
    fontWeight: '500',
  },
  stepTabTextActive: {
    color: '#2B258E',
  },
  stepTabTextIdle: {
    color: '#D6DEFF',
  },
  messageCard: {
    marginTop: 34,
    width: '100%',
    maxWidth: 340,
    minHeight: 305,
    borderWidth: 1,
    borderColor: '#4964C8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 14,
    alignSelf: 'center',
  },
  treatmentCard: {
    width: '100%',
    maxWidth: 340,
    minHeight: 550,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  title: {
    marginTop: 58,
    color: '#FFE225',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  reassureBox: {
    marginTop: 24,
    minHeight: 48,
    backgroundColor: 'rgba(217, 217, 217, 0.24)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.32)',
    borderRadius: 10,
    width: '86%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  reassureText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  mapCard: {
    width: 300,
    height: 212,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  map: {
    flex: 1,
  },
  blackDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  timeText: {
    marginTop: 14,
    color: '#B7C6FF',
    fontSize: 12,
    marginLeft: 2,
  },
  agentRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D7E2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#223179',
    fontWeight: '800',
    fontSize: 18,
  },
  agentName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
  agentRole: {
    color: '#C0CEFF',
    fontSize: 14,
  },
  titleLeft: {
    marginTop: 18,
    color: '#FFEA00',
    fontSize: 20,
    fontWeight: '700',
  },
  bodyText: {
    marginTop: 12,
    color: '#DCE5FF',
    fontSize: 16,
    lineHeight: 24,
  },
  arrivedText: {
    color: '#DCE5FF',
    fontSize: 12,
  },
  actionZone: {
    marginTop: 20,
    marginBottom: 12,
    justifyContent: 'center',
  },
  actionBtn: {
    alignSelf: 'center',
    width: 245,
    height: 73,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitBtn: {
    backgroundColor: '#A8A8A8',
  },
  waitText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 32,
  },
  waitInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  callBtn: {
    backgroundColor: '#A100FF',
  },
  callBtnInCard: {
    marginTop: 'auto',
    marginBottom: 10,
    width: 227,
    height: 53,
    borderRadius: 99,
    backgroundColor: '#A100FF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '500',
  },
  callInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successBtn: {
    backgroundColor: '#38D929',
  },
  successInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  successCheck: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 32,
  },
  successText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 25,
    letterSpacing: 0.72,
  },
  bottomNav: {
    marginTop: 0,
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










