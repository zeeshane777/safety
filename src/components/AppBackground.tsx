import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

type AppBackgroundProps = {
  children: React.ReactNode;
};

export default function AppBackground({ children }: AppBackgroundProps) {
  return (
    <ImageBackground source={require('../../assets/imagefond.webp')} style={styles.root} imageStyle={styles.bgImage}>
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#04156B',
  },
  bgImage: { resizeMode: 'stretch', width: '100%', height: '100%' },
  content: {
    flex: 1,
  },
});




