import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  Badge,
  Button,
  FlatList,
  HStack,
  Heading,
  Stack,
  Text,
  View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import BoxWrapper from '../../commons/BoxWrapper';
import { convertDate } from '../../services/common.service';
import { RootState } from '../../store/store';
import ModalDetail from './ModalDetailOrder';
const Tab = createMaterialTopTabNavigator();

export default function Orders() {
  const orders = useSelector((state: RootState) => state.appData.orders);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const products = useSelector((state: RootState) => state.appData.products);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.isAdmin);
  useEffect(() => {
    // fermer le modal lors d'une mise à jour des commandes
    setCurrentOrder(null);
  }, [orders]);
  const OrderItem = (props: any) => {
    const { order } = props;

    return (
      <BoxWrapper style={styles.wrapper}>
        <Stack p={3} space={3}>
          <HStack justifyContent={'space-between'}>
            <Heading fontSize={'md'}>{convertDate(order.date)}</Heading>
            <Heading fontSize={'md'}>
              <Text>Status:</Text>
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
          <Text textAlign={'center'}>
            {order.phone ? order.phone : 'Pas de téléphone'}
          </Text>
        </Stack>

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

  // Composant pour order detail

  const OrderList = (props: any) => {
    const { isFini } = props.route.params;
    const filteredOrders = orders.filter((order) => order.status === isFini);
    return (
      <FlatList
        style={styles.list}
        flex={1}
        paddingBottom={'100px'}
        data={filteredOrders}
        renderItem={({ item }) => <OrderItem order={item}></OrderItem>}
        keyExtractor={(item) => item.id}
      />
    );
  };

  return (
    <View style={styles.pageContainer}>
      <Tab.Navigator initialRouteName="En Cours">
        <Tab.Screen
          key={'fini'}
          name="Fini"
          component={OrderList}
          initialParams={{ isFini: true }}
        />
        <Tab.Screen
          key={'enCours'}
          name="En Cours"
          component={OrderList}
          initialParams={{ isFini: false }}
        />
      </Tab.Navigator>
      {currentOrder !== null ? (
        <ModalDetail
          currentOrder={currentOrder}
          showModal={showModal}
          setShowModal={setShowModal}
          products={products}
          isAdmin={isAdmin}
        ></ModalDetail>
      ) : null}
    </View>
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
