import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme, { Colors } from '../constants/styles/theme';
import { useAuth } from '../context/AuthContext';
// import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleLogin = () => {
    setUser({ name: 'KLAN', email: 'klan@elyntis.app' });
  };

  // useEffect(() => {
  //   if (user) {
  //     navigation.navigate('Main');
  //   }
  // }, [user, navigation]);

  return (
    <SafeAreaView style={theme.container}>
      <View style={theme.spaced}>
        <Text style={theme.headerTitle}>Login</Text>
        {/* <View style={{ height: 10 }} /> */}
        <Text style={[styles.subtitle, { alignSelf: 'center' }]}>Connectez-vous à votre compte</Text>

        <View style={styles.formContainer}>
          <Text style={theme.inputLabel}>Email</Text>
          <TextInput placeholder="Email" style={theme.input} />

          <View style={{ height: 20 }} />

          <Text style={theme.inputLabel}>Mot de passe</Text>
          <TextInput
            placeholder="Mot de passe"
            style={theme.input}
            secureTextEntry
          />
        </View>
        <View>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Pas encore de compte?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register' as never)}
            >
              <Text style={styles.linkAction}>Enregistrez-vous</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Mot de passe oublié?</Text>
            <TouchableOpacity>
              <Text style={styles.linkAction}>Réinitialiser le </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => handleLogin()}
        >
          <Text style={styles.btnText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: theme.container.padding,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 25,
  // },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  formContainer: {
    flex: 0.2,
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-evenly',
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
    fontWeight: '600',
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
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
