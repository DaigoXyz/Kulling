import React, { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen'; // Import HomeScreen

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