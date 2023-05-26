import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ADD_TO_CART } from '../store/cart/cart.reducer';
import { useAppDispatch } from '../store/store';

const articlePage = ({ route }) => {
  const { data } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

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
    <View>
      <View style={styles.container}>
        <ImageBackground source={{ uri: data.image }} style={styles.image}>
          <View style={styles.overlay} />
        </ImageBackground>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.price}>{data.price}</Text>
          <Text style={styles.ingredients}>{data.description}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Ionicons name="remove-circle-outline" size={50} color="red" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Ionicons name="add-circle-outline" size={50} color="green" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleBuying}>
        <Text style={styles.buttonText}>
          Ajouter au Panier - {data.price * quantity}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FC060',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
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
  },
  button: {
    backgroundColor: '#3FC060',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: 120,
  },
  addToCartButton: {
    backgroundColor: '#3FC060',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
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

export default articlePage;
