import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Box, FlatList, View } from 'native-base';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();
export default function HomePage() {
  // const productsArray: { [key in ProductType]: any[] } = {} as any;
  const products: any[] = useSelector((state: any) => state.appData.products);
  const [productsArray, setProductsArray] = useState({});

  useEffect(() => {
    const copy = { ...productsArray };

    products.forEach((product: any) => {
      if (!productsArray[product.type]) {
        copy[product.type] = [];
      }
      copy[product.type].push(product);
    });
    setProductsArray(copy);
    Object.keys(copy).forEach((key) => {
      console.log(copy[key]);
    });
  }, [products]);

  const ProductPage = (props: any) => {
    const products: any[] = props.route.params.products;
    return (
      <FlatList
        flex={1}
        paddingBottom={'100px'}
        data={products}
        renderItem={({ item }) => (
          <Box>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };
  return (
    <>
      <View flexDirection={'column'}>
        <View style={styles.header}> METTEZ LE LOGE COMME DANS FIGMA</View>
        {Object.keys(productsArray).length > 0 && (
          <Tab.Navigator>
            {Object.keys(productsArray).map((keyProduct) => {
              return (
                <Tab.Screen
                  key={keyProduct}
                  name={keyProduct}
                  component={ProductPage}
                  initialParams={{ products: productsArray[keyProduct] }}
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
    height: '20%',
  },
});
