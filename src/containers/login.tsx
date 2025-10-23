import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import theme, { Colors } from '../constants/styles/theme';
import { AppDispatch, RootState } from '../store/store';
import { loginUser } from '../store/slices/userSlice';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // On récupère les infos utilisateur depuis Redux
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  const handleLogin = async () => {
    if (!email || !password) return;
    dispatch(loginUser({ email, password }));
  };

  /**
   * Redirige automatiquement vers "Main" une fois la connexion réussie
   */
  useEffect(() => {
    if (user && !loading && !error) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' as never }],
      });
    }
  }, [user, loading, error, navigation]);

  return (
    <SafeAreaView style={theme.container}>
      <View style={theme.spaced}>
        <Text style={theme.headerTitle}>Login</Text>
        <Text style={[styles.subtitle, { alignSelf: 'center' }]}>
          Connectez-vous à votre compte
        </Text>

        <View style={styles.formContainer}>
          <Text style={theme.inputLabel}>Email</Text>
          <TextInput
            placeholder="Email"
            style={theme.input}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />

          <View style={{ height: 20 }} />

          <Text style={theme.inputLabel}>Mot de passe</Text>
          <TextInput
            placeholder="Mot de passe"
            style={theme.input}
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <View>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Pas encore de compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
              <Text style={styles.linkAction}>Enregistrez-vous</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Mot de passe oublié ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword' as never)}>
              <Text style={styles.linkAction}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        {loading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <TouchableOpacity style={styles.submitBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>Se connecter</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
