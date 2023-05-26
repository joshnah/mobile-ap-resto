import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Modal,
  Text,
  View,
} from 'native-base';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import FKHButton from '../../commons/Button';
import { ADD_TO_CART } from '../../store/cart/cart.reducer';
import { updateProductAction } from '../../store/data/appData.action';
import { SET_MESSAGE } from '../../store/message/message.reducer';
import { RootState, useAppDispatch } from '../../store/store';

const hasChanged = (intialProduct, updatedProduct) => {
  if (
    intialProduct.name !== updatedProduct.name ||
    intialProduct.price !== updatedProduct.price ||
    intialProduct.description !== updatedProduct.description ||
    intialProduct.image !== updatedProduct.image
  ) {
    return true;
  }
  return false;
};
const ModalWindow = (props: any) => {
  const { product, dispatch, navigation } = props;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);

  const handleSave = () => {
    if (!hasChanged(product, { name, price, description, image })) {
      dispatch(
        SET_MESSAGE({
          message: "Aucune modification n'a été effectuée",
          type: 'warning',
          autoclose: true,
          closablable: true,
        })
      );
      return;
    }
    dispatch(
      updateProductAction({
        name,
        price,
        description,
        image,
        id: product.id,
        navigation,
      })
    );
    setShowModal(false);
  };
  return (
    <>
      <Center>
        <FKHButton
          style={styles.addToCartButton}
          onPress={() => setShowModal(true)}
        >
          {' '}
          Modifier{' '}
        </FKHButton>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          size={'xl'}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Modifier la commande</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input value={name} onChangeText={setName} />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Price</FormControl.Label>
                <Input value={price} onChangeText={setPrice} />
              </FormControl>

              <FormControl mt="3">
                <FormControl.Label>Description</FormControl.Label>
                <Input value={description} onChangeText={setDescription} />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>URL image</FormControl.Label>
                <Input value={image} onChangeText={setImage} />
                <Center>
                  <Text>Image preview</Text>
                  <Image
                    source={{
                      uri: image,
                    }}
                    alt="Alternate Text"
                    size="xl"
                  />
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
                  Cancel
                </Button>
                <Button onPress={handleSave}>Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};
export default function ArticlePage(props: any) {
  const { data } = props.route.params;
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuying = () => {
    const itemInCart = {
      id: data.id,
      quantity: quantity,
    };
    dispatch({ type: ADD_TO_CART, payload: itemInCart });
    navigation.navigate('Home');
  };

  return (
    <>
      <View>
        <View style={styles.container}>
          <ImageBackground source={{ uri: data.image }} style={styles.image}>
            <View style={styles.overlay} />
          </ImageBackground>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.price}>
              {data.price} {'\u20AC'}
            </Text>
            <Text style={styles.ingredients}>{data.description}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDecrement}>
            <Ionicons name="remove-circle-outline" size={50} color="green" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.button} onPress={handleIncrement}>
            <Ionicons name="add-circle-outline" size={50} color="green" />
          </TouchableOpacity>
        </View>

        {!isAdmin ? (
          <FKHButton onPress={handleBuying} style={styles.addToCartButton}>
            {' '}
            Ajouter au Panier - {(data.price * quantity).toFixed(2)}€
          </FKHButton>
        ) : (
          <ModalWindow
            product={data}
            dispatch={dispatch}
            navigation={navigation}
          ></ModalWindow>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FC060',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    flex: 1,
  },
  image: {
    height: 350,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  ingredients: {
    fontSize: 20,
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3FC060',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: 120,
  },
  addToCartButton: {
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
});
