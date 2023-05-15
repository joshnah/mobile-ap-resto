import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import {
  logoutAction,
  modifyInfosAction,
  modifyPasswordAction,
} from '../store/auth/auth.action';
import {
  UPDATE,
  UPDATE_FINISHED,
  UPDATE_PWD,
  UPDATE_PWD_FINISHED,
} from '../store/auth/auth.reducer';
import { SET_MESSAGE } from '../store/message/message.reducer';
import { RootState, useAppDispatch } from '../store/store';

export default function UserInfos() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Variables pour les infos
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // Variables pour le password
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  // Récupération des infos du user dans le state auth
  const user = useSelector((state: RootState) => state.auth.user);

  // Récupération de l'état d'update
  const infos = useSelector((state: RootState) => {
    const hasChanged = state.auth.hasChanged;
    const pwdChanged = state.auth.pwdChanged;
    return { hasChanged, pwdChanged };
  });
  // UseEffect pour la gestion des modifications
  useEffect(() => {
    if (
      (name != '' && name != user.name) ||
      (phone != '' && phone != user.phone) ||
      (address != '' && address != user.address)
    ) {
      dispatch({ type: UPDATE });
    } else {
      dispatch({ type: UPDATE_FINISHED });
    }
  }, [name, phone, address]);

  // UseEffect pour la gestion du password
  useEffect(() => {
    if (password != '' && confirmedPassword != '') {
      dispatch({ type: UPDATE_PWD });
    } else {
      dispatch({ type: UPDATE_PWD_FINISHED });
    }
  }, [password, confirmedPassword]);

  // Fonction appelée pour modifier les infos du user
  function modifyUserInfos() {
    // Si les infos n'ont pas été modifiées, on remplace par les données du user
    const modifiedName = name ? name : user.name;
    const modifiedPhone = phone ? phone : user.phone;
    const modifiedAddress = address ? address : user.address;
    // Appel de l'action de modification
    dispatch(
      modifyInfosAction({
        name: modifiedName,
        phone: modifiedPhone,
        address: modifiedAddress,
      })
    );
  }

  // Fonction appelée pour modifier le mot de passe du user
  function modifyPassword() {
    // Si le mot de passe n'a pas été correctement confirmé, on affiche un message d'erreur
    if (password != confirmedPassword) {
      dispatch(
        SET_MESSAGE({
          message: 'Veuillez confirmer le nouveau mot de passe',
          closable: true,
          status: 'error',
          autoClose: true,
        })
      );
    } else {
      // sinon, on appelle l'action de modification
      dispatch(
        modifyPasswordAction({
          password,
        })
      );
    }
  }

  // Fonction de déconnexion
  function logOut() {
    // Appel de l'action de déconnexion
    dispatch(logoutAction());
  }

  // Fonction d'affichage de l'information liée au mail non modifiable
  function displayInfo() {
    dispatch(
      SET_MESSAGE({
        message: 'Le mail associé au compte ne peut pas être modifié',
        closable: true,
        status: 'info',
        autoClose: true,
      })
    );
  }

  if (!user) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={50} color="green" />
      <Text style={styles.title}>Informations Personnelles</Text>
      <ScrollView
        style={styles.content}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text style={styles.subTitle}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          defaultValue={user.name}
          onChangeText={setName}
        />
        <Text style={styles.subTitle}>Email</Text>
        <TextInput
          style={styles.disableInput}
          placeholder="Email"
          keyboardType="email-address"
          defaultValue={user.email}
          editable={false}
          onPressIn={displayInfo}
        />
        <Text style={styles.subTitle}>Téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          keyboardType="phone-pad"
          defaultValue={user.phone}
          onChangeText={setPhone}
        />
        <Text style={styles.subTitle}>Adresse</Text>
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          defaultValue={user.address}
          onChangeText={setAddress}
        />
        <Text style={styles.subTitle}>Mot de passe</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="Nouveau Mot de Passe"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmer le nouveau Mot de Passe"
          secureTextEntry
          onChangeText={setConfirmedPassword}
        />
        <TouchableOpacity
          style={
            infos.pwdChanged
              ? styles.buttonPassword
              : styles.disableButtonPassword
          }
          onPress={modifyPassword}
          disabled={infos.pwdChanged ? false : true}
        >
          <Text style={styles.buttonText}>Modifier le mot de passe</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={infos.hasChanged ? styles.button : styles.disableButton}
        onPress={modifyUserInfos}
        disabled={infos.hasChanged ? false : true}
      >
        <Text style={styles.buttonText}>Enregistrer les modifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogOut} onPress={logOut}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
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
  content: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  disableInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
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
  passwordInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  disableButton: {
    height: 50,
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#06C167',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogOut: {
    height: 50,
    width: '100%',
    backgroundColor: '#06C167',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonPassword: {
    height: 50,
    width: '50%',
    backgroundColor: '#06C167',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  disableButtonPassword: {
    height: 50,
    width: '50%',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
