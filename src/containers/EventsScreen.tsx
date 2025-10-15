import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const EventsScreen = () => {
  const navigation = useNavigation();
  return (
      <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Ton dégradé vertical
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientBackground}
    >
      <TouchableOpacity>
        <LinearGradient
          colors={['#ff7e5f', '#feb47b']} // Dégradé pour le bouton
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.container}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <LinearGradient
              colors={['#ff7e5f', '#feb47b']} // Dégradé pour le texte
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.text}>Go to Home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
      </LinearGradient>
  )
}

export default EventsScreen

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});