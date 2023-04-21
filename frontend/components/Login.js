import React, { useState } from "react";
// 1. import `NativeBaseProvider` component
import { NativeBaseProvider, Text, Box, View } from "native-base";

export default function Login() {
  // 2. Use at the root of your app
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function handleUsernameChange(e){
    setUsername(e.target.value);
  }
  function handlePasswordChange(e){
    setPassword(e.target.value);
  }
  return (
   <div>
<h2>Connexion</h2>
  <label>
    Username
    <input id="username" defaultValue="username" onChange={handleUsernameChange} />
  </label>
  <label>
    Password:
    <input id="password" type="password" defaultValue="password" onChange={handlePasswordChange} />
    
  </label>
  <input type="submit" defaultValue="Connexion"></input>
   </div>
    
  

  );
};
