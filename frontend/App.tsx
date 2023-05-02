import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import ProductList from './src/components/ProductList';
import Login from './src/components/loginPage';
import SplashScreen from './src/components/splashScreen';
import { login } from './src/services/dataService';
import { store } from './src/store/store';
// 1. import `NativeBaseProvider` component
const Stack = createStackNavigator();
export default function App() {
  // 2. Use at the root of your app

  useEffect(() => {
    login('admin@gmail.com', 'admin');
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ProductList" component={ProductList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
