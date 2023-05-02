import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const PRODUCTS = [
  {
    id: '1',
    name: 'Burger 1',
    price: '$13',
    image: require('../../assets/burger1.jpg'),
  },
  {
    id: '2',
    name: 'Burger 2',
    price: '$17',
    image: require('../../assets/burger2.png'),
  },
  {
    id: '3',
    name: 'Burger 3',
    price: '$18',
    image: require('../../assets/burger3.png'),
  },
  {
    id: '4',
    name: 'Burger 4',
    price: '$12',
    image: require('../../assets/burger4.png'),
  },
];

export default function ProductList() {
  return (
    <FlatList
      data={PRODUCTS}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image style={styles.image} source={item.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginLeft: 'auto',
  },
});
