import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './authScreen/SplashScreen';
import LoginScreen from './authScreen/LoginScreen';
import RegisterScreen from './authScreen/RegisterScreen';
import HomeScreen from './mainScreen/HomeScreen';
import DashboardPetugas from './petugasScreen/dashboard';
import Cart from './mainScreen/Cart';
import FavoriteScreen from './mainScreen/Favorite';
import HistoryScreen from './mainScreen/History';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }} // biar header native disembunyikan
      >
        {/* Kondisi Register/Login */}
        {!isLoggedIn ? (
          <>
            {showRegister ? (
              <Stack.Screen name="Register">
                {() => (
                  <RegisterScreen
                    onRegister={() => {
                      setShowRegister(false);
                      setIsLoggedIn(true);
                    }}
                    onBackToLogin={() => setShowRegister(false)}
                  />
                )}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="Login">
                {() => (
                  <LoginScreen
                    onLogin={(userData) => {
                      setUser(userData);
                      setIsLoggedIn(true);
                    }}
                    onSignUp={() => setShowRegister(true)}
                  />
                )}
              </Stack.Screen>
            )}
          </>
        ) : user?.role === 'petugas' ? (
          <Stack.Screen name="DashboardPetugas">
            {() => <DashboardPetugas user={user} />}
          </Stack.Screen>
        ) : (
          <>
            {/* Halaman utama user */}
            <Stack.Screen name="Home">
              {({ navigation }) => <HomeScreen user={user} navigation={navigation} />}
            </Stack.Screen>

            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
