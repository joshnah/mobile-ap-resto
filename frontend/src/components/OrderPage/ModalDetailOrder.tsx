import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Modal,
  Stack,
  Text,
  View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
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
  products: any;
  hasSaved: boolean;
  dispatch: any;
  setShowModal: any;
  setHasSaved: any;
}) => {
  const initialOrder = props.currentOrder;
  const editMode = props.editMode;
  const products = props.products;
  const hasSaved = props.hasSaved;
  const dispatch = props.dispatch;
  const setShowModal = props.setShowModal;
  const setHasSaved = props.setHasSaved;
  useEffect(() => {
    if (!hasSaved) {
      return;
    }
    const newOrder = { ...initialOrder };
    newOrder.products = listProducts;
    newOrder.status = status;
    newOrder.address = address;
    newOrder.phone = phone;
    if (JSON.stringify(initialOrder) == JSON.stringify(newOrder)) {
      dispatch(
        SET_MESSAGE({
          message: "Aucune modification n'a été effectuée",
          status: 'warning',
          autoClose: true,
          closable: true,
        })
      );
      setHasSaved(false);
      return;
    }
    if (newOrder.products.length === 0) {
      dispatch(
        SET_MESSAGE({
          message: 'La commande doit contenir au moins un produit',
          status: 'error',
          autoClose: true,
          closable: true,
        })
      );
      setHasSaved(false);

      return;
    }
    dispatch(updateOrderAction(newOrder));
    setShowModal(false);
  }, [hasSaved]);

  const [listProducts, setListProducts] = useState(
    JSON.parse(JSON.stringify(initialOrder.products))
  );
  const [status, setStatus] = useState(initialOrder.status);
  const [address, setAddress] = useState(initialOrder.address);
  const [phone, setPhone] = useState(initialOrder.phone);
  const [total, setTotal] = useState(initialOrder.total);
  const updateQuantity = (index: number, change: number) => {
    const newProducts = listProducts.map((pro, i) => {
      if (i === index) {
        pro.quantity += change;
      }
      return pro;
    });
    setListProducts(newProducts);
  };
  const findProduct = (id: number) => {
    return products.find((product) => product.id === id);
  };
  // Composant pour liste de produits
  const ProductItem = (props: any) => {
    const { item, index } = props;

    const product = findProduct(item.productId);
    if (!product) return null;

    const deleteProduct = () => {
      const newProducts = listProducts.filter((pro, i) => i !== index);
      setListProducts(newProducts);
    };

    const increment = () => {
      updateQuantity(index, 1);
      setTotal(Number((total + product.price).toFixed(2)));
    };

    const decrement = () => {
      if (item.quantity === 1) {
        return;
      }
      updateQuantity(index, -1);
      setTotal(Number((total - product.price).toFixed(2)));
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
                      {listProducts[index].quantity}
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
          <Heading fontSize={'md'}>{convertDate(initialOrder.date)}</Heading>
          {editMode ? (
            <View flexDirection={'row'} alignItems={'center'}>
              <Text fontWeight={'bold'}>Status:</Text>
              {status ? (
                <Badge colorScheme={'success'} _text={{ fontWeight: 'bold' }}>
                  Fini
                </Badge>
              ) : (
                <Badge colorScheme="warning" _text={{ fontWeight: 'bold' }}>
                  En cours
                </Badge>
              )}
              <Button
                onPress={() => setStatus(!status)}
                alignItems={'center'}
                justifyContent={'center'}
              >
                Toggle
              </Button>
            </View>
          ) : (
            <Heading fontSize={'md'}>
              <Text fontWeight={'bold'}>Status:</Text>
              {status ? (
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
              Total: {total} {'\u20AC'}
            </Heading>
            <Input
              size={'lg'}
              textAlign={'center'}
              value={address}
              variant="rounded"
              placeholder="Addresse"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              size={'lg'}
              textAlign={'center'}
              value={phone}
              variant="rounded"
              placeholder="Téléphone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        ) : (
          <>
            <Heading fontSize={'xl'} textAlign={'center'}>
              Total: {initialOrder.total} {'\u20AC'}
            </Heading>
            <Text textAlign={'center'}> {initialOrder.address}</Text>
            <Text textAlign={'center'}>
              {phone ? initialOrder.phone : 'Pas de téléphone'}
            </Text>
          </>
        )}
      </Stack>
      {listProducts.map((item: any, index) => (
        <ProductItem item={item} index={index} key={index}></ProductItem>
      ))}
    </>
  );
};
export default function ModalDetail(props: any) {
  const { showModal, setShowModal, currentOrder, products, isAdmin } = props;
  const [editMode, setEditMode] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const dispatch = useAppDispatch();
  const handleSave = () => {
    setHasSaved(true);
  };
  return (
    <Modal
      _backdrop={{
        bg: 'warmGray.50',
      }}
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size={'xl'}
      borderColor={'black'}
      shadow={6}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Détail commande</Modal.Header>
        <Modal.Body>
          <DetailOrder
            editMode={editMode}
            currentOrder={currentOrder}
            products={products}
            hasSaved={hasSaved}
            dispatch={dispatch}
            setShowModal={setShowModal}
            setHasSaved={setHasSaved}
            // la key permet de recharger le composant quand on fermes le modal
            key={`${editMode}-${currentOrder}`}
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
