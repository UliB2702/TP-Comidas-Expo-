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


  useEffect(() => {
    const response = fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${buscador}&maxFat=25&number=2&apiKey=383fb85806e048838a7e035f4b6bade9&includeNutrition=true.`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setContextState({
          newValue: responseJson.results,
          type: "SET_RECEPIES",
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });
      console.log(response)
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
