import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getProductsAction } from '../store/data/product.actions';
import { RootState, useAppDispatch } from '../store/store';
import Article from './Article';

const MenuHomePage = () => {
    const dispatch = useAppDispatch();
    const data = useSelector((state: RootState) => state.product.products);

    useEffect(() => {
        dispatch(getProductsAction())
          .catch((error) => {
            console.error('erreur', error);
          });
      }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Burger</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Boisson</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Snacks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.text}>Sauce</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        // eslint-disable-next-line
        renderItem={({item}) => <Article data={data} />}
        keyExtractor={item => item.id}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  item: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuHomePage;
