import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Center,
  FlatList,
  FormControl,
  Image,
  Input,
  Modal,
  Text,
  View,
} from 'native-base';
import { useSelector } from 'react-redux';
import FKHButton from '../../commons/Button';
import { addProductAction } from '../../store/data/appData.action';
import { RootState, useAppDispatch } from '../../store/store';
import Article from '../ProductPage/Article';

const TYPES = ['burger', 'boisson', 'frites'];
const Tab = createMaterialTopTabNavigator();
export default function HomePage() {
  const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);
  const [showModal, setShowModal] = useState(false);
  const [type, setType]: any = useState('burger');
  const [name, setName]: any = useState('');
  const [price, setPrice]: any = useState('');
  const [description, setDescription]: any = useState('');
  const [image, setImage]: any = useState('');
  const [canAdd, setCanAdd] = useState(false);
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const products = useSelector((state: any) => state.appData.products);
  const ProductPage = (props: any) => {
    const type = props.route.name;
    const [filteredProducts] = useState(
      products.filter((product) => product.type === type)
    );
    return (
      <FlatList
        flex={1}
        paddingBottom={10}
        data={filteredProducts}
        renderItem={({ item }) => <Article data={item} />}
        keyExtractor={(item: any) => item.id}
      />
    );
  };

  useEffect(() => {
    if (name == '' || price == '' || description == '' || image == '') {
      setCanAdd(false);
    } else {
      setCanAdd(true);
    }
  }, [name, price, description, image]);

  const handleSave = () => {
    dispatch(
      addProductAction({
        type: type,
        name: name,
        price: price.replace(',', '.'),
        description: description,
        image: image,
        navigation: navigation,
      })
    );
    setShowModal(false);
  };

  ('https://bakeitwithlove.com/wp-content/uploads/2021/05/McDonalds-The-Travis-Scott-Burger-sq-500x500.jpg');

  return (
    <>
      <View flexDirection={'column'} flex={1}>
        <View style={{ alignItems: 'center' }}>
          <Animated.Image
            style={{
              width: 150,
              height: 150,
              justifyContent: 'center',
            }}
            source={require('../../../assets/FKH_log.png')}
          />
          {isAdmin && (
            <FKHButton onPress={setShowModal}>Ajouter un produit</FKHButton>
          )}
        </View>
        <View style={styles.products}>
          <Tab.Navigator initialRouteName="burger">
            {TYPES.map((keyProduct) => {
              return (
                <Tab.Screen
                  key={keyProduct}
                  name={keyProduct}
                  component={ProductPage}
                  initialParams={{ type: keyProduct }}
                />
              );
            })}
          </Tab.Navigator>
        </View>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          size={'xl'}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Ajouter le produit</Modal.Header>
            <Modal.Body>
              <FormControl mt="3">
                <FormControl.Label>Type</FormControl.Label>
                <Picker selectedValue={type} onValueChange={setType}>
                  <Picker.Item label="Burger" value="burger" />
                  <Picker.Item label="Boisson" value="boisson" />
                  <Picker.Item label="Frites" value="frites" />
                </Picker>
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Nom</FormControl.Label>
                <Input
                  value={name}
                  onChangeText={setName}
                  testID="new-product-name"
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Prix</FormControl.Label>
                <Input
                  value={price}
                  testID="new-product-price"
                  onChangeText={setPrice}
                  keyboardType="numeric"
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  value={description}
                  onChangeText={setDescription}
                  testID="new-product-desc"
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>URL image</FormControl.Label>
                <Input
                  value={image}
                  onChangeText={setImage}
                  testID="new-product-image"
                />
                <Center>
                  <Text>Image</Text>
                  {image !== '' && (
                    <Image
                      source={{
                        uri: image,
                      }}
                      alt="Pas d'image chargée"
                      size="xl"
                    />
                  )}
                </Center>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Annuler
                </Button>
                <Button
                  style={!canAdd ? styles.disabledSaveButton : null}
                  disabled={!canAdd}
                  onPress={handleSave}
                  testID="new-product-save"
                >
                  Enregistrer
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  products: {
    flex: 3,
  },
  disabledSaveButton: {
    backgroundColor: '#f2f2f2',
  },
});
