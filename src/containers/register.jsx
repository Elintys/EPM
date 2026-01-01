import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme, { Colors } from '../constants/styles/theme';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[theme.container, theme.spaced]}>
      
      <Text style={theme.headerTitle}>SignUp</Text>
      <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>

      <View style={styles.formContainer}>
        <Text style={theme.inputLabel}>Nom Complet</Text>
        <TextInput placeholder="Nom Complet" style={theme.input} />

        <View style={{height: 20}} />

        <Text style={theme.inputLabel}>Email</Text>
        <TextInput placeholder="Email" style={theme.input} />

        <View style={{height: 20}} />

        <Text style={theme.inputLabel}>Mot de passe</Text>
        <TextInput placeholder="Mot de passe" style={theme.input} secureTextEntry />

      </View>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Vous avez deja un compte?</Text>
          <TouchableOpacity onPress={() =>navigation.navigate('Login')}>
            <Text style={styles.linkAction}>Connectez-vous</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={() =>navigation.navigate('Login')}>
          <Text style={styles.btnText}>S'enregistrer</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.container.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: Colors.neutral500,
    // fontWeight: '500',
  },
  linkAction: {
    color: Colors.primary,
    fontWeight: '600',
    // textDecorationLine: 'underline',
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 18,
    overflow: 'hidden',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
rect1: {
  position: 'absolute',
  width: '100%',
  // height: 342.5,
  // left: -3,
  top: 0,
  backgroundColor: '#714EE3',
}
});


export default Register;
