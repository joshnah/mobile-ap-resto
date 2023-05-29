import React, { useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

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
            source={require('../../assets/FKH_log.png')}
          />
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
