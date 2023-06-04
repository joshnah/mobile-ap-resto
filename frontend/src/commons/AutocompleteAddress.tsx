import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { autocompleteAddress } from '../services/data.service';
import { SET_NEW_ADDRESS } from '../store/auth/auth.reducer';
import { useAppDispatch } from '../store/store';
import FKHButton from './Button';
export default function AutoCompleteAddress(props: any) {
  const address = props.route.params.address;
  const [newAddr, setNewAddr] = useState(address);
  const [addrSuggestions, setAddrSuggestions] = useState([]);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (newAddr == null || newAddr.length <= 3) {
      return;
    }
    autocompleteAddress(newAddr)
      .then(async (response) => {
        const addressesList = [];
        for (const feature of response.data.features) {
          if (feature.properties.label == newAddr) {
            setAddrSuggestions([]);
            return;
          }
          addressesList.push(feature.properties.label);
        }
        setAddrSuggestions(addressesList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newAddr]);
  return (
    <>
      <View flex={1}>
        <Autocomplete
          placeholder="Adresse"
          data={addrSuggestions}
          value={newAddr}
          onChangeText={setNewAddr}
          flatListProps={{
            keyExtractor: (_, idx) => `${idx}`,
            renderItem: ({ item }) => (
              <TouchableOpacity onPress={() => setNewAddr(item)}>
                <Text style={styles.addressItems}>{item}</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <View marginTop={200}>
          <FKHButton
            onPress={() => {
              dispatch(SET_NEW_ADDRESS(newAddr));
              navigation.navigate('Infos');
            }}
          >
            {' '}
            Valider{' '}
          </FKHButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  addressItems: {
    fontSize: 16,
    padding: 5,
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
});
