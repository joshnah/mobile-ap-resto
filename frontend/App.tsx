import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import Basket from './src/components/Basket';
import CreateAccountScreen from './src/components/CreateAccountScreen';
import HomePage from './src/components/HomePage';
import Message from './src/components/Message';
import Orders from './src/components/Orders';
import UserInfos from './src/components/UserInfos';
import Login from './src/components/loginPage';
import SplashScreen from './src/components/splashScreen';
import { store } from './src/store/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
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
        <Tab.Screen
          name="Infos"
          component={UserInfos}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Commandes" component={Orders} />
      </Tab.Navigator>
    );
  };

  const AuthNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MainNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateLogin" component={CreateAccountScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <Provider store={store}>
          <Message></Message>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
