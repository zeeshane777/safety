import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import HomeIcon from '../components/HomeIcon';
import MapIcon from '../components/MapIcon';
import HelpIcon from '../components/HelpIcon';
import PhoneIcon from '../components/PhoneIcon';
import EmailIcon from '../components/EmailIcon';
import PasswordIcon from '../components/PasswordIcon';
import LocationToggleIcon from '../components/LocationToggleIcon';

type AccountScreenProps = {
  onGoDashboard: () => void;
  onGoMap: () => void;
  onGoHelp: () => void;
  onLogout: () => void;
};

function InfoRow({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrap}>{icon}</View>
      <View style={styles.infoBody}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
      <Text style={styles.chevron}>{'>'}</Text>
    </View>
  );
}

export default function AccountScreen({ onGoDashboard, onGoMap, onGoHelp, onLogout }: AccountScreenProps) {
  return (
    <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.bg} imageStyle={styles.bgImage}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.logoRow}>
          <Image source={require('../../assets/SAFETY_BLANC.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.logoText}>afety</Text>
        </View>

        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LD</Text>
          </View>
          <Text style={styles.profileName}>Leo Duvel</Text>
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>Connexion</Text>
        </View>
        <InfoRow icon={<PhoneIcon size={20} />} title="Téléphone" value="07 11 22 33 44" />
        <InfoRow icon={<EmailIcon width={20} height={16} />} title="E-mail" value="leo1234@gmail.com" />
        <InfoRow icon={<PasswordIcon width={20} height={16} />} title="Mot de passe" value="*********" />

        <View style={styles.tag}>
          <Text style={styles.tagText}>Paramètres</Text>
        </View>
        <View style={styles.simpleRow}>
          <View style={styles.infoIconWrap}>
            <PhoneIcon size={20} />
          </View>
          <View style={styles.infoBody}>
            <Text style={styles.infoTitle}>Langue</Text>
            <Text style={styles.infoValue}>Langue du compte</Text>
          </View>
          <View style={styles.langRight}>
            <Text style={styles.infoValue}>Français</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </View>
        </View>

        <View style={styles.simpleRow}>
          <LocationToggleIcon width={57} height={43} />
          <View style={styles.infoBody}>
            <Text style={styles.infoTitle}>Localisation</Text>
            <Text style={styles.infoValue}>Désactiver votre localisation à tout moment</Text>
          </View>
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>Confidentialité</Text>
        </View>
        <View style={styles.simpleRow}>
          <Text style={styles.infoTitle}>Informations légales</Text>
          <Text style={styles.chevron}>{'>'}</Text>
        </View>
        <View style={styles.simpleRow}>
          <Text style={styles.infoTitle}>Supprimer mon compte</Text>
          <Text style={styles.chevron}>{'>'}</Text>
        </View>

        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </Pressable>

        <View style={styles.bottomNav}>
          <Pressable style={styles.navItem} onPress={onGoDashboard}>
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
  container: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 64, paddingBottom: 20 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 72, height: 82 },
  logoText: { marginLeft: -15, marginTop: 20, color: '#FFF', fontSize: 33, fontWeight: '900', lineHeight: 33 },
  profileRow: { marginTop: 18, flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 89,
    height: 89,
    borderRadius: 44.5,
    backgroundColor: '#C9D5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#223179', fontWeight: '800', fontSize: 30 },
  profileName: { color: '#FFF', marginLeft: 10, fontSize: 18, fontWeight: '500', width: 115, height: 28 },
  tag: {
    marginTop: 18,
    alignSelf: 'flex-start',
    backgroundColor: '#FFE225',
    borderRadius: 14,
    paddingHorizontal: 8,
    height: 24,
    justifyContent: 'center',
  },
  tagText: { color: '#2B258E', fontSize: 15, fontWeight: '600' },
  infoRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 9,
  },
  simpleRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 9,
  },
  infoIconWrap: { width: 24, alignItems: 'center', justifyContent: 'center' },
  infoBody: { flex: 1, marginLeft: 8 },
  infoTitle: { color: '#FFF', fontSize: 20, fontWeight: '500' },
  infoValue: { color: '#CBD6FF', fontSize: 20, marginTop: 2 },
  chevron: { color: '#FFF', fontSize: 26, marginLeft: 8 },
  langRight: { flexDirection: 'row', alignItems: 'center' },
  logoutBtn: {
    marginTop: 6,
    width: 200,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#7A2CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: '#FFF', fontSize: 16, fontWeight: '500' },
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
  navLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});





