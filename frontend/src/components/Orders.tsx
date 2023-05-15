import { FlatList } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BoxWrapper from '../commons/BoxWrapper';
import FKHButton from '../commons/Button';

function OrderItem() {
  return (
    <BoxWrapper>
      <View>
        <Text>Order</Text>
      </View>
    </BoxWrapper>
  );
}

export default function Orders() {
  return (
    <View style={styles.pageContainer}>
      <FlatList
        style={styles.cartItems}
        flex={1}
        paddingBottom={'100px'}
        data={[]}
        renderItem={({ item }) => <OrderItem></OrderItem>}
        keyExtractor={(item) => item.id}
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
