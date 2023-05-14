import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { logoutAction, modifyInfosAction, modifyPasswordAction } from '../store/auth/auth.action';
import { SET_MESSAGE } from '../store/message/message.reducer';
import { RootState, useAppDispatch } from '../store/store';

export default function UserInfos() {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    let name: string;
    let phone: string;
    let address: string;
    let password: string;
    let confirmedPassword: string;
    const [infosModified, setInfosModified] = useState(false);
    const user = useSelector((state: RootState) => {
      const userStored = state.auth.user;
      const name = userStored.name;
      const email = userStored.email;
      let phone = userStored.phone;
      if (phone == null) {
        phone = undefined;
      }
      let address = userStored.address;
      if (address == null) {
        address = undefined;
      }
      return {name, email, phone, address};
    });

    function modifyUserInfos() {
      const modifiedName = name?name:user.name;
      const modifiedPhone = phone?phone:user.phone;
      const modifiedAddress = address?address:user.address;
      dispatch(
        modifyInfosAction({
          name: modifiedName,
          phone: modifiedPhone,
          address: modifiedAddress
        })
      )
      dispatch(
        SET_MESSAGE({
          message: 'Informations mises à jour',
          closable: true,
          status: 'success',
          autoClose: true,
        })
      )
    }

    function modifyPassword() {
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
        dispatch(
          modifyPasswordAction({
            password
          })
        )
      }
    }

    function logOut() {
      dispatch(
        logoutAction()
      );
      navigation.navigate('Login' as never);
    }

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

    const handleNameChange = (e) => {
      name = e;
      checkModifications();
    };
    const handlePhoneChange = (e) => {
      phone = e;
      checkModifications();
    };
    const handleAddressChange = (e) => {
      address = e;
      checkModifications();
    };
    const handlePasswordChange = (e) => {
      password = e;
    };
    const handleConfirmedPasswordChange = (e) => {
      confirmedPassword = e;
    };
    function checkModifications() {
      if ((name != undefined && name != user.name) || (phone != undefined && phone != user.phone) || (address != undefined && address != user.address)) {
        setInfosModified(true);
      } else {
        setInfosModified(false);
      }
      console.log(infosModified);
    }

    return (
        <SafeAreaView style={styles.container}>
          <Ionicons name='person-circle-outline' size={50} color='green' />
          <Text style={styles.title}>Informations Personnelles</Text>
          <ScrollView style={styles.content} automaticallyAdjustKeyboardInsets={true}>
              <Text style={styles.subTitle}>Nom</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Nom"
                  defaultValue={user.name}
                  onChangeText={handleNameChange}
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
                  onChangeText={handlePhoneChange}
              />
              <Text style={styles.subTitle}>Adresse</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Adresse"
                  defaultValue={user.address}
                  onChangeText={handleAddressChange}
              />
              <Text style={styles.subTitle}>Mot de passe</Text>
              <TextInput
                  style={styles.passwordInput}
                  placeholder="Nouveau Mot de Passe"
                  secureTextEntry
                  onChangeText={handlePasswordChange}
              />
              <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirmer le nouveau Mot de Passe"
                  secureTextEntry
                  onChangeText={handleConfirmedPasswordChange}
              />
              <TouchableOpacity style={styles.buttonPassword} onPress={modifyPassword}>
                  <Text style={styles.buttonText}>Modifier le mot de passe</Text>
              </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={infosModified?styles.button:styles.disableButton} onPress={modifyUserInfos} disabled={infosModified?false:true}>
              <Text style={styles.buttonText}>Enregistrer les modifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLogOut} onPress={logOut}>
              <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </SafeAreaView>
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
      marginBottom: 30
    },
    subTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf: 'flex-start'
    },
    disableInput: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#f2f2f2'
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
      marginTop: 10
    },
    buttonPassword: {
      height: 50,
      width: '50%',
      backgroundColor: '#06C167',
      borderRadius: 5,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });