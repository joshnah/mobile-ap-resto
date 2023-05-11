import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'native-base';
import { useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export default function HomePage() {
  const products = useSelector((state: any) => state.appData.products);
  const ProductPage = (props: any) => {
    return (
      <View>
        <Text>test</Text>
      </View>
    );
  };
  return (
    <>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen
            name="Burgers"
            component={ProductPage}
            initialParams={{ title: 'Burger' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
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
