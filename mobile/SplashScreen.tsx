import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.truckContainer}>
        <Image 
     source={require('./assets/logo.png')} 
     style={{ width: 500, height: 400 }}
     resizeMode="contain"
   />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D0C5', // warna beige seperti design
    justifyContent: 'center',
    alignItems: 'center',
  },
  truckContainer: {
    marginBottom: 20,
  },
  truck: {
    fontSize: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#B91C1C', // warna merah
    letterSpacing: 4,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B91C1C',
    letterSpacing: 2,
    marginTop: 5,
  },
});