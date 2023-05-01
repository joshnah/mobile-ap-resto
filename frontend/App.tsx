import React from "react";
import { Provider } from "react-redux";
// 1. import `NativeBaseProvider` component
import { Box, NativeBaseProvider, Text } from "native-base";
import LoginPage from "./src/components/loginPage";
import { store } from "./src/store/store";

export default function App() {
  // 2. Use at the root of your app
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
          <Text>Open up App.js to start working on your app!</Text>
        </Box>
        <LoginPage></LoginPage>
      </NativeBaseProvider>
    </Provider>
  );
}
