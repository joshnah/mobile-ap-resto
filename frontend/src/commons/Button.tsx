import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
export default function FKHButton(props: any) {
  return (
    <Button
      onPress={props.onPress}
      style={props.disabled ? styles.disableButton : null}
      colorScheme={props.color ? props.color : 'green'}
      height={50}
      borderRadius={20}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      disabled={props.disabled}
    >
      <Text style={styles.textStyle}>{props.children}</Text>
    </Button>
  );
}
const styles = StyleSheet.create({
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#06C167',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  disableButton: {
    backgroundColor: '#f2f2f2'
  }
});
