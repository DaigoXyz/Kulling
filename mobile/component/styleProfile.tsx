import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

const HeaderBackground: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Tempat untuk background image */}
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* Layer merah berbentuk V */}
        <Svg
          height="220"
          width={width}
          viewBox={`0 0 ${width} 220`}
          style={styles.svgShape}
        >
          <Path
            d={`
              M0,0 
              L${width},0 
              L${width},150 
              L${width / 2},220 
              L0,150 
              Z
            `}
            fill="#B91C1C" // Warna merahnya
          />
        </Svg>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 220,
  },
  svgShape: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default HeaderBackground;
