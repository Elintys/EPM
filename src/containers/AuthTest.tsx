import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, registerUser } from '../store/slices/userSlice';
import { AppDispatch, RootState } from '../store/store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const handleRegister = () => {
    dispatch(registerUser({ email, password, firstName: 'Klan', lastName: 'Saah' }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion Elyntis</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Connexion" onPress={handleLogin} />
      <View style={{ height: 10 }} />
      <Button title="Créer un compte" onPress={handleRegister} />
      <View style={{ height: 10 }} />
      <Button title="Déconnexion" onPress={handleLogout} />

      {loading && <Text>Chargement...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {user && <Text style={styles.success}>Connecté : {user.email}</Text>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', marginTop: 10 },
});
