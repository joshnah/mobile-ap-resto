import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider, useSelector } from 'react-redux';
import Basket from './src/components/Basket';
import CreateAccountScreen from './src/components/CreateAccountScreen';
import HomePage from './src/components/HomePage';
import Message from './src/components/Message';
import Orders from './src/components/Orders';
import UserInfos from './src/components/UserInfos';
import articlePage from './src/components/articlePage';
import Login from './src/components/loginPage';
import { LOGIN_SUCCESS } from './src/store/auth/auth.reducer';
import { fetchData } from './src/store/data/appData.action';
import { SET_MESSAGE } from './src/store/message/message.reducer';
import { RootState, store, useAppDispatch } from './src/store/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NavsContainer = () => {
  const MainNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name == 'Login') {
              iconName = 'log-in-outline';
            } else if (route.name == 'Accueil') {
              iconName = 'home';
            } else if (route.name == 'Panier') {
              iconName = 'cart-outline';
            } else if (route.name == 'Infos') {
              iconName = 'person-outline';
            } else if (route.name == 'Commandes') {
              iconName = 'archive-outline';
            }
            let iconColor;
            if (focused) {
              iconColor = 'green';
            } else {
              iconColor = 'black';
            }
            return <Ionicons name={iconName} size={25} color={iconColor} />;
          },
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="Accueil" component={HomePage} />
        <Tab.Screen name="Panier" component={Basket} />
        <Tab.Screen name="Commandes" component={Orders} />
        <Tab.Screen
          name="Infos"
          component={UserInfos}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  };
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        dispatch(LOGIN_SUCCESS(JSON.parse(user)));
        dispatch(
          SET_MESSAGE({
            message: 'Vous êtes connecté',
            status: 'success',
            closable: true,
            autoClose: true,
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchData());  
    }
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* TODO: SPLASH SCREEN */}
        {/* <Stack.Screen
    name="Splash"
    component={SplashScreen}
    options={{ headerShown: false }}
  />*/ }

        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={MainNavigation}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="CreateLogin" component={CreateAccountScreen} />
          </>
        )}
         <Stack.Screen name="ArticlePage" component={articlePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <Provider store={store}>
          <Message></Message>
          <NavsContainer />
        </Provider>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
