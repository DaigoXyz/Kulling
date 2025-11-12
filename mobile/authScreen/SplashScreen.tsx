import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AnimatedSplashScreen() {
  const [leftDoor] = useState(new Animated.Value(0));
  const [rightDoor] = useState(new Animated.Value(0));
  const [doorsSlide] = useState(new Animated.Value(0));
  const [logoOpacity] = useState(new Animated.Value(0));
  const [logoScale] = useState(new Animated.Value(0.7));

  useEffect(() => {
  // Step 1: miringkan pintu (500ms delay)
  setTimeout(() => {
    Animated.parallel([
      Animated.timing(leftDoor, {
        toValue: 20,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(rightDoor, {
        toValue: 20,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, 500);

  // Step 2: tarik pintu ke sudut diagonal
  setTimeout(() => {
    Animated.timing(doorsSlide, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, 1300);

  // Step 3: munculkan logo
  setTimeout(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, 1500);

  setTimeout(() => {
  }, 7000);
}, []);

  // Pintu kiri: tarik ke sudut KIRI ATAS
  const leftDoorTranslateX = doorsSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width * 1.2], // tarik jauh ke kiri
  });
  const leftDoorTranslateY = doorsSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height * 1.2], // tarik jauh ke atas
  });

  // Pintu kanan: tarik ke sudut KANAN BAWAH
  const rightDoorTranslateX = doorsSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 1.2], // tarik jauh ke kanan
  });
  const rightDoorTranslateY = doorsSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height * 1.2], // tarik jauh ke bawah
  });

  return (
    <View style={styles.container}>
      {/* Left Door - merah terang */}
      <Animated.View
        style={[
          styles.door,
          styles.leftDoor,
          {
            transform: [
              { translateX: leftDoorTranslateX },
              { translateY: leftDoorTranslateY },
              {
                rotateZ: leftDoor.interpolate({
                  inputRange: [0, 20],
                  outputRange: ['0deg', '20deg'],
                }),
              },
            ],
          },
        ]}
      />

      {/* Right Door - merah gelap */}
      <Animated.View
        style={[
          styles.door,
          styles.rightDoor,
          {
            transform: [
              { translateX: rightDoorTranslateX },
              { translateY: rightDoorTranslateY },
              {
                rotateZ: rightDoor.interpolate({
                  inputRange: [0, 20],
                  outputRange: ['0deg', '20deg'],
                }),
              },
            ],
          },
        ]}
      />

      {/* Logo muncul terakhir */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  door: {
    position: 'absolute',
    top: -height * 0.3,
    width: width * 0.9,
    height: height * 1.8,
  },
  leftDoor: {
    left: -width * 0.45,
    backgroundColor: '#A6171B',
    borderRightColor: '#821B1E',
    borderRightWidth: 6,
  },
  rightDoor: {
    right: -width * 0.3,
    backgroundColor: '#821B1E',
    borderLeftColor: '#A6171B',
    borderLeftWidth: 6,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 15,
  },
  title: {
    fontSize: 44,
    fontWeight: '700',
    color: '#B91C1C',
    letterSpacing: 6,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  subtitle: {
    color: '#B91C1C',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 2,
  },
  line: {
    height: 2,
    width: 28,
    backgroundColor: '#B91C1C',
    marginHorizontal: 8,
  },
});