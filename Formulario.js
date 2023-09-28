import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { ActionTypes, useContextState } from "./contextState";

const Formulario = ({ navigation }) => {
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
        email: email,
        password: password,
      }),
    })
      .then(async (response) => {
        const token = await response.json();
        console.log(token.token);
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
      <Text style={styles.title}>Inicio de Sesión</Text>
      <View style={styles.formContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <Pressable
          onPress={handleLogin}
          disabled={isLoading}
          style={[
            styles.button,
            { backgroundColor: isLoading ? "#ccc" : "#007AFF" },
          ]}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#634fe3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: screenWidth / 7, 
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Formulario;
