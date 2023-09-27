import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";
import { ActionTypes, useContextState } from "./contextState";

const Formulario = ({navigation}) => {
  const { contextState, setContextState } = useContextState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function verificacion() {
    const response = fetch(`http://challenge-react.alkemy.org/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'email': email,
        'password': password,
      }),
    })
      .then( async (response) =>  {
        const token = await response.json()
        console.log(token.token)
        setContextState({
          newValue: token.token,
          type: ActionTypes.setUserToken,
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
        navigation.navigate("menu");
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
        alert("Los datos no son correctos, vuelva a intentarlo");
      });
  }

  const handleLogin = () => {
    if (!email || !password) {
      alert("Campos vacíos");
      return;
    }
    setIsLoading(true);
    verificacion();
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Pressable
        onPress={handleLogin}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? "#ccc" : "#007AFF",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Enviar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#634fe3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    marginRight: "auto",
    marginLeft: "auto",
    padding: 1,
  },
});

export default Formulario;
