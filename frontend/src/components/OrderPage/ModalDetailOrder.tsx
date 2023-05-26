import {
  Badge,
  Box,
  Button,
  FlatList,
  HStack,
  Heading,
  Input,
  Modal,
  Stack,
  Text,
  View,
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BoxWrapper from '../../commons/BoxWrapper';
import { convertDate } from '../../services/common.service';
import { updateOrderAction } from '../../store/data/appData.action';
import { SET_MESSAGE } from '../../store/message/message.reducer';
import { useAppDispatch } from '../../store/store';
const DetailOrder = (props: {
  currentOrder: any;
  editMode: boolean;
  orderToModify: any;
  setOrderToModify: any;
  products: any;
}) => {
  const initialOrder = props.currentOrder;
  const editMode = props.editMode;
  const order = props.orderToModify;
  const setOrder = props.setOrderToModify;
  const products = props.products;
  const toggleStatus = () => {
    const newOrder = JSON.parse(JSON.stringify(order));
    newOrder.status = !newOrder.status;
    setOrder(newOrder);
  };
  const changeAddress = (address: string) => {
    const newOrder = JSON.parse(JSON.stringify(order));
    newOrder.address = address;
    setOrder(newOrder);
  };

  const changePhone = (phone: string) => {
    const newOrder = JSON.parse(JSON.stringify(order));
    newOrder.phone = phone;
    setOrder(newOrder);
  };

  // Composant pour liste de produits
  const ProductItem = (props: any) => {
    const { item, index, products } = props;
    const findProduct = (id: number) => {
      return products.find((product) => product.id === id);
    };
    const product = findProduct(item.productId);
    if (!product) return null;

    const deleteProduct = () => {
      const newOrder = JSON.parse(JSON.stringify(order));
      newOrder.total = Number(
        newOrder.total - product.price * order.products[index].quantity
      ).toFixed(2);
      newOrder.products.splice(index, 1);

      setOrder(newOrder);
    };

    const increment = () => {
      const newOrder = JSON.parse(JSON.stringify(order));
      newOrder.products[index].quantity += 1;
      newOrder.total = Number((newOrder.total + product.price).toFixed(2));
      setOrder(newOrder);
    };

    const decrement = () => {
      if (order.products[index].quantity === 1) return;
      const newOrder = JSON.parse(JSON.stringify(order));
      newOrder.products[index].quantity -= 1;
      newOrder.total = Number((newOrder.total - product.price).toFixed(2));
      setOrder(newOrder);
    };
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
              {editMode && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    deleteProduct();
                  }}
                >
                  <Ionicons name="trash-outline" size={40} color="red" />
                </TouchableOpacity>
              )}
            </Box>

            {editMode ? (
              <>
                <View alignItems={'center'}>
                  <HStack
                    space={2}
                    alignItems={'center'}
                    justifyContent="space-between"
                  >
                    <TouchableOpacity onPress={() => decrement()}>
                      <Ionicons
                        name="remove-circle-outline"
                        size={50}
                        color="green"
                      />
                    </TouchableOpacity>

                    <Text textAlign={'center'}>
                      {order.products[index].quantity}
                    </Text>

                    <TouchableOpacity onPress={() => increment()}>
                      <Ionicons
                        name="add-circle-outline"
                        size={50}
                        color="green"
                      />
                    </TouchableOpacity>
                  </HStack>
                </View>
              </>
            ) : (
              <>
                <Text alignSelf={'center'} fontSize={'xl'} fontWeight={'bold'}>
                  Quantité: {item.quantity}
                </Text>
                <Text
                  numberOfLines={2}
                  flexGrow={1}
                  fontWeight="400"
                  textAlign={'center'}
                >
                  {product.description}
                </Text>
              </>
            )}
          </Stack>
        </BoxWrapper>
      </>
    );
  };
  return (
    <>
      <Stack p={3} space={3}>
        <HStack justifyContent={'space-between'}>
          <Heading fontSize={'md'}>{convertDate(order.date)}</Heading>
          {editMode ? (
            <View flexDirection={'row'} alignItems={'center'}>
              <Text fontWeight={'bold'}>Status:</Text>
              {order.status ? (
                <Badge colorScheme={'success'} _text={{ fontWeight: 'bold' }}>
                  Fini
                </Badge>
              ) : (
                <Badge colorScheme="warning" _text={{ fontWeight: 'bold' }}>
                  En cours
                </Badge>
              )}
              <Button
                onPress={() => toggleStatus()}
                alignItems={'center'}
                justifyContent={'center'}
              >
                Toggle
              </Button>
            </View>
          ) : (
            <Heading fontSize={'md'}>
              <Text fontWeight={'bold'}>Status:</Text>
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
          )}
        </HStack>

        {editMode ? (
          <>
            <Heading fontSize={'xl'} textAlign={'center'}>
              Total: {order.total} {'\u20AC'}
            </Heading>
            <Input
              size={'lg'}
              textAlign={'center'}
              value={order.address}
              variant="rounded"
              placeholder="Addresse"
              onChange={(e) => changeAddress(e.target.value)}
            />
            <Input
              size={'lg'}
              textAlign={'center'}
              value={order.phone}
              variant="rounded"
              placeholder="Téléphone"
              onChange={(e) => changePhone(e.target.value)}
            />
          </>
        ) : (
          <>
            <Heading fontSize={'xl'} textAlign={'center'}>
              Total: {initialOrder.total} {'\u20AC'}
            </Heading>
            <Text textAlign={'center'}> {initialOrder.address}</Text>
            <Text textAlign={'center'}>
              {order.phone ? initialOrder.phone : 'Pas de téléphone'}
            </Text>
          </>
        )}
      </Stack>
      <FlatList
        data={order.products}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <ProductItem
            item={item}
            index={index}
            products={products}
          ></ProductItem>
        )}
        keyExtractor={order.products.id}
      />
    </>
  );
};
export default function ModalDetail(props: any) {
  const { showModal, setShowModal, currentOrder, products, isAdmin } = props;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const [orderToModify, setOrderToModify] = useState(currentOrder);
  const handleSave = () => {
    if (JSON.stringify(orderToModify) === JSON.stringify(currentOrder)) {
      return;
    }
    if (orderToModify.products.length === 0) {
      dispatch(
        SET_MESSAGE({
          message: 'La commande doit contenir au moins un produit',
          status: 'error',
          autoClose: true,
          closable: true,
        })
      );
      return;
    }
    dispatch(updateOrderAction(orderToModify));
  };
  return (
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
          <DetailOrder
            editMode={editMode}
            currentOrder={currentOrder}
            orderToModify={orderToModify}
            setOrderToModify={setOrderToModify}
            products={products}
          ></DetailOrder>
        </Modal.Body>
        {isAdmin && (
          <Modal.Footer>
            <Button.Group space={2}>
              {!editMode && (
                <Button onPress={() => setEditMode(true)}> Modifier </Button>
              )}

              {editMode && (
                <>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setEditMode(false);
                      setShowModal(false);
                      setOrderToModify(currentOrder);
                      1;
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    onPress={() => {
                      handleSave();
                    }}
                  >
                    Save
                  </Button>
                </>
              )}
            </Button.Group>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
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
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
