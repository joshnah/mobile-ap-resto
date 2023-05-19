import React, { useEffect, useState } from 'react';
// 1. import `NativeBaseProvider` component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { loginAction } from '../store/auth/auth.action';
import { LOGIN_SUCCESS } from '../store/auth/auth.reducer';
import { fetchData } from '../store/data/appData.action';
import { RootState, useAppDispatch } from '../store/store';

export default function Login() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // 2. Use at the root of your app
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // call once to get user
  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: JSON.parse(user) });
      }
    });
  }, []);

  // call when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchData());
      navigation.navigate('Home' as never);
      dispatch(fetchData());
    }
  }, [isLoggedIn]);

  function handleLogin() {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password');
      return;
    }

    if (!validateEmail(username)) {
      setError('Please enter a valid email address');
      return;
    }

    dispatch(
      loginAction({
        email: username,
        password: password,
      })
    );
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleCreateAccount() {
    navigation.navigate('CreateLogin' as never);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setUsername}
        value={username}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleCreateAccount}
      >
        <Text style={styles.createAccountButtonText}>Créer un compte</Text>
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
  createAccountButton: {
    marginTop: 10,
    height: 50,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
