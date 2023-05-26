import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlatList, View } from 'native-base';
import { useSelector } from 'react-redux';
import Article from './Article';

const Tab = createMaterialTopTabNavigator();
export default function HomePage() {
  const products: any[] = useSelector((state: any) => state.appData.products);
  const [dictProduits, setDictArray] = useState({});

  useEffect(() => {
    const newDict = {};
    products.forEach((product: any) => {
      if (!newDict[product.type]) {
        newDict[product.type] = [];
      }
      newDict[product.type].push(product);
    });
    setDictArray(newDict);
  }, [products]);

  const ProductPage = (props: any) => {
    const products: any[] = props.route.params.products;
    return (
      <FlatList
        flex={1}
        paddingBottom={'100px'}
        data={products}
        renderItem={({ item }) => (
          <Article data={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };
  return (
    <>
      <View flexDirection={'column'} flex={1}>
        <View style={styles.header}>
          <Text>Faites vous plaisir</Text>
        </View>
        {Object.keys(dictProduits).length > 0 && (
          <Tab.Navigator>
            {Object.keys(dictProduits).map((keyProduct) => {
              return (
                <Tab.Screen
                  key={keyProduct}
                  name={keyProduct}
                  component={ProductPage}
                  initialParams={{ products: dictProduits[keyProduct] }}
                />
              );
            })}
          </Tab.Navigator>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    
  },
});
