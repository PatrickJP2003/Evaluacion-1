// screens/WelcomeScreen.tsx

import * as React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => (
  <ImageBackground
    source={{ uri: 'https://i.pinimg.com/736x/e8/d8/1e/e8d81e28b8ab837478cce23ac73d2dfd.jpg' }}
    style={styles.background}
  >
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido</Text>
      <Button
        title="Ir a Navegación"
        onPress={() => navigation.navigate('Tabs')}
      />
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
