import React from "react";
// 1. import `NativeBaseProvider` component
import { Box, NativeBaseProvider, Text } from "native-base";
import { login } from "./src/services/dataService";
import { store } from "./src/store/store";
import LoginPage from "./src/components/login";

export default function App() {
  login("admin@gmail.com", "admin");

  store.subscribe(() => console.log(store.getState()));

  // 2. Use at the root of your app
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <Text>Open up App.js to start working on your app!</Text>
      </Box>

      <LoginPage></LoginPage>
    </NativeBaseProvider>
  );
}
