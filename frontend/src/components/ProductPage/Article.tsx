import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Article = (props: any) => {
  const { data } = props;

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ArticlePage', { data });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.price}>
            {data.price} {'\u20AC'}
          </Text>
          <Text style={styles.ingredients}>{data.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#3FC060',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 5,
  },
  contentContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 14,
  },
});

export default Article;
