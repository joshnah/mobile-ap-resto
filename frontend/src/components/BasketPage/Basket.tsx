import {
  Box,
  FlatList,
  HStack,
  Heading,
  Image,
  Modal,
  ScrollView,
  Stack,
  Text
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import BoxWrapper from '../../commons/BoxWrapper';
import FKHButton from '../../commons/Button';
import { fkhAlert } from '../../services/common.service';
import {
  DECREMENT_CART,
  INCREMENT_CART,
  REMOVE_FROM_CART,
} from '../../store/cart/cart.reducer';
import { addOrderAction } from '../../store/data/appData.action';
import { RootState, useAppDispatch } from '../../store/store';

// Component représentant un produit dans le panier
function CartItem(props: any) {
  // Variable de dispatch
  const dispatch = useAppDispatch();
  // Variable pour gérer l'affichage du modal avec les détails du produit
  const [showDetails, setShowDetails] = useState(false);

  // Fonction d'incrément du nombre de produits
  const increment = (id: number) => {
    dispatch({ type: INCREMENT_CART, payload: { id } });
  };
  // Fonction de décrément du nombre de produits
  const decrement = (id: number) => {
    dispatch({ type: DECREMENT_CART, payload: { id } });
  };

  // Fonction appelée pour confirmer la suppression d'un produit du panier
  const handleRemove = (id: number) => {
    fkhAlert(
      'Attention',
      'Êtes-vous sûr de vouloir supprimer cet article ?',
      () => remove(id)
    );
  };

  // Fonction appelée pour supprimer un produit du panier
  function remove(id: number) {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  }

  return (
    <TouchableOpacity onPress={() => setShowDetails(true)}>
      <BoxWrapper style={styles.wrapper}>
        <Box minH={'100'} width={'100%'} flex={1}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: props.product.image,
            }}
            alt="image"
            resizeMode="cover"
          />
        </Box>
        <Stack p="4" space={3} alignContent={'center'}>
          <Box flexDirection={'row'} justifyContent={'space-evenly'}>
            <Heading size="md" ml="-1">
              {props.product.name}
            </Heading>
            <Heading size="md" ml="-1">
              {props.product.price} {'\u20AC'}
            </Heading>
          </Box>
          <Text
            numberOfLines={2}
            flexGrow={1}
            fontWeight="400"
            textAlign={'center'}
          >
            {props.product.description}
          </Text>
          <HStack space={2} alignItems={'center'} justifyContent="space-around">
            <TouchableOpacity
              onPress={() => decrement(props.product.id)}
              testID="basket-decrement"
            >
              <Ionicons name="remove-circle-outline" size={50} color="green" />
            </TouchableOpacity>

            <Text
              alignSelf={'center'}
              fontSize={'xl'}
              fontWeight={'bold'}
              testID="basket-quantity"
            >
              {props.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => increment(props.product.id)}
              testID="basket-increment"
            >
              <Ionicons name="add-circle-outline" size={50} color="green" />
            </TouchableOpacity>
          </HStack>
        </Stack>
        <TouchableOpacity
          testID="basket-remove"
          style={styles.removeButton}
          onPress={() => handleRemove(props.product.id)}
        >
          <Ionicons name="trash-outline" size={40} color="red" />
        </TouchableOpacity>
      </BoxWrapper>
      <Modal
        _backdrop={{
          bg: 'warmGray.50',
        }}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        size={'xl'}
        borderColor={'black'}
        shadow={6}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{props.product.name}</Modal.Header>
          <Modal.Body>
            <Box flex={1} alignItems="center">
              <Image
                source={{ uri: props.product.image }}
                alt="image"
                resizeMode="cover"
                height={300}
                width={300}
              />
            </Box>
          </Modal.Body>
          <Text style={styles.subTitle}>{props.product.description}</Text>
        </Modal.Content>
      </Modal>
    </TouchableOpacity>
  );
}

export default function Basket() {
  // Variable de dispatch
  const dispatch = useAppDispatch();
  // Variable pour gérer l'affichage du modal permettant de passer la commande
  const [showOrderView, setShowOrderView] = useState(false);
  // Variable pourgérer l'activation du bouton de commande
  const [canOrder, setCanOrder] = useState(false);
  // Variables pour les informations utilisateur lors de la commande
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');

  // Récupération du panier dans le state
  const cart = useSelector((state: RootState) => {
    let total = 0;
    const cartProducts = state.cart.cartItems;
    const cartItems = cartProducts.map((item) => {
      const product = state.appData.products.find(
        (p) => p.id === item.productId
      );
      if (product) {
        total = total + product.price * item.quantity;
      }
      return { product, quantity: item.quantity };
    });
    return { cartProducts, cartItems, total: Number(total.toFixed(2)) };
  });

  // Récupération du user dans le state
  const user = useSelector((state: RootState) => state.auth.user);

  // Activation ou désactivation du bouton de commande en fonction du remplissage de l'adresse et du téléphone
  useEffect(() => {
    if (address == '' || address == null || phone == '' || phone == null) {
      setCanOrder(false);
    } else {
      setCanOrder(true);
    }
  }, [address, phone]);

  // Fonction pour enregistrer
  function handleRegisteredAddress() {
    setAddress(user.address);
  }

  function handleRegisteredPhone() {
    setPhone(user.phone);
  }

  // Fonction appelée lors de la confirmation de la commande
  function handleOrder() {
    // Appel à l'action d'ajout de commande
    dispatch(
      addOrderAction({
        address,
        products: JSON.stringify(cart.cartProducts),
        restaurantId: '1',
        phone: phone,
      })
    );
    // Fermeture du modal de commande
    setShowOrderView(false);
  }

  if (!user) {
    return null;
  }
  return (
    <View style={styles.pageContainer}>
      <FlatList
        style={styles.cartItems}
        flex={1}
        paddingBottom={'100px'}
        data={cart.cartItems}
        renderItem={({ item }) => (
          <CartItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        )}
        keyExtractor={(item) => item.product.id}
      />
      {cart.total > 0 && (
        <FKHButton
          style={styles.bottomButton}
          onPress={() => {
            setShowOrderView(true);
          }}
        >
          Commander {cart.total} {'\u20AC'}
        </FKHButton>
      )}
      {cart.total == 0 && (
        <Text style={styles.pageContainer}>
          Votre panier est vide. Commencez vos achats !
        </Text>
      )}
      <Modal
        _backdrop={{
          bg: 'warmGray.50',
        }}
        isOpen={showOrderView}
        onClose={() => setShowOrderView(false)}
        size={'xl'}
        borderColor={'black'}
        shadow={6}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Commander</Modal.Header>
          <Modal.Body>
            <ScrollView
              automaticallyAdjustKeyboardInsets={true}
            >
              <Text style={styles.subTitle}>Adresse</Text>
              <TextInput
                style={styles.input}
                placeholder="Adresse"
                placeholderTextColor="gray"
                value={address}
                onChangeText={setAddress}
              />
              {user.address != null && address != user.address && (
                <FKHButton
                  onPress={handleRegisteredAddress}
                >
                  <Text style={styles.modalButtonText}>
                    Livrer à l&apos;adresse liée au compte
                  </Text>
                </FKHButton>
              )}
              <Text style={styles.subTitle}>Téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                placeholderTextColor="gray"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              {user.phone != null && phone != user.phone && (
                <FKHButton
                  onPress={handleRegisteredPhone}
                >
                  <Text style={styles.modalButtonText}>
                    Utiliser le téléphone lié au compte
                  </Text>
                </FKHButton>
              )}
              <Text style={styles.subTitle}>Carte Bancaire</Text>
              <TextInput
                style={styles.input}
                placeholder="Numéro de carte"
                placeholderTextColor="gray"
                keyboardType="number-pad"
                value={cardNumber}
                onChangeText={setCardNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Date d'expiration (MM/YY)"
                placeholderTextColor="gray"
                keyboardType="numbers-and-punctuation"
                value={expirationDate}
                onChangeText={setExpirationDate}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                placeholderTextColor="gray"
                keyboardType="number-pad"
                value={cvv}
                onChangeText={setCVV}
                secureTextEntry
              />
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <FKHButton
              onPress={handleOrder}
              disabled={!canOrder}
            >
              Commander {cart.total.toFixed(2)} {'\u20AC'}
            </FKHButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  cartItems: {
    width: '100%',
    flex: 1,
    alignContent: 'center',
    marginBottom: 10,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    marginVertical: 40,
  },
  scrollContent: {
    width: '80%',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 30,
  },
  input: {
    height: 50,
    width: '95%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  cbInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  wrapper: {
    borderWidth: 3,
    borderColor: 'green',
  },
});
