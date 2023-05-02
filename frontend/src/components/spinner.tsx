import React, { Component } from 'react';
import { Animated, Easing, View } from 'react-native';

export default class Spinner extends Component {
  spinValue: Animated.Value;
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  }

  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.spin());
  };

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={{ alignItems: 'center' }}>
        <Animated.Image
          style={{
            width: 150,
            height: 150,
            transform: [{ rotate: spin }],
            justifyContent: 'center',
          }}
          source={require('../../assets/FKH_log.png')}
        />
      </View>
    );
  }
}
