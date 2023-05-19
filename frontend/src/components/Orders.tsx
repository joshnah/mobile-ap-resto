import {
  Badge,
  Box,
  Button,
  FlatList,
  HStack,
  Heading,
  Modal,
  Stack,
  Text,
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import BoxWrapper from '../commons/BoxWrapper';
import { RootState } from '../store/store';

const convertDate = (date: string) => {
  const dateObj = new Date(date);
  return (
    dateObj.getHours() +
    ':' +
    dateObj.getMinutes() +
    ' ' +
    dateObj.getUTCDate() +
    '/' +
    dateObj.getUTCMonth() +
    '/' +
    dateObj.getUTCFullYear()
  );
};
function DetailOrder(props: any) {
  const { order } = props;
  return (
    <Stack p={3} space={3}>
      <HStack justifyContent={'space-between'}>
        <Heading fontSize={'md'}>{convertDate(order.date)}</Heading>
        <Heading fontSize={'md'}>
          Status:{' '}
          {order.status ? (
            <Badge colorScheme={'success'} _text={{ fontWeight: 'bold' }}>
              Fini
            </Badge>
          ) : (
            <Badge colorScheme="warning" _text={{ fontWeight: 'bold' }}>
              En cours
            </Badge>
          )}
        </Heading>
      </HStack>
      <Heading fontSize={'xl'} textAlign={'center'}>
        Total: {order.total} {'\u20AC'}
      </Heading>
      <Text textAlign={'center'}> {order.address}</Text>
    </Stack>
  );
}
export default function Orders() {
  const orders = useSelector((state: RootState) => state.appData.orders);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const products = useSelector((state: RootState) => state.appData.products);
  const OrderItem = (props: any) => {
    const { order } = props;

    return (
      <BoxWrapper style={styles.wrapper}>
        <DetailOrder products={products} order={order}></DetailOrder>
        <Button
          size={'sm'}
          onPress={() => {
            setShowModal(true);
            setCurrentOrder(order);
          }}
        >
          Détails
        </Button>
      </BoxWrapper>
    );
  };
  const findProduct = (id: number) => {
    return products.find((product) => product.id === id);
  };

  const ProductList = (props: any) => {
    const { order } = props;
    return (
      <FlatList
        data={order.products}
        renderItem={(productWithQte: any) => {
          const product = findProduct(productWithQte.item.productId);
          if (!product) return null;
          return (
            <>
              <BoxWrapper style={styles.wrapper}>
                <Stack p="4" space={3} alignContent={'center'}>
                  <Box flexDirection={'row'} justifyContent={'space-evenly'}>
                    <Heading size="md" ml="-1">
                      {product.name}
                    </Heading>
                    <Heading size="md" ml="-1">
                      {product.price} {'\u20AC'}
                    </Heading>
                  </Box>
                  <Text
                    alignSelf={'center'}
                    fontSize={'xl'}
                    fontWeight={'bold'}
                  >
                    Quantité: {productWithQte.item.quantity}
                  </Text>

                  <Text
                    numberOfLines={2}
                    flexGrow={1}
                    fontWeight="400"
                    textAlign={'center'}
                  >
                    {product.description}
                  </Text>
                </Stack>
              </BoxWrapper>
            </>
          );
        }}
        keyExtractor={order.products.id}
      />
    );
  };
  return (
    <View style={styles.pageContainer}>
      <FlatList
        style={styles.list}
        flex={1}
        paddingBottom={'100px'}
        data={orders}
        renderItem={({ item }) => <OrderItem order={item}></OrderItem>}
        keyExtractor={(item) => item.id}
      />

      {currentOrder !== null ? (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          size={'full'}
          borderColor={'black'}
          shadow={2}
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Détail commande</Modal.Header>
            <Modal.Body>
              <DetailOrder order={currentOrder}></DetailOrder>
              <ProductList order={currentOrder}></ProductList>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  list: {
    width: '100%',
    flex: 1,
    alignContent: 'center',
    marginBottom: 10,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
  },
  wrapper: {
    backgroundColor: '#3FC060',
  },
});
