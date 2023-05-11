import { Button } from 'native-base';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
export default function BottomButton(props: any) {
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
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
