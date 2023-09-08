import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Pressable,
  Button,
} from "react-native";
import { useState } from "react";
import { useContextState } from "./contextState";

const Formulario = () => {
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
      .then((response) =>  {
        setContextState({
          newValue: response.json().token,
          type: "SET_USER_TOKEN",
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
        console.log(contextState.userToken);
        alert("Los datos se esta procesando, espere un momento");
        navigation.navigate("/lista");
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
