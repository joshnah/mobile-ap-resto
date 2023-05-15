import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../models/User';
import { registerAction } from '../store/auth/auth.action';
import { SET_MESSAGE } from '../store/message/message.reducer';
import { RootState } from '../store/store';
export default function CreateAccount() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isRegistered = useSelector((state: RootState) => state.auth.registered);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  function handleCreateAccount() {
    if (email.trim() === '' || !validateEmail(email)) {
      setError('Veuillez entrer une adresse mail valide');
      dispatch(
        SET_MESSAGE({
          message: 'Veuillez entrer une adresse mail valide',
          closable: true,
          status: 'error',
          autoClose: true,
        })
      );
      return;
    }
    if (username.trim() == '' || !validateUsername(username)) {
      setError('Veuillez entrer un nom dutilisateur valide');
      dispatch(
        SET_MESSAGE({
          message: 'Veuillez entrer un nom dutilisateur valide',
          closable: true,
          status: 'error',
          autoClose: true,
        })
      );
      return;
    }

    if (password.trim() === '' || !validatePassword(password)) {
      setError('Veuillez entrer un mot de passe valide');
      dispatch(
        SET_MESSAGE({
          message: 'Veuillez entrer un mot de passe valide',
          closable: true,
          status: 'error',
          autoClose: true,
        })
      );
      return;
    }

    function validateUsername(username) {
      const usernameRegex = /^[a-z\-'\s]{1,128}$/;
      return usernameRegex.test(username);
    }
    function validatePassword(password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
      console.log(password);
      return passwordRegex.test(password);
    }
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const userData: User = {
      name: username,
      email: email,
      password: password,
      phone: phone.trim() === '' ? null : phone,
      isAdmin: false,
      address: address.trim() === '' ? null : address,
    };
    dispatch(registerAction(userData) as any);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        onChangeText={setAddress}
        value={address}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={setPhone}
        value={phone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#06C167',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
