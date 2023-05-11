import React, { useState } from 'react';
// 1. import `NativeBaseProvider` component
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { loginAction } from '../store/auth/auth.action';
import { fetchData } from '../store/data/appData.action';
import { SET_MESSAGE } from '../store/message/message.reducer';
import { useAppDispatch } from '../store/store';

export default function Login() {
  const dispatch = useAppDispatch();
  // 2. Use at the root of your app
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    dispatch(
      loginAction({
        email: 'admin@gmail.com',
        password: 'admin',
      })
    ).then(() => {
      dispatch(fetchData());
      dispatch(
        SET_MESSAGE({
          message: 'Welcome',
          closable: true,
          status: 'success',
          autoClose: true,
        })
      );
      navigation.navigate('Home' as never);
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
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
});
