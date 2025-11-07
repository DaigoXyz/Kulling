import React, { useEffect, useState } from 'react';
import SplashScreen from './authScreen/SplashScreen';
import LoginScreen from './authScreen/LoginScreen';
import RegisterScreen from './authScreen/RegisterScreen';
import HomeScreen from './mainScreen/HomeScreen'; // Import HomeScreen

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(splashTimer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (showRegister) {
    return (
      <RegisterScreen
        onRegister={() => {
          setShowRegister(false);
          setIsLoggedIn(true);
        }}
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={() => setIsLoggedIn(true)}
        onSignUp={() => setShowRegister(true)}
      />
    );
  }

  // Tampilkan HomeScreen
  return <HomeScreen />;
}