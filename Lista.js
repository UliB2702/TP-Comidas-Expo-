import { React, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { useContextState } from "./contextState";

const Lista = () => {
  const { contextState, setContextState } = useContextState();
  const [buscador, setBuscador] = useState('');

  function postData(buscador) {
    const response = fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${buscador}&maxFat=25&number=2&apiKey=a126dd4cea244923bacc626f3d372f60&includeNutrition=true.`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setContextState({
          newValue: responseJson.results,
          type: "SET_RECIPES",
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
  }

  useEffect(() => {
    postData(buscador);
  }, [buscador]);

  const Item = ({ title, image }) => (
    <View style={styles.item}>
      <Image source={image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Ingrese el plato que desea buscar</Text>
      <TextInput
        style={styles.input}
        placeholder="ingrese..."
        onChangeText={setBuscador}
        id="nombre"
        value={buscador}
      />
      <FlatList
        data={contextState?.allRecipies ?? []}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34813C",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Lista;
