import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlatList, View } from 'native-base';
import { useSelector } from 'react-redux';
import Article from './ProductPage/Article';

const TYPES = ['burger', 'boisson', 'frites'];
const Tab = createMaterialTopTabNavigator();
export default function HomePage() {
  const products = useSelector((state: any) => state.appData.products);
  const ProductPage = (props: any) => {
    const type = props.route.name;
    const [filteredProducts, setFilteredProducts] = useState(
      products.filter((product) => product.type === type)
    );
    return (
      <FlatList
        flex={1}
        paddingBottom={'100px'}
        data={filteredProducts}
        renderItem={({ item }) => <Article data={item} />}
        keyExtractor={(item: any) => item.id}
      />
    );
  };

  return (
    <>
      <View flexDirection={'column'} flex={1}>
        <View style={styles.header}>
          <Text>Faites vous plaisir</Text>
        </View>
        <View style={styles.products}>
          <Tab.Navigator>
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
});
