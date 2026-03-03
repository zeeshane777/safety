import React, { useCallback, useMemo, useState } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeMap from './src/screens/HomeMap';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import HealthSheetScreen from './src/screens/HealthSheetScreen';
import LoginScreen from './src/screens/LoginScreen';
import SafetyActivatedScreen from './src/screens/SafetyActivatedScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AccountScreen from './src/screens/AccountScreen';
import AlertSuccessScreen from './src/screens/AlertSuccessScreen';
import type { AlertRecord } from './src/types/alert';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
  HealthSheet: undefined;
  SafetyActivated: undefined;
  Dashboard: undefined;
  AlertSuccess: undefined;
  Account: undefined;
  Home: undefined;
  History: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const { width, height } = useWindowDimensions();

  const handleAlertClosed = useCallback((nextAlert: AlertRecord) => {
    setAlerts((prev) => [nextAlert, ...prev]);
  }, []);

  const webPhoneFrame = useMemo(() => {
    if (Platform.OS !== 'web') {
      return null;
    }

    const horizontalPadding = 24;
    const verticalPadding = 24;
    const maxPhoneWidth = 430;
    const maxPhoneHeight = 880;
    const safeWidth = Math.max(width - horizontalPadding, 300);
    const safeHeight = Math.max(height - verticalPadding, 560);
    const frameWidth = Math.min(safeWidth, maxPhoneWidth);
    const frameHeight = Math.min(safeHeight, maxPhoneHeight);
    return { width: frameWidth, height: frameHeight };
  }, [height, width]);

  const appContent = (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#030B5C' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: '#F4F6FB' },
          animation: 'slide_from_right',
          animationDuration: 260,
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <WelcomeScreen
              onStart={() => navigation.navigate('CreateAccount')}
              onLogin={() => navigation.navigate('Login')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <LoginScreen
              onBack={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                  return;
                }
                navigation.navigate('Welcome');
              }}
              onValidate={() => navigation.navigate('Dashboard')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="CreateAccount"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <CreateAccountScreen
              onBack={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                  return;
                }
                navigation.navigate('Welcome');
              }}
              onNext={() => navigation.navigate('HealthSheet')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="HealthSheet"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <HealthSheetScreen
              onBack={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                  return;
                }
                navigation.navigate('CreateAccount');
              }}
              onNext={() => navigation.navigate('SafetyActivated')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="SafetyActivated"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <SafetyActivatedScreen
              onBack={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                  return;
                }
                navigation.navigate('HealthSheet');
              }}
              onWelcome={() => navigation.navigate('Dashboard')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Dashboard"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <DashboardScreen
              onOpenMap={() => navigation.navigate('Home')}
              onOpenHelp={() => navigation.navigate('Profile')}
              onOpenAccount={() => navigation.navigate('Account')}
              onSignal={() => navigation.navigate('AlertSuccess')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="AlertSuccess" options={{ headerShown: false }}>
          {({ navigation }) => (
            <AlertSuccessScreen
              onGoDashboard={() => navigation.navigate('Dashboard')}
              onGoMap={() => navigation.navigate('Home')}
              onGoHelp={() => navigation.navigate('Profile')}
              onOpenAccount={() => navigation.navigate('Account')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Account" options={{ headerShown: false }}>
          {({ navigation }) => (
            <AccountScreen
              onGoDashboard={() => navigation.navigate('Dashboard')}
              onGoMap={() => navigation.navigate('Home')}
              onGoHelp={() => navigation.navigate('Profile')}
              onLogout={() => navigation.navigate('Welcome')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <HomeMap
              onAlertClosed={handleAlertClosed}
              onGoDashboard={() => navigation.navigate('Dashboard')}
              onGoHelp={() => navigation.navigate('Profile')}
              onOpenAccount={() => navigation.navigate('Account')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="History" options={{ title: 'Historique des alertes' }}>
          {() => <HistoryScreen alerts={alerts} />}
        </Stack.Screen>

        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {({ navigation }) => (
            <ProfileScreen
              onGoDashboard={() => navigation.navigate('Dashboard')}
              onGoMap={() => navigation.navigate('Home')}
              onOpenAccount={() => navigation.navigate('Account')}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

  if (Platform.OS !== 'web') {
    return appContent;
  }

  return (
    <View style={styles.webViewport}>
      <View style={[styles.webPhoneFrame, webPhoneFrame ?? undefined]}>
        {appContent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webViewport: {
    flex: 1,
    backgroundColor: '#09154D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  webPhoneFrame: {
    width: '100%',
    height: '100%',
    maxWidth: 430,
    maxHeight: 880,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    backgroundColor: '#04156B',
  },
});

