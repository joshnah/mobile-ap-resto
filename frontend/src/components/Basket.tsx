import { Box, FlatList, HStack, Heading, Stack, Text } from 'native-base';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import BoxWrapper from '../commons/BoxWrapper';
import FKHButton from '../commons/Button';
import { DECREMENT_CART, INCREMENT_CART } from '../store/cart/cart.reducer';
import { RootState, useAppDispatch } from '../store/store';

function CartItem(props: any) {
  const dispatch = useAppDispatch();
  const increment = (id: number) => {
    dispatch({ type: INCREMENT_CART, payload: { id } });
  };
  const decrement = (id: number) => {
    dispatch({ type: DECREMENT_CART, payload: { id } });
  };
  return (
    <BoxWrapper>
      <Box minH={'100'} width={'100%'} flex={1}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
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
          <TouchableOpacity onPress={() => decrement(props.product.id)}>
            <Ionicons name="remove-circle-outline" size={50} color="green" />
          </TouchableOpacity>

          <Text alignSelf={'center'}>{props.quantity}</Text>

          <TouchableOpacity onPress={() => increment(props.product.id)}>
            <Ionicons name="add-circle-outline" size={50} color="green" />
          </TouchableOpacity>
        </HStack>
      </Stack>
    </BoxWrapper>
  );
}

export default function Basket() {
  const cart = useSelector((state: RootState) => {
    let total = 0;
    const cartItems = state.cart.cartItems.map((item) => {
      const product = state.appData.products.find(
        (p) => p.id === item.productId
      );
      total = total + product.price * item.quantity;
      return { product, quantity: item.quantity };
    });
    return { cartItems, total };
  });

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
      <FKHButton style={styles.bottomButton}>
        Payer {cart.total.toFixed(2)} {'\u20AC'}
      </FKHButton>
    </View>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  cartItems: {
    width: '80%',
    flex: 1,
    alignContent: 'center',
    marginBottom: 10,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
  },
});
