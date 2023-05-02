import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spinner from './spinner';

interface Props {
  navigation: any;
}
export default class SplashScreen extends React.Component<Props> {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login' as never);
    }, 1000);
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner />
        <Text style={styles.title}>Faites vous plaisir</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
});
