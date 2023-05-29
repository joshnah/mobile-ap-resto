import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import FKHButton from '../../commons/Button';
import { fkhAlert } from '../../services/common.service';
import { ADD_TO_CART } from '../../store/cart/cart.reducer';
import {
  deleteProductAction,
  updateProductAction,
} from '../../store/data/appData.action';
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
  const deleteProduct = () => {
    const title = 'Attention';
    const description = 'Êtes-vous sûr de vouloir supprimer cet article ?';

    fkhAlert(title, description, () => {
      dispatch(deleteProductAction({ id: product.id, navigation }));
    });
  };
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
      <VStack space={2} alignItems="center" width={'100%'}>
        <FKHButton onPress={() => setShowModal(true)}> Modifier </FKHButton>
        <FKHButton onPress={() => deleteProduct()} color={'red'}>
          {' '}
          Supprimer{' '}
        </FKHButton>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={'xl'}>
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
                  alt="No image found"
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
      <VStack space={4} alignItems={'center'}>
        <View style={styles.container}>
          <VStack space={4} alignItems={'center'}>
            <ImageBackground source={{ uri: data.image }} style={styles.image}>
              <View style={styles.overlay} />
            </ImageBackground>
            <Text fontSize={'xl'} fontWeight={'bold'} color={'white'}>
              {data.name}
            </Text>
            <Text fontSize={'xl'} fontWeight={'bold'} color={'white'}>
              {data.price} {'\u20AC'}
            </Text>
            <Text fontSize={'lg'} fontStyle={'italic'} color={'white'}>
              {data.description}
            </Text>
          </VStack>
        </View>
        <HStack space={4} alignItems={'center'}>
          {!isAdmin && (
            <>
              <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                <Ionicons
                  name="remove-circle-outline"
                  size={50}
                  color="green"
                />
              </TouchableOpacity>
              <Heading>{quantity}</Heading>
              <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                <Ionicons name="add-circle-outline" size={50} color="green" />
              </TouchableOpacity>
            </>
          )}
        </HStack>

        {!isAdmin ? (
          <FKHButton onPress={handleBuying}>
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
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FC060',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  image: {
    height: 350,
    width: 350,
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
    color: '#ffffff',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
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
