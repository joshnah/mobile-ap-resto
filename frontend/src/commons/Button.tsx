import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
export default function FKHButton(props: any) {
  return (
    <Button style={[styles.bottomView, props.style]}>
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
});
