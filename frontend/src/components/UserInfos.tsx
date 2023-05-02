import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UserInfos() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Infos</Text>
            <Text style={styles.subTitle}>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom"
            />
            <Text style={styles.subTitle}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
            />
            <Text style={styles.subTitle}>Téléphone</Text>
            <TextInput
                style={styles.input}
                placeholder="Téléphone"
                keyboardType="email-address"
            />
            <Text style={styles.subTitle}>Adresse</Text>
            <TextInput
                style={styles.input}
                placeholder="Adresse"
            />
            <Text style={styles.subTitle}>Mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Modifier</Text>
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
      marginBottom: 30
    },
    subTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf: 'flex-start'
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