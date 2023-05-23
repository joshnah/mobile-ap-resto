import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ADD_TO_CART } from '../store/cart/cart.reducer';
import { useAppDispatch } from '../store/store';
    
const articlePage = ({ route }) => {
    const {data} = route.params;
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const handleBuying = () =>{
        const itemInCart = {
            productId : data.id,
            quantity: 1,
        };
        dispatch({type:ADD_TO_CART, payload :itemInCart});
        navigation.navigate('Home');    
    }
    return (
        <View><View style={styles.container}>
        <ImageBackground source={{ uri: data.image }} style={styles.image}>
          <View style={styles.overlay} />
        </ImageBackground>      
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.price}>{data.price}</Text>
          <Text style={styles.ingredients}>{data.description}</Text>
        </View>
      </View><TouchableOpacity style={styles.button}onPress={handleBuying}>
        <Text style={styles.buttonText} >Acheter - {data.price}</Text>
      </TouchableOpacity></View>
      
    );
  };

    const styles = StyleSheet.create({
        button:{
            backgroundColor: '#3FC060',
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
        },
        buttonText:{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        container: {
          backgroundColor: '#3FC060',
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
        },
        image: {
          height: 350,
          borderRadius: 10,
          overflow: 'hidden',
          resizeMode: 'cover',
        },
        overlay: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        contentContainer: {
          marginTop: 10,
        },
        title: {
          fontSize: 40,
          fontWeight: 'bold',
          marginBottom: 5,
          color: '#ffffff',
        },
        price: {
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 5,
          color: '#ffffff',
        },
        ingredients: {
          fontSize: 20,
          color: '#ffffff',
        },
      });
      

    export default articlePage;
