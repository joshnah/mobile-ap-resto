import {
  AspectRatio,
  Box,
  Center,
  FlatList,
  HStack,
  Heading,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import BottomButton from '../commons/BottomButton';
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
    <Box alignItems="center">
      <Box
        w={'80%'}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={2 / 1}>
            <Image
              source={{
                uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            HALAL
          </Center>
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
            overflow={'auto'}
            numberOfLines={2}
            flexGrow={1}
            fontWeight="400"
            textAlign={'center'}
          >
            {props.product.description}
          </Text>
          <HStack space={2} alignItems={'center'} justifyContent={'center'}>
            <TouchableOpacity onPress={() => decrement(props.product.id)}>
              <Ionicons name="remove-circle-outline" size={50} color="green" />
            </TouchableOpacity>

            <Text alignSelf={'center'}>{props.quantity}</Text>

            <TouchableOpacity onPress={() => increment(props.product.id)}>
              <Ionicons name="add-circle-outline" size={50} color="green" />
            </TouchableOpacity>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}

export default function Basket() {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.appData.products);
  const cart = useSelector((state: RootState) => {
    let total = 0;
    const cartItems = state.cart.cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      total = total + product.price * item.quantity;
      return { product, quantity: item.quantity };
    });
    return { cartItems, total };
  });

  return (
    <>
      <View style={styles.containerBasket}>
        <FlatList
          paddingBottom={'100px'}
          w={'100%'}
          data={cart.cartItems}
          renderItem={({ item }) => (
            <>
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            </>
          )}
          keyExtractor={(item) => item.product.id}
        />
      </View>
      <BottomButton>
        Payer {cart.total} {'\u20AC'}
      </BottomButton>
    </>
  );
}
const styles = StyleSheet.create({
  containerBasket: {
    flex: 1,
    alignItems: 'center',
  },
});
